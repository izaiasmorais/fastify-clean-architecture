import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { auth } from "../../middleware/auth";
import { getProductsResponseSchema } from "../../schemas/products";
import { paginatedGetRequestParams } from "../../schemas/query";
import { makeGetProductsUseCase } from "../../../database/prisma/use-cases/make-get-products-use-case";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";

export async function getProducts(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/products",
			{
				schema: {
					tags: ["Products"],
					summary: "Get products",
					security: [{ bearerAuth: [] }],
					querystring: paginatedGetRequestParams.describe("Query params"),
					response: {
						200: defaultSuccessResponseSchema(
							getProductsResponseSchema
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const query = request.query;

				const isActiveValue =
					query.isActive === "true"
						? true
						: query.isActive === "false"
						? false
						: undefined;

				const getProductsUseCase = makeGetProductsUseCase();

				const result = await getProductsUseCase.execute({
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
