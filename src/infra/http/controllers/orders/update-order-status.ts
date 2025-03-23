import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { auth } from "../../middleware/auth";
import { z } from "zod";
import { prisma } from "../../../database/prisma/prisma";
import { adjustTimezone } from "../../../../core/utils/adjust-timezone";
import { updateOrderStatusRequestBodySchema } from "../../schemas/order";
import { v4 as uuidv4 } from "uuid";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";

export async function updateOrderStatus(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.patch(
			"/api/orders",
			{
				schema: {
					tags: ["Orders"],
					summary: "Update order status",
					security: [{ bearerAuth: [] }],
					body: updateOrderStatusRequestBodySchema.describe(
						"Update order status request body"
					),
					response: {
						204: defaultSuccessResponseSchema(z.null()).describe("No Content"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						405: defaultErrorResponseSchema.describe("Method Not Allowed"),
						409: defaultErrorResponseSchema.describe("Conflict"),
					},
				},
				preHandler: async (request) => {
					await request.getCurrentStoreId();
				},
			},
			async (request, reply) => {
				const { id, status } = request.body;

				if (status === 5) {
					return reply.status(405).send({
						success: false,
						errors: ["Método não permitido"],
						data: null,
					});
				}

				const order = await prisma.pedidos.findUnique({
					where: {
						Id: id,
					},
				});

				if (!order) {
					return reply.status(400).send({
						success: false,
						errors: ["Pedido não encontrado"],
						data: null,
					});
				}

				if (order.Status === 5) {
					return reply.status(409).send({
						success: false,
						errors: ["O pedido já foi cancelado"],
						data: null,
					});
				}

				if (order.Status === 6) {
					return reply.status(409).send({
						success: false,
						errors: ["O pedido já está pronto"],
						data: null,
					});
				}

				await prisma.pedidoStatus.create({
					data: {
						Status: order.Status,
						PedidoId: order.Id,
						CriadoEm: adjustTimezone(new Date()),
						Id: uuidv4(),
					},
				});

				await prisma.pedidos.update({
					where: {
						Id: id,
					},
					data: {
						Status: status,
					},
				});

				return reply.status(204).send({
					success: true,
					errors: null,
					data: null,
				});
			}
		);
}
