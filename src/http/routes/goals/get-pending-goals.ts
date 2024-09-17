import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekPendingGoals } from '../../../functions/get-week-pending-goals';
import { authMiddleware } from '../../../middleware/authMiddleware';

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
    app.addHook('onRequest', authMiddleware);
    
    app.get('/pending-goals', async () => {
        const { pendingGoals } = await getWeekPendingGoals()
        return { pendingGoals }
    })
}