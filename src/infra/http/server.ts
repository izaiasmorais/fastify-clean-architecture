import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifyJwt from "@fastify/jwt";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "../env/env";
import { errorHandler } from "./error-handler";
import { signUp } from "./controllers/sign-up.controller";
import { signIn } from "./controllers/sign-in.controller";
import { getProfile } from "./controllers/get-profile.controller";

const port = env.ENV_PORT;
const version = "1.0.0 - Release 6";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);
app.register(fastifyCors);
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: `PlaSeg API - ${env.NODE_ENV} - [Version: ${version}]`,
			description:
				"Esta API é responsável por sincronizar os dados do Nebula com os sistemas de gestão.",
			version: version,
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUI, {
	routePrefix: "/",
});
app.register(fastifyJwt, {
	secret: "supersecret",
});

app.register(signUp);
app.register(signIn);
app.register(getProfile);

const start = async () => {
	try {
		await app.listen({ port: Number(port), host: "0.0.0.0" });
		console.log(`HTTP server running at port ${port}`);
	} catch (err) {
		console.error(err);
		app.log.error(err);
		process.exit(1);
	}
};

start();
