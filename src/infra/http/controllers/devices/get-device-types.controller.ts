import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { auth } from "../../middleware/auth";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { z } from "zod";
import { prisma } from "../../../database/prisma/prisma";
import { GetDeviceTypesUseCase } from "../../../../domain/use-cases/get-device-types";
import { makeGetDeviceTypesUseCase } from "../../../database/prisma/use-cases/make-get-device-types-use-case";

const getDeviceTypesResponseBodySchema = z.array(
	z.object({
		id: z.string(),
		description: z.string(),
		code: z.string(),
		isActive: z.number(),
	})
);

type GetDeviceTypesResponseBody = z.infer<
	typeof getDeviceTypesResponseBodySchema
>;

export async function getDeviceTypes(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/devices/types",
			{
				schema: {
					tags: ["Devices"],
					summary: "Get all device types",
					security: [{ bearerAuth: [] }],
					response: {
						200: defaultSuccessResponseSchema(
							getDeviceTypesResponseBodySchema
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
				preHandler: async (request) => {
					await request.getCurrentStoreId();
				},
			},
			async (_, reply) => {
				const getDeviceTypesUseCase = makeGetDeviceTypesUseCase();

				const result = await getDeviceTypesUseCase.execute();

				if (result.isLeft()) {
					return reply.status(400).send({
						success: false,
						errors: ["Credenciais Inválidas"],
						data: null,
					});
				}

				return reply.status(200).send({
					success: true,
					errors: null,
					data: result.value,
				});
			}
		);
}
