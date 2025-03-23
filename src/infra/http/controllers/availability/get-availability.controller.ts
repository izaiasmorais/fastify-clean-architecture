import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import {
	getAvailabilitiesResponseBodySchema,
	paginatedGetRequestParams,
} from "../../schemas/availability";
import { z } from "zod";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { makeGetAvailabilitiesUseCase } from "../../../database/prisma/use-cases/make-get-availability-use-case";

export async function getAvailability(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/availability",
			{
				schema: {
					tags: ["Availability"],
					summary: "Get all availability",
					security: [{ bearerAuth: [] }],
					querystring: paginatedGetRequestParams.describe("Query params"),
					response: {
						200: defaultSuccessResponseSchema(
							getAvailabilitiesResponseBodySchema
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const query = request.query;

				const getAvailabilityUseCase = makeGetAvailabilitiesUseCase();

				const result = await getAvailabilityUseCase.execute({
					storeId,
					...query,
				});

				if (result.isLeft()) {
					return reply.status(400).send({
						success: false,
						errors: ["Credenciais inválidas"],
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
