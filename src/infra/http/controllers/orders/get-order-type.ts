import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { auth } from "../../middleware/auth";
import { prisma } from "../../../database/prisma/prisma";
import { getOrderTypesResponseBodySchema } from "../../schemas/order";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";

export async function getOrderTypes(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/orders/types",
			{
				schema: {
					tags: ["Orders"],
					summary: "Get order types",
					security: [{ bearerAuth: [] }],
					response: {
						200: defaultSuccessResponseSchema(
							getOrderTypesResponseBodySchema
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
				const orderTypes = await prisma.tipoPedido.findMany();

				if (!orderTypes) {
					return reply.status(400).send({
						success: false,
						errors: ["No order types found"],
						data: null,
					});
				}

				const getOrderTypesRespone = orderTypes.map((orderType) => {
					return {
						id: orderType.Id,
						description: orderType.Descricao,
						code: orderType.Codigo,
					};
				});

				return reply.status(200).send({
					success: true,
					errors: null,
					data: getOrderTypesRespone,
				});
			}
		);
}
