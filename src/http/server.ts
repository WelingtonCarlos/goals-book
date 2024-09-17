import fastify from "fastify";

import fastifyJwt from 'fastify-jwt';

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
import { createSignInRoute } from "./routes/sign-in";
import { createUsersRoute } from "./routes/users/create-user";
import { getUsersRoute } from "./routes/users/get-users";

const app = fastify().withTypeProvider<ZodTypeProvider>();

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    throw new Error('SECRET_KEY não está definida nas variáveis de ambiente.');
}

app.register(fastifyJwt, {
    secret: secretKey,
});

app.register(fastifyCors, {
    origin: '*'
})

app.register(createUsersRoute)
app.register(createSignInRoute)


app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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
