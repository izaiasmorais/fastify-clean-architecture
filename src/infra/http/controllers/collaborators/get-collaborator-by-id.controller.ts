import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../../database/prisma/prisma";
import { auth } from "../../middleware/auth";
import { getCollaboratorsResponseBodySchema } from "../../schemas/collaborator";
import { collaboratorToHttp } from "../../presenters/collaborator-to-http";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { makeGetCollaboratorByIdUseCase } from "../../../database/prisma/use-cases/make-get-collaborator-by-id-use-case";

export async function getCollaboratorById(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/collaborators/:id",
			{
				schema: {
					tags: ["Collaborators"],
					summary: "Get a collaborator by ID",
					security: [{ bearerAuth: [] }],
					params: z
						.object({
							id: z.string().uuid("The ID must be a valid UUID"),
						})
						.describe("Collaborator ID parameter"),
					response: {
						200: defaultSuccessResponseSchema(
							z.object({
								collaborator:
									getCollaboratorsResponseBodySchema.shape.collaborators
										.element,
							})
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						404: defaultErrorResponseSchema.describe("Not Found"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();
				const { id } = request.params;

				const getCollaboratorByIdUseCase = makeGetCollaboratorByIdUseCase();

				const result = await getCollaboratorByIdUseCase.execute({
					storeId,
					collaboratorId: id,
				});

				if (result.isLeft()) {
					return reply.status(result.value.statusCode).send({
						success: false,
						errors: result.value.errors,
						data: null,
					});
				}

				return reply.status(200).send({
					success: true,
					errors: null,
					data: {
						collaborator: result.value,
					},
				});
			}
		);
}
