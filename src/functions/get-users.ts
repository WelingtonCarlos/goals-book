import dayjs from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { db } from "../db";
import { users } from "../db/schema";

dayjs.extend(weekOfYear);

export async function getUser() {
    const firstDayOfWeek = dayjs().startOf('week').toDate(); // Corrigido typo
    const lastDayOfWeek = dayjs().endOf('week').toDate();

    // Buscando os usuários do banco de dados
    const getUsers = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
        })
        .from(users);

    // Retornando os usuários encontrados
    return {
        users: getUsers,
    };
}
