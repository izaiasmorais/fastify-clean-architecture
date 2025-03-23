import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import { prisma } from "../../../database/prisma/prisma";
import { getPizzasSizesResponseSchema } from "../../schemas/pizza-sizes";
import {
	isoDateString,
	paginatedGetRequestParams,
	PaginatedGetRequestParams,
} from "../../schemas/query";
import z from "zod";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { makeGetPizzaSizesUseCase } from "../../../database/prisma/use-cases/make-get-pizza-sizes-use-case";

export async function getPizzaSizes(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/pizzas/product/:productId",
			{
				schema: {
					tags: ["Pizzas"],
					summary: "Get pizza sizes by product id",
					security: [{ bearerAuth: [] }],
					params: z
						.object({
							productId: z.string(),
						})
						.describe("Product Id"),
					querystring: paginatedGetRequestParams,
					response: {
						200: defaultSuccessResponseSchema(
							getPizzasSizesResponseSchema
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const { productId } = request.params as { productId: string };

				const {

					isActive,
					firstCreatedAt,
					lastCreatedAt,
					firstUpdatedAt,
					lastUpdatedAt,
				} = request.query;

				const isActiveValue =
					isActive === "true" ? 1 : isActive === "false" ? 0 : undefined;

				const getPizzaSizesUseCase = makeGetPizzaSizesUseCase();

				const result = await getPizzaSizesUseCase.execute({
					storeId,
					productId,
					isActive: isActiveValue,
					firstCreatedAt: firstCreatedAt ? new Date(firstCreatedAt) : undefined,
					lastCreatedAt: lastCreatedAt ? new Date(lastCreatedAt) : undefined,
					firstUpdatedAt: firstUpdatedAt ? new Date(firstUpdatedAt) : undefined,
					lastUpdatedAt: lastUpdatedAt ? new Date(lastUpdatedAt) : undefined,
				});

				if (result.isLeft()) {
					return reply.status(400).send({
						success: false,
						errors: ["Credenciais Inválidas"],
						data: null,
					});
				}

				reply.status(200).send({
					success: true,
					errors: null,
					data: result.value,
				});
			}
		);
}
