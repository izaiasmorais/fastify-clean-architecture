import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import { prisma } from "../../../database/prisma/prisma";
import { adjustTimezone } from "../../../../core/utils/adjust-timezone";
import {
	openBankTellerRequestBodySchema,
	bankTellerResponseBodySchema,
} from "../../schemas/bank-teller";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";

export async function openBankTeller(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.post(
			"/api/bank-tellers/open",
			{
				schema: {
					tags: ["Bank Tellers"],
					summary: "Open a bank teller",
					security: [{ bearerAuth: [] }],
					body: openBankTellerRequestBodySchema.describe("Request body"),
					response: {
						201: defaultSuccessResponseSchema(
							bankTellerResponseBodySchema
						).describe("Created"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthored"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const body = openBankTellerRequestBodySchema.parse(request.body);

				const bankTellerExists = await prisma.caixa.findFirst({
					where: {
						Id: body.id,
					},
				});

				if (bankTellerExists) {
					return reply.status(400).send({
						success: false,
						errors: ["O caixa já existe"],
						data: null,
					});
				}

				const isBankTellerOpened = await prisma.caixa.findFirst({
					where: {
						DispositivoId: body.deviceId,
						OperadorId: body.collaboratorId,
						FechadoEm: null,
						ValorRegistrado: null,
						ValorGaveta: null,
					},
				});

				if (isBankTellerOpened) {
					return reply.status(400).send({
						success: false,
						errors: ["O caixa já está aberto"],
						data: null,
					});
				}

				const bankTeller = await prisma.caixa.create({
					data: {
						RestauranteId: storeId,
						Id: body.id,
						AbertoEm: body.openedAt,
						SessaoOffline: body.offlineSession,
						DispositivoId: body.deviceId,
						ValorAbertura: body.openingValue,
						OperadorId: body.collaboratorId,
						CriadoEm: adjustTimezone(new Date()),
						Sessao: 0,
					},
					select: {
						Id: true,
						Sessao: true,
						SessaoOffline: true,
						AbertoEm: true,
						ValorAbertura: true,
						FechadoEm: true,
						ValorGaveta: true,
						ValorRegistrado: true,
					},
				});

				return reply.status(201).send({
					success: true,
					errors: null,
					data: {
						id: bankTeller.Id,
						session: bankTeller.Sessao,
						offlineSession: bankTeller.SessaoOffline,
						openingValue: bankTeller.ValorAbertura.toNumber(),
						openedAt: bankTeller.AbertoEm,
						closedAt: bankTeller.FechadoEm,
						registeredValue:
							bankTeller.ValorRegistrado &&
							bankTeller.ValorRegistrado.toNumber(),
						reportedValue:
							bankTeller.ValorGaveta && bankTeller.ValorGaveta.toNumber(),
					},
				});
			}
		);
}
