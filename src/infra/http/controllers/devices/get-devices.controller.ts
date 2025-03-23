import { auth } from "../../middleware/auth";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { getDevicesResponseBodySchema } from "../../schemas/devices";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { paginatedGetRequestParams } from "../../schemas/query";
import { makeGetDevicesUseCase } from "../../../database/prisma/use-cases/make-get-devices-use-case";

export async function getDevices(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/devices",
			{
				schema: {
					tags: ["Devices"],
					summary: "Get all devices",
					security: [{ bearerAuth: [] }],
					querystring: paginatedGetRequestParams.describe("Query params"),
					response: {
						200: defaultSuccessResponseSchema(
							getDevicesResponseBodySchema
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();
				const query = request.query;

				const getDevicesUseCase = makeGetDevicesUseCase();

				const isActiveValue =
					query.isActive === "true"
						? true
						: query.isActive === "false"
						? false
						: undefined;

				const result = await getDevicesUseCase.execute({
					storeId,
					...query,
					isActive: isActiveValue,
				});

				if (!result) {
					reply.status(400).send({
						success: false,
						errors: ["Credenciais Inválidas"],
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
