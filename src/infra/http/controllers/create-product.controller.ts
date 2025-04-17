import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeCreateProductUseCase } from "../../database/prisma/use-cases/make-create-product-use-case";
import { errorResponseSchema, successResponseSchema } from "../schemas/http";
import { createProductRequestBodySchema } from "../schemas/product";
import { z } from "zod";
import { verifyJwt } from "../middleware/auth";

export async function createProduct(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/products",
		{
			onRequest: [verifyJwt],
			schema: {
				tags: ["Products"],
				operationId: "createProduct",
				summary: "Create a new product",
				body: createProductRequestBodySchema.describe(
					"Create product request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const role = request.user.role

			const body = createProductRequestBodySchema.parse(request.body);

			const createProductUseCase = makeCreateProductUseCase();

			const response = await createProductUseCase.execute(body);

			if (response.isLeft()) {
				return reply.status(response.value.statusCode).send({
					success: false,
					errors: response.value.errors,
					data: null,
				});
			}

			return reply.status(201).send({
				success: true,
				errors: null,
				data: response.value,
			});
		}
	);
}
