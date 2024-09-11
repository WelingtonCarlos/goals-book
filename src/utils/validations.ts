import z from 'zod'

export const envSchema = z.object({
    DATABASE_URL: z.string().url()
})

export const createGoalSchema = z.object({
    title: z.string().min(2),
    desiredWeeklyFrequency: z.number().min(1).max(7)
})

export const createCompletionSchema = z.object({
    goalId: z.string()
})