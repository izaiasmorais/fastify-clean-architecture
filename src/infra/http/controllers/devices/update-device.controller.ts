import { updateDeviceRequestBodySchema } from "../../schemas/devices";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { auth } from "../../middleware/auth";
import { z } from "zod";
import { makeUpdateDeviceUseCase } from "../../../database/prisma/use-cases/make-update-device-use-case";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";

export async function updateDevice(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.put(
			"/api/devices",
			{
				schema: {
					tags: ["Devices"],
					summary: "Update an existing device",
					security: [{ bearerAuth: [] }],
					body: updateDeviceRequestBodySchema.describe("Request body"),
					response: {
						200: defaultSuccessResponseSchema(z.null()).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						404: defaultErrorResponseSchema.describe("Not Found"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const body = updateDeviceRequestBodySchema.parse(request.body);

				const updateDeviceUseCase = makeUpdateDeviceUseCase();

				const result = await updateDeviceUseCase.execute({
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

				return reply.status(200).send({
					success: true,
					errors: null,
					data: null,
				});
			}
		);
}
