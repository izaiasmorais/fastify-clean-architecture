import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeListProductsUseCase } from "../../database/prisma/use-cases/make-list-products-use-case";
import { errorResponseSchema, successResponseSchema } from "../schemas/http";
import { productSchema } from "../schemas/product";
import { z } from "zod";
import { verifyJwt } from "../middleware/auth";

export async function listProducts(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/products",
		{
			onRequest: [verifyJwt],
			schema: {
				tags: ["Products"],
				operationId: "listProducts",
				summary: "List all products",
				response: {
					200: successResponseSchema(z.array(productSchema)).describe("OK"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const listProductsUseCase = makeListProductsUseCase();

			const response = await listProductsUseCase.execute();

			if (response.isLeft()) {
				return reply.status(response.value.statusCode).send({
					success: false,
					errors: response.value.errors,
					data: null,
				});
			}

			return reply.status(200).send({
				success: true,
				errors: null,
				data: response.value.map((product) => ({
					id: product.id,
					code: product.code,
					name: product.name,
					unitPrice: product.unitPrice,
					createdAt: product.createdAt.toISOString(),
					updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null,
				})),
			});
		}
	);
}
