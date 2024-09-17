import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekSummary } from '../../../functions/get-week-summary';
import { authMiddleware } from '../../../middleware/authMiddleware';

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
    app.addHook('onRequest', authMiddleware);
    
    app.get('/week-summary', async () => {
        const { summary } = await getWeekSummary()
        return { summary }
    })
}