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
import { signIn } from "./controllers/auth/sign-in.controller";
import { getStoreDetails } from "./controllers/get-store-details.controller";
import { registerStore } from "./controllers/register-store";
import { bankTellersRoutes } from "./controllers/bank-tellers/bank-tellers.routes";
import { devicesRoutes } from "./controllers/devices/devices.routes";
import { ordersRoutes } from "./controllers/orders/orders.routes";
import { collaboratorsRoutes } from "./controllers/collaborators/collaborators.routes";
import { launchesRoutes } from "./controllers/launches/launches.routes";
import { citiesRoutes } from "./controllers/cities/cities.routes";
import { pizzaSizesRoutes } from "./controllers/pizza-sizes/pizza-sizes.routes";
import { availabilityRoutes } from "./controllers/availability/availability.routes";
import { paymentMethodsRoutes } from "./controllers/payment-methods/payment-method.routes";
import { groupsRoutes } from "./controllers/groups/groups.routes";
import { productsRoutes } from "./controllers/products/products-routes";
import { statusRoutes } from "./controllers/status/status.routes";

const port = env.ENV_PORT;
const version = "2.0.1 - Release 6";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);
app.register(fastifyCors);
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: `Sincronizador Nebula - ${env.NODE_ENV} - [Version: ${version}]`,
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

app.register(signIn);
app.register(availabilityRoutes);
app.register(bankTellersRoutes);
app.register(citiesRoutes);
app.register(collaboratorsRoutes);
app.register(devicesRoutes);
app.register(groupsRoutes);
app.register(launchesRoutes);
app.register(ordersRoutes);
app.register(paymentMethodsRoutes);
app.register(pizzaSizesRoutes);
app.register(productsRoutes);

app.register(statusRoutes);
app.register(getStoreDetails);
app.register(registerStore);


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
