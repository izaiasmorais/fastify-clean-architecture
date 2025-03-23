import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { auth } from "../../middleware/auth";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { makeGetDeviceBySerialNumberUseCase } from "../../../database/prisma/use-cases/make-get-device-by-serial-number-use-case";
import { deviceSchema } from "../../schemas/devices";
import { z } from "zod";

export async function getDeviceBySerialNumber(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/devices/bySerialNumber",
			{
				schema: {
					tags: ["Devices"],
					summary: "Get store device by serial number",
					security: [{ bearerAuth: [] }],
					querystring: z.object({
						serialNumber: z.string().describe("Device serial number"),
					}),
					response: {
						200: defaultSuccessResponseSchema(
							deviceSchema.describe("Store Device")
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						404: defaultErrorResponseSchema.describe("Not Found"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();
				const { serialNumber } = request.query;

				const getDeviceBySerialNumberUseCase =
					makeGetDeviceBySerialNumberUseCase();

				const result = await getDeviceBySerialNumberUseCase.execute({
					storeId,
					serialNumber,
				});

				if (result.isLeft()) {
					return reply.status(result.value.statusCode).send({
						success: false,
						errors: result.value.errors,
						data: null,
					});
				}

				reply.send({
					success: true,
					errors: null,
					data: result.value,
				});
			}
		);
}
