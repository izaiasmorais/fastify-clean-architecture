import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { adjustTimezone } from "../../../../core/utils/adjust-timezone";
import { cancelOrderRequestBodySchema } from "../../schemas/order";
import { prisma } from "../../../database/prisma/prisma";
import { auth } from "../../middleware/auth";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import {
	defaultSuccessResponseSchema,
	defaultErrorResponseSchema,
} from "../../schemas/http";

export async function cancelOrder(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.patch(
			"/api/orders/cancel",
			{
				schema: {
					tags: ["Orders"],
					summary: "Cancel order",
					security: [{ bearerAuth: [] }],
					body: cancelOrderRequestBodySchema.describe(
						"Cancel order request body"
					),
					response: {
						204: defaultSuccessResponseSchema(z.null()).describe("No Content"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						403: defaultErrorResponseSchema.describe("Forbidden"),
						404: defaultErrorResponseSchema.describe("Not Found"),
						409: defaultErrorResponseSchema.describe("Conflict"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const {
					orderId,
					cancellantionReason,
					bankTellerId,
					managerId,
					operatorId,
				} = request.body;

				// managerId existe, ativo e é do tipo 1

				const doesManagerExist = await prisma.colaborador.findFirst({
					where: {
						RestauranteId: storeId,
						Id: managerId,
					},
				});

				if (!doesManagerExist) {
					return reply.status(404).send({
						success: false,
						errors: ["Gerente não encontrado"],
						data: null,
					});
				}

				const isManagerActive = await prisma.colaborador.findFirst({
					where: {
						RestauranteId: storeId,
						Id: managerId,
						Ativo: true,
					},
				});

				if (!isManagerActive) {
					return reply.status(403).send({
						success: false,
						errors: ["O gerente está inativo"],
						data: null,
					});
				}

				const isManagerValid = await prisma.colaborador.findFirst({
					where: {
						RestauranteId: storeId,
						Id: managerId,
						TipoColaborador: {
							Codigo: 1,
						},
					},
				});

				if (!isManagerValid) {
					return reply.status(403).send({
						success: false,
						errors: ["Esse usuário não não pode efetuar esse cancelamento"],
						data: null,
					});
				}

				// operatorid existe, ativo

				const doesOperatorExist = await prisma.colaborador.findFirst({
					where: {
						RestauranteId: storeId,
						Id: operatorId,
					},
				});

				if (!doesOperatorExist) {
					return reply.status(404).send({
						success: false,
						errors: ["Operador não encontrado"],
						data: null,
					});
				}

				const isOperatorActive = await prisma.colaborador.findFirst({
					where: {
						Id: operatorId,
						RestauranteId: storeId,
						Ativo: true,
					},
				});

				if (!isOperatorActive) {
					return reply.status(403).send({
						success: false,
						errors: ["Operador inativo"],
						data: null,
					});
				}

				// bankTellerId existe, aberto, tem que ser do operatorId

				const doesBankTellerExist = await prisma.caixa.findFirst({
					where: {
						RestauranteId: storeId,
						Id: bankTellerId,
					},
				});

				if (!doesBankTellerExist) {
					return reply.status(404).send({
						success: false,
						errors: ["Caixa não encontrado"],
						data: null,
					});
				}

				const isBankTellerOpen = await prisma.caixa.findFirst({
					where: {
						RestauranteId: storeId,
						Id: bankTellerId,
						FechadoEm: null,
					},
				});

				if (!isBankTellerOpen) {
					return reply.status(403).send({
						success: false,
						errors: ["O caixa está fechado, não é possível cancelar pedidos"],
						data: null,
					});
				}

				const isBankTellerFromOperator = await prisma.caixa.findFirst({
					where: {
						RestauranteId: storeId,
						Id: bankTellerId,
						OperadorId: operatorId,
					},
				});

				if (!isBankTellerFromOperator) {
					return reply.status(403).send({
						success: false,
						errors: ["O caixa não pertence ao operador"],
						data: null,
					});
				}

				// orderId existe, não foi cancelado, não está pronto
				const order = await prisma.pedidos.findUnique({
					where: {
						RestauranteId: storeId,
						Id: orderId,
					},
				});

				if (!order) {
					return reply.status(404).send({
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

				await prisma.$transaction(async (tx) => {
					await tx.pedidoStatus.create({
						data: {
							Status: order.Status,
							PedidoId: order.Id,
							CriadoEm: adjustTimezone(new Date()),
							Id: uuidv4(),
						},
					});

					await tx.pedidos.update({
						where: {
							RestauranteId: storeId,
							Id: orderId,
						},
						data: {
							Status: 5,
							MotivoCancelamento: cancellantionReason,
						},
					});
				});

				return reply.status(204).send({
					success: true,
					errors: null,
					data: null,
				});
			}
		);
}
