import fastify from "fastify";

import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from "fastify-type-provider-zod";

import { createGoal } from "../functions/create-goal";
import { createGoalSchema } from "../utils/validations";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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

app
    .listen({ port: 3333 })
    .then(() => {
        console.log("HTTP server runnig!");
    });
