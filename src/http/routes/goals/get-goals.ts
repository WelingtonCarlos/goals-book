import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekPendingGoals } from '../../../functions/get-week-pending-goals';
import { authMiddleware } from '../../../middleware/authMiddleware';

export const getGoalsRoute: FastifyPluginAsyncZod = async (app) => {
    
    app.addHook('onRequest', authMiddleware);
    
    app.get('/goals', async () => {
        const { getGoals } = await getWeekPendingGoals()
        return { getGoals }
    })
}