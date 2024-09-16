import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../../functions/get-week-pending-goals'

export const getGoalsRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/goals', async () => {
        const { getGoals } = await getWeekPendingGoals()
        return { getGoals }
    })
}