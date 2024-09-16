import fastify from "fastify";

import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from "fastify-type-provider-zod";

import fastifyCors from "@fastify/cors";
import { createCompletionRoute } from "./routes/completions/create-completion";
import { createGoalRoute } from "./routes/goals/create-goal";
import { getGoalsRoute } from "./routes/goals/get-goals";
import { getPendingGoalsRoute } from "./routes/goals/get-pending-goals";
import { getWeekSummaryRoute } from "./routes/goals/get-week-summary";
import { createUsersRoute } from "./routes/users/create-user";
import { getUsersRoute } from "./routes/users/get-users";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createUsersRoute)
app.register(getUsersRoute)

app.register(createGoalRoute)
app.register(getGoalsRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

app.register(createCompletionRoute)

app
    .listen({ port: 3333 })
    .then(() => {
        console.log("HTTP server runnig!");
    });
