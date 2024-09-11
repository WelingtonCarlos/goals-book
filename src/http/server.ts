import fastify from "fastify";

import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from "fastify-type-provider-zod";

import { createGoal } from "../functions/create-goal";
import { createGoalCompletion } from "../functions/create-goals-completion";
import { getWeekPendingGoals } from "../functions/get-week-pending-goals";
import { createCompletionSchema, createGoalSchema } from "../utils/validations";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get('/pending-goals', async () => {
    const { pendingGoals } = await getWeekPendingGoals()
    return { pendingGoals }
})
app.get('/every-goals', async () => {
    const { everyGoals } = await getWeekPendingGoals()
    return { everyGoals }
})

app.post('/goals',
    {
        schema: {
            body: createGoalSchema
        }
    },
    async (request) => {
        const { title, desiredWeeklyFrequency } = request.body

        const createdGoal = await createGoal({
            title,
            desiredWeeklyFrequency
        })

        if (createdGoal) return createdGoal
    })
app.post('/create-completion', {
    schema: {
        body: createCompletionSchema
    }
}, async (request) => {
    const { goalId } = request.body

    await createGoalCompletion({
        goalId
    })
})


app
    .listen({ port: 3333 })
    .then(() => {
        console.log("HTTP server runnig!");
    });
