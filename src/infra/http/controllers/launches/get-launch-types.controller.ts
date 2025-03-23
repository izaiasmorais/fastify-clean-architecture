import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { makeGetLaunchTypesUseCase } from "../../../database/prisma/use-cases/make-get-launch-types-use-case";
import { getLaunchTypesResponseBodySchema } from "../../schemas/launch";
import { auth } from "../../middleware/auth";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";

export async function getLaunchTypes(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/launches/types",
			{
				schema: {
					tags: ["Launches"],
					summary: "Get launch types",
					security: [{ bearerAuth: [] }],
					response: {
						200: defaultSuccessResponseSchema(
							getLaunchTypesResponseBodySchema
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
				preHandler: async (request) => {
					await request.getCurrentStoreId();
				},
			},
			async (_, reply) => {
				const getLaunchTypesUseCase = makeGetLaunchTypesUseCase();

				const result = await getLaunchTypesUseCase.execute();

				if (result.isLeft()) {
					return reply.status(400).send({
						success: false,
						errors: ["Bad Request"],
						data: null,
					});
				}

				return reply.status(200).send({
					success: true,
					errors: null,
					data: result.value,
				});
			}
		);
}
