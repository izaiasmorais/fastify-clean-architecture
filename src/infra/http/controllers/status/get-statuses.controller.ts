import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { auth } from "../../middleware/auth";
import { makeGetStatusesUseCase } from "../../../database/prisma/use-cases/make-get-statuses-use-case";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { getStatusesResponseSchema } from "../../schemas/status";
import { z } from "zod";

export async function getStatuses(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/status",
			{
				schema: {
					tags: ["Status"],
					summary: "Get statuses",
					security: [{ bearerAuth: [] }],
					response: {
						200: defaultSuccessResponseSchema(z.any()).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						404: defaultErrorResponseSchema.describe("Not Found"),
					},
				},
			},
			async (_, reply) => {
				const getStatusesUseCase = makeGetStatusesUseCase();

				const result = await getStatusesUseCase.execute();

				if (result.isLeft()) {
					return reply.status(400).send({
						success: false,
						errors: ["Credenciais Inválidas"],
						data: null,
					});
				}

				reply.send({
					success: true,
					errors: null,
					data: result.value,
				});
			}
		);
}
