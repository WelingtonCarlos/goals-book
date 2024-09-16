import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../../functions/create-goal'
import { createGoalSchema } from '../../../utils/validations'

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
    app.post('/goals',
        {
            schema: {
                body: createGoalSchema
            }
        },
        async (request) => {
            const { userId, title, desiredWeeklyFrequency } = request.body

            const createdGoal = await createGoal({
                userId,
                title,
                desiredWeeklyFrequency
            })

            if (createdGoal) return createdGoal
        })
}