
export const authMiddleware = async (request: any, reply: any) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        return reply.status(401).send({ error: 'Não autorizado' });
    }
};