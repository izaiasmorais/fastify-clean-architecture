import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { paginatedGetRequestParams } from "../../schemas/query";
import { auth } from "../../middleware/auth";
import { makeGetCollaboratorsUseCase } from "../../../database/prisma/use-cases/make-get-collaborators-use-case";
import { getCollaboratorsResponseBodySchema } from "../../schemas/collaborator";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";

export async function getCollaborators(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/collaborators",
			{
				schema: {
					tags: ["Collaborators"],
					summary: "Get collaborators",
					security: [{ bearerAuth: [] }],
					querystring: paginatedGetRequestParams.describe("Query params"),
					response: {
						200: defaultSuccessResponseSchema(
							getCollaboratorsResponseBodySchema
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const query = request.query;

				const isActiveValue =
					query.isActive === "true"
						? true
						: query.isActive === "false"
						? false
						: undefined;

				const getCollaboratorsUseCase = makeGetCollaboratorsUseCase();

				const result = await getCollaboratorsUseCase.execute({
					storeId,
					...query,
					isActive: isActiveValue,
				});

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
