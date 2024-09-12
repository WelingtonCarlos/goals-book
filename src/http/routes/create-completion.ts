import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletion } from '../../functions/create-goals-completion'
import { createCompletionSchema } from '../../utils/validations'

export const createCompletionRoute: FastifyPluginAsyncZod = async (app) => {
    app.post('/create-completion', {
        schema: {
            body: createCompletionSchema
        }
    }, async (request) => {
        const { goalId } = request.body

        await createGoalCompletion({
            goalId
        })
    })
}