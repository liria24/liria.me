import { consola } from 'consola'

export default defineEventHandler(() => {
    const event = useEvent()
    consola
        .withTag(`API Request ${new Date().toLocaleTimeString()}`)
        .info(`${event.method.toUpperCase()}: ${getRequestURL(event)}`)
})
