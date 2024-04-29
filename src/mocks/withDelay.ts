import { delay, HttpResponseResolver } from 'msw'

export async function withDelay(resolver: HttpResponseResolver): HttpResponseResolver {
    return async (...args) => {
        await delay(1000)
        return resolver(...args)
    }
}