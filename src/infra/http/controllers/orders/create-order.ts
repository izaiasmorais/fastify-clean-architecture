import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { validateProducts } from "../../validators/validate-products";
import { validatePaymentMethod } from "../../validators/validate-payment-method";
import { validateOrderType } from "../../validators/validate-order-type";
import { createOrderRequestBodySchema } from "../../schemas/order";
import { formatDecimal } from "../../../../core/utils/format-decimal";
import { prisma } from "../../../database/prisma/prisma";
import { auth } from "../../middleware/auth";
import { z } from "zod";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import {
	Order,
	OrderItem,
	OrderItemComplement,
} from "../../../../domain/entities/order-deprecated";

export async function createOrder(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.post(
			"/api/orders",
			{
				schema: {
					tags: ["Orders"],
					summary: "Create Order",
					security: [{ bearerAuth: [] }],
					body: createOrderRequestBodySchema.describe("Create Order Request"),
					response: {
						200: defaultSuccessResponseSchema(z.any()).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();
				let errors: string[] = [];

				const body = request.body;

				const paymentMethodError = await validatePaymentMethod(
					storeId,
					body.paymentMethod.id
				);

				if (paymentMethodError) errors.push(paymentMethodError);

				const orderTypeError = await validateOrderType(body.orderType.id);

				if (orderTypeError) errors.push(orderTypeError);

				const productIds = body.items.map((item) => item.productId);
				const productNames = body.items.map((item) => item.productName);

				const { errors: productErrors } = await validateProducts(
					productIds,
					productNames
				);

				errors = errors.concat(productErrors);

				if (errors.length > 0) {
					return reply.status(400).send({
						success: false,
						errors,
						data: null,
					});
				}

				let orderItems: OrderItem[] = [];
				let orderItemsComplements: OrderItemComplement[] = [];

				body.items.forEach((item) => {
					orderItems.push({
						Id: item.id, // Id do item
						ProdutoId: item.productId, // Id do produto
						PedidoItemId: null, // Nulo

						TamanhoPizzaId: item.pizzaSizeId,
						Quantidade: item.quantity,
						Preco: item.unitPrice,
						SubTotal: item.subtotal,
						Observacao: item.observation,

						CriadoEm: item.createdAt,
						AlteradoEm: item.updatedAt,

						PedidoSubItens: orderItemsComplements,
					});

					item.subItems?.forEach((subItem) => {
						orderItems.push({
							Id: subItem.id, // Id do subitem (item)
							ProdutoId: subItem.productId, // Id do produto
							PedidoItemId: item.id, // Id do item cujo subitem pertence

							TamanhoPizzaId: subItem.pizzaSizeId,
							Quantidade: subItem.quantity,
							Preco: subItem.unitPrice,
							SubTotal: subItem.subtotal,
							Observacao: subItem.observation,

							CriadoEm: subItem.createdAt,
							AlteradoEm: subItem.updatedAt,

							PedidoSubItens: [],
						});
					});

					item.complements?.forEach((complement) => {
						orderItemsComplements.push({
							Id: complement.id, // Id do complemento
							ComplementoId: complement.productId, // Id do produto
							PedidoItemId: item.id, // Id do item cujo complemento pertence
							Quantidade: complement.quantity,
							Preco: complement.unitPrice,
							SubTotal: complement.subtotal,
							CriadoEm: complement.createdAt,
							AlteradoEm: complement.updatedAt,
						});
					});
				});

				const formattedOrderItems = orderItems.map((item) => ({
					Id: item.Id,
					PedidoItemId: item.PedidoItemId,
					ProdutoId: item.ProdutoId,
					TamanhoPizzaId: item.TamanhoPizzaId,
					Quantidade: item.Quantidade,
					Preco: item.Preco,
					SubTotal: item.SubTotal,
					Observacao: item.Observacao,
					CriadoEm: item.CriadoEm,
					AlteradoEm: item.AlteradoEm,

					PedidoSubItens: {
						create: item.PedidoSubItens.map((subItem) => ({
							Id: subItem.Id,
							ComplementoId: subItem.ComplementoId,
							Quantidade: subItem.Quantidade,
							Preco: subItem.Preco,
							SubTotal: subItem.SubTotal,
							CriadoEm: subItem.CriadoEm,
							AlteradoEm: subItem.AlteradoEm ? subItem.AlteradoEm : null,
						})),
					},
				}));

				const order: Order = {
					RestauranteId: storeId,
					Id: body.id,
					Status: body.orderStatus,
					DispositivoId: body.deviceId,
					CriadoEm: body.createdAt,
					ValorTroco: formatDecimal(body.exchangeValue),
					ValorTotal: formatDecimal(body.totalValue),
					TaxaServico: formatDecimal(body.serviceFee || 0),
					Pago: body.isPaid,
					HashPixPenseBank: body.pixHashPenseBank,
					Alias: body.alias,
					TipoPedidoId: body.orderType.id,
					RestauranteFormaPagamentoId: body.paymentMethod.id,
					AlteradoEm: body.updatedAt,
					CaixaId: body.bankTellerId !== undefined ? body.bankTellerId : null,
					OperadorId:
						body.collaboratorId !== undefined ? body.collaboratorId : null,
					GerenteId: body.managerId !== undefined ? body.managerId : null,
					PedidoItens: orderItems,
				};

				const doesOrderAlreadtExists = await prisma.pedidos.findUnique({
					where: {
						Id: order.Id,
					},
				});

				if (doesOrderAlreadtExists) {
					return reply.status(400).send({
						success: false,
						errors: ["O pedido já existe"],
						data: null,
					});
				}

				const newOrder = await prisma.pedidos.create({
					data: {
						RestauranteId: storeId,
						Id: order.Id,
						Status: order.Status,
						DispositivoId: order.DispositivoId,
						CriadoEm: order.CriadoEm,
						ValorTroco: order.ValorTroco,
						ValorTotal: order.ValorTotal,
						TaxaServico: order.TaxaServico,
						Pago: order.Pago,
						HashPixPenseBank: order.HashPixPenseBank,
						Alias: order.Alias,
						TipoPedidoId: order.TipoPedidoId,
						RestauranteFormaPagamentoId: order.RestauranteFormaPagamentoId,
						PedidoItens: {
							create: formattedOrderItems,
						},
					},
				});

				return reply.status(200).send({
					success: true,
					errors: null,
					data: newOrder,
				});
			}
		);
}
