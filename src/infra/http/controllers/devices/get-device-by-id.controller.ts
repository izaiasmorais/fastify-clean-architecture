import { auth } from "../../middleware/auth";
import { prisma } from "../../../database/prisma/prisma";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import {
	deviceSchema,
	getDevicesResponseBodySchema,
} from "../../schemas/devices";
import { deviceToHttp } from "../../presenters/device-to-http";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { z } from "zod";
import { makeGetDeviceByIdUseCase } from "../../../database/prisma/use-cases/make-get-device-by-id-use-case";

export async function getDeviceById(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/devices/:id",
			{
				schema: {
					tags: ["Devices"],
					summary: "Get a device by ID",
					security: [{ bearerAuth: [] }],
					params: z
						.object({
							id: z.string().uuid("O ID deve ser um UUID válido"),
						})
						.describe("Device ID parameter"),
					response: {
						200: defaultSuccessResponseSchema(
							z.object({
								device: deviceSchema,
							})
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						404: defaultErrorResponseSchema.describe("Not Found"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const { id } = request.params;

				const getDeviceByIdUseCase = makeGetDeviceByIdUseCase();

				const result = await getDeviceByIdUseCase.execute({
					storeId,
					deviceId: id,
				});

				if (result.isLeft()) {
					return reply.status(result.value.statusCode).send({
						success: false,
						errors: result.value.errors,
						data: null,
					});
				}

				reply.status(200).send({
					success: true,
					errors: null,
					data: {
						device: result.value,
					},
				});
			}
		);
}
