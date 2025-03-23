import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import { getCitiesQueryStringSchema } from "../../schemas/citites";
import { prisma } from "../../../database/prisma/prisma";
import { z } from "zod";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { makeGetCitiesUseCase } from "../../../database/prisma/use-cases/make-get-cities-use-case";

export async function getCities(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/cities",
			{
				schema: {
					tags: ["Cities"],
					summary: "Get cities",
					security: [{ bearerAuth: [] }],
					querystring: getCitiesQueryStringSchema.describe(
						"Query string to filter cities"
					),
					response: {
						200: defaultSuccessResponseSchema(z.any()).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
			},
			async (request, reply) => {
				const query = request.query;

				const getCitiesUseCase = makeGetCitiesUseCase();

				const result = await getCitiesUseCase.execute({
					uf: query.uf,
					cityName: query.cityName,
					ibgeCode: query.ibgeCode,
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
					data: result.value.cities,
				});
			}
		);
}
