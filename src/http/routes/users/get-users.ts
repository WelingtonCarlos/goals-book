import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getUser } from '../../../functions/get-users'

export const getUsersRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/users', async () => {
        const { users } = await getUser()
        return { users }
    })
}