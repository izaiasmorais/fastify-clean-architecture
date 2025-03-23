import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { auth } from "../../middleware/auth";
import { z } from "zod";
import { getPaymentMethodsResponseBodySchema } from "../../schemas/payment-method";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { makeGetPaymentMethodsUseCase } from "../../../database/prisma/use-cases/make-get-payment-methods-use-case";

export async function getPaymentMethods(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/payment-methods",
			{
				schema: {
					tags: ["Payment Methods"],
					summary: "Get All Payment Methods",
					security: [{ bearerAuth: [] }],
					headers: z.object({
						deviceid: z.string().uuid(),
					}),
					response: {
						200: defaultSuccessResponseSchema(
							getPaymentMethodsResponseBodySchema
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const { deviceid } = request.headers;

				const getPaymentMethodsUseCase = makeGetPaymentMethodsUseCase();

				const result = await getPaymentMethodsUseCase.execute(
					storeId,
					deviceid
				);

				if (result.isLeft()) {
					return reply.status(result.value.statusCode).send({
						success: false,
						errors: result.value.errors,
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
