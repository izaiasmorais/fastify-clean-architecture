import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { auth } from "../../middleware/auth";
import { prisma } from "../../../database/prisma/prisma";
import { closeBankTellerRequestBodySchema } from "../../schemas/bank-teller";
import { adjustTimezone } from "../../../../core/utils/adjust-timezone";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";

export async function closeBankTeller(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.post(
			"/api/bank-tellers/close",
			{
				schema: {
					tags: ["Bank Tellers"],
					summary: "Close a bank teller",
					security: [{ bearerAuth: [] }],
					body: closeBankTellerRequestBodySchema.describe("Request body"),
					response: {
						200: defaultSuccessResponseSchema(z.null()).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						404: defaultErrorResponseSchema.describe("Not Found"),
						409: defaultErrorResponseSchema.describe("Conflict"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const body = closeBankTellerRequestBodySchema.parse(request.body);

				const bankTeller = await prisma.caixa.findFirst({
					where: {
						Id: body.id,
					},
				});

				if (!bankTeller) {
					return reply.status(404).send({
						success: false,
						errors: ["Caixa não encontrado"],
						data: null,
					});
				}

				if (bankTeller.FechadoEm !== null) {
					return reply.status(409).send({
						success: false,
						errors: ["O caixa já está fechado"],
						data: null,
					});
				}

				await prisma.caixa.update({
					where: {
						RestauranteId: storeId,
						Id: body.id,
					},
					data: {
						FechadoEm: body.closedAt,
						ValorRegistrado: body.registeredValue,
						ValorGaveta: body.reportedValue,
						other_CaixaLancamento: {
							create: body.launchBankTellers.map((item) => ({
								Id: item.id,
								Valor: item.value,
								Tipo: item.tipo,
								FormaPagamentoId: item.paymentMethodId,
								CriadoEm: adjustTimezone(new Date()),
								Observacao: item.description,
							})),
						},
					},
				});

				return reply.status(200).send({
					success: true,
					errors: null,
					data: null,
				});
			}
		);
}
