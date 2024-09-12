import fastify from "fastify";

import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from "fastify-type-provider-zod";

import fastifyCors from "@fastify/cors";
import { createCompletionRoute } from "./routes/create-completion";
import { createGoalRoute } from "./routes/create-goal";
import { getGoalsRoute } from "./routes/get-goals";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { getWeekSummaryRoute } from "./routes/get-week-summary";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getPendingGoalsRoute)
app.register(getGoalsRoute)
app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getWeekSummaryRoute)

app
    .listen({ port: 3333 })
    .then(() => {
        console.log("HTTP server runnig!");
    });
