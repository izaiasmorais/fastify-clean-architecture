import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import { prisma } from "../../../database/prisma/prisma";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import {
	bankTellerResponseBodySchema,
	getBankTellerByIdParamsSchema,
} from "../../schemas/bank-teller";

export async function getBankTellerById(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/bank-tellers/open/collaboratorId/:collaboratorId/deviceId/:deviceId",
			{
				schema: {
					tags: ["Bank Tellers"],
					summary: "Get an open bank teller by collaborator and device ID",
					security: [{ bearerAuth: [] }],
					params: getBankTellerByIdParamsSchema.describe("Path parameters"),
					response: {
						200: defaultSuccessResponseSchema(
							bankTellerResponseBodySchema
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						404: defaultErrorResponseSchema.describe("Not Found"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const { collaboratorId, deviceId } = request.params;

				const bankTeller = await prisma.caixa.findFirst({
					where: {
						RestauranteId: storeId,
						OperadorId: collaboratorId,
						DispositivoId: deviceId,
						FechadoEm: null,
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

				if (!bankTeller) {
					return reply.status(404).send({
						success: false,
						errors: ["Não foi encontrado um caixa aberto para o operador"],
						data: null,
					});
				}

				return reply.status(200).send({
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
