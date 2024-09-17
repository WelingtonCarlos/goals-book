import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod'; // Sua tabela de usuários
import { db } from '../../db';
import { users } from '../../db/schema';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const createSignInRoute: FastifyPluginAsyncZod = async (app) => {

    app.post('/sign-in', async (request, reply) => {
        try {
            const { email, password } = loginSchema.parse(request.body);

            // Busca o usuário no banco de dados
            const [user] = await db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .limit(1)


            if (!user) {
                return reply.status(400).send({ error: 'Email ou senha incorretos' });
            }

            // Verifica se a senha está correta
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return reply.status(400).send({ error: 'Email ou senha incorretos' });
            }

            // Gera o token JWT
            const token = app.jwt.sign(
                { id: user.id, email: user.email },
                { expiresIn: '1h' } // Expira em 1 hora
            );

            return reply.send({ token });
        } catch (error) {
            return reply.status(500).send({ error: 'Erro no servidor' });
        }
    });
}

