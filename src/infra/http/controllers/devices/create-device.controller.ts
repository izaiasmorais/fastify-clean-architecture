import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { auth } from "../../middleware/auth";
import { z } from "zod";
import { createDeviceRequestBodySchema } from "../../schemas/devices";
import { makeCreateDeviceUseCase } from "../../../database/prisma/use-cases/make-create-device-use-case";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";

export async function createDevice(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.post(
			"/api/devices",
			{
				schema: {
					tags: ["Devices"],
					summary: "Register a new device",
					security: [{ bearerAuth: [] }],
					body: createDeviceRequestBodySchema.describe("Request body"),
					response: {
						201: defaultSuccessResponseSchema(z.any()).describe("Created"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						409: defaultErrorResponseSchema.describe("Conflict"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const body = createDeviceRequestBodySchema.parse(request.body);

				const createDeviceUseCase = makeCreateDeviceUseCase();

				const result = await createDeviceUseCase.execute({
					storeId,
					...body,
				});

				if (result.isLeft()) {
					return reply.status(result.value.statusCode).send({
						success: false,
						errors: result.value.errors,
						data: null,
					});
				}

				return reply.status(201).send({
					success: true,
					errors: null,
					data: null,
				});
			}
		);
}
