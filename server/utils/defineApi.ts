import type { Session } from '@@/auth'
import { auth } from '@@/auth'
import { consola } from 'consola'
import { z } from 'zod'

const config = useRuntimeConfig()

type ApiOptions = {
    errorMessage?: string
    requireAdmin?: boolean
    requireSession?: boolean
}

type IsSessionRequired<O extends ApiOptions> = O['requireAdmin'] extends true
    ? true
    : O['requireSession'] extends true
      ? true
      : false

type SessionType<O extends ApiOptions> =
    IsSessionRequired<O> extends true ? Session : Session | null | undefined

type ApiContext<O extends ApiOptions> = {
    session: SessionType<O>
}

const defaultOptions: ApiOptions = {
    errorMessage: 'Internal server error',
    requireAdmin: false,
    requireSession: false,
}

type MergeOptions<O extends ApiOptions | undefined> = O extends undefined
    ? typeof defaultOptions
    : O & typeof defaultOptions

/**
 * エラーハンドリング関数
 */
const handleError = (
    error: unknown,
    errorMessage = 'Internal server error'
): never => {
    // HTTPエラーの場合はそのまま投げる
    if (error && typeof error === 'object' && 'statusCode' in error) throw error

    // バリデーションエラー
    if (error instanceof z.ZodError) {
        consola.error('Validation error:', error.format())
        throw createError({
            statusCode: 400,
            message: `Bad request: ${error.issues.map((i) => i.message).join(', ')}`,
        })
    }

    // その他のエラー
    consola.error('Server error:', error)
    throw createError({
        statusCode: 500,
        message: errorMessage,
    })
}

/**
 * 認証とアクセス制御の包括的チェック
 */
const validateAccess = async (
    session: Session | null | undefined,
    authorization: string | undefined,
    options: ApiOptions
): Promise<void> => {
    // 認証状態の確認
    const isAdmin =
        session?.user?.role === 'admin' ||
        authorization === `Bearer ${config.accessToken}`

    // 管理者権限チェック
    if (options.requireAdmin && !isAdmin)
        throw createError({
            statusCode: 403,
            message: 'Unauthorized: Admin privileges required',
        })

    // セッション必須チェック（管理者の場合はadminKeyでも可）
    if (options.requireSession && !session)
        throw createError({
            statusCode: 401,
            message: 'Unauthorized: Session required',
        })
}

export default function defineApi<
    T,
    O extends ApiOptions = Record<string, unknown>,
>(handler: (context: ApiContext<MergeOptions<O>>) => Promise<T>, options?: O) {
    const mergedOptions = { ...defaultOptions, ...options } as MergeOptions<O>

    return defineEventHandler(async (): Promise<T> => {
        try {
            const event = useEvent()
            const { authorization } = getRequestHeaders(event)
            const session = await auth.api.getSession({
                headers: event.headers,
            })

            await validateAccess(session, authorization, mergedOptions)

            return await handler({
                session: session as SessionType<MergeOptions<O>>,
            })
        } catch (error) {
            return handleError(error, mergedOptions.errorMessage)
        }
    })
}
