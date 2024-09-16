
import { client, db } from "."
import { goalCompletions, goals } from "./schema"

async function seed() {
    await db.delete(goals)
    await db.delete(goalCompletions)

    // const result = await db.insert(goals).values([
    //     { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
    //     { title: 'Ler pelo menos 10 páginas de algum livro', desiredWeeklyFrequency: 7 },
    //     { title: 'Correr', desiredWeeklyFrequency: 4 },
    //     { title: 'Nadar', desiredWeeklyFrequency: 3 },
    //     { title: 'Musculação', desiredWeeklyFrequency: 2 },
    //     { title: 'Estudar programação', desiredWeeklyFrequency: 4 },
    // ]).returning()

    // const startOfWeek = dayjs().startOf('week')

    // await db.insert(goalCompletions).values([
    //     { goalId: result[0].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    //     { goalId: result[0].id, createdAt: startOfWeek.add(2, 'day').toDate() },
    //     { goalId: result[0].id, createdAt: startOfWeek.add(3, 'day').toDate() },
    //     { goalId: result[0].id, createdAt: startOfWeek.add(4, 'day').toDate() },
    //     { goalId: result[0].id, createdAt: startOfWeek.add(5, 'day').toDate() },
    //     { goalId: result[1].id, createdAt: startOfWeek.toDate() },
    //     { goalId: result[1].id, createdAt: startOfWeek.add(2, 'day').toDate() },
    //     { goalId: result[1].id, createdAt: startOfWeek.add(3, 'day').toDate() },
    //     { goalId: result[1].id, createdAt: startOfWeek.add(4, 'day').toDate() },
    //     { goalId: result[1].id, createdAt: startOfWeek.add(5, 'day').toDate() },
    //     { goalId: result[1].id, createdAt: startOfWeek.add(6, 'day').toDate() },
    //     { goalId: result[2].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    //     { goalId: result[2].id, createdAt: startOfWeek.add(3, 'day').toDate() },
    //     { goalId: result[2].id, createdAt: startOfWeek.add(5, 'day').toDate() },
    //     { goalId: result[3].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    //     { goalId: result[3].id, createdAt: startOfWeek.add(3, 'day').toDate() },
    //     { goalId: result[3].id, createdAt: startOfWeek.add(5, 'day').toDate() },
    //     { goalId: result[4].id, createdAt: startOfWeek.add(2, 'day').toDate() },
    //     { goalId: result[5].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    //     { goalId: result[5].id, createdAt: startOfWeek.add(3, 'day').toDate() },
    //     { goalId: result[5].id, createdAt: startOfWeek.add(5, 'day').toDate() },
    // ])
}

seed().finally(() => {
    client.end()
})