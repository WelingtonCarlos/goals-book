import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createGoal } from '../../../functions/create-goal';
import { authMiddleware } from '../../../middleware/authMiddleware';
import { createGoalSchema } from '../../../utils/validations';

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
    app.addHook('onRequest', authMiddleware);

    // Definição da rota protegida
    app.post('/goals',
        {
            schema: {
                body: createGoalSchema,
            }
        },
        async (request, reply) => {
            try {
                const { userId, title, desiredWeeklyFrequency } = request.body

                // Cria a meta (goal)
                const createdGoal = await createGoal({
                    userId,
                    title,
                    desiredWeeklyFrequency
                });

                // Se a criação da meta for bem-sucedida, retorne a meta
                if (createdGoal) {
                    return reply.send(createdGoal);
                } else {
                    // Caso contrário, retorne um erro
                    return reply.status(500).send({ error: 'Falha ao criar meta' });
                }

            } catch (error) {
                // Tratamento de erros
                return reply.status(500).send({ error: 'Erro no servidor', details: error });
            }
        }
    );
}
