import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { auth } from "../../middleware/auth";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { z } from "zod";
import { prisma } from "../../../database/prisma/prisma";
import { orderToHttp } from "../../presenters/order-to-http";

export async function getOrderById(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/orders/:id",
			{
				schema: {
					tags: ["Orders"],
					summary: "Get order by id",
					security: [{ bearerAuth: [] }],
					params: z.object({
						id: z.string().uuid(),
					}),
					response: {
						200: defaultSuccessResponseSchema(z.any()).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
				preHandler: async (request) => {
					await request.getCurrentStoreId();
				},
			},
			async (_, reply) => {
				const order = await prisma.pedidos.findUnique({
					where: {
						Id: _.params.id,
					},
					select: {
						Id: true,
						CriadoEm: true,
						Status: true,
						Pago: true,
						ValorTroco: true,
						NumPedido: true,
						TaxaServico: true,
						ValorTotal: true,
						HashPixPenseBank: true,
						Alias: true,
						MotivoCancelamento: true,
						DispositivoLoja: {
							select: {
								NomeDispositivo: true,
								Alias: true,
								IPAddress: true,
								NumeroSerie: true,
							},
						},
						TipoPedido: {
							select: {
								Id: true,
								Descricao: true,
								Codigo: true,
							},
						},
						RestauranteFormaPagamento: {
							select: {
								Id: true,
								FormasPagamento: {
									select: {
										Nome: true,
										TipoFormaPagamento: true,
										Codigo: true,
									},
								},
							},
						},
						PedidoItens: {
							select: {
								Id: true,
								ProdutoId: true,
								PedidoId: true,
								Preco: true,
								Quantidade: true,
								SubTotal: true,
								TamanhoPizzaId: true,
								Observacao: true,
								CriadoEm: true,
								AlteradoEm: true,
								CategoriaId: true,
								PedidoItemId: true,

								PedidoSubItens: true,
							},
						},
					},
				});

				if (!order) {
					reply.code(404).send({
						success: false,
						errors: ["Order not found"],
						data: null,
					});
					return;
				}

				reply.send({
					success: true,
					errors: null,
					data: orderToHttp(order),
				});
			}
		);
}
