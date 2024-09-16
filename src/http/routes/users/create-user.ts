import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createUser } from '../../../functions/create-user'
import { createUserSchema } from '../../../utils/validations'

export const createUsersRoute: FastifyPluginAsyncZod = async (app) => {
    app.post('/users',
        {
            schema: {
                body: createUserSchema
            }
        },
        async (request) => {
            const { name, email, password } = request.body

            const postUser = await createUser({
                name,
                email,
                password
            })

            if (postUser) return postUser
        })
}