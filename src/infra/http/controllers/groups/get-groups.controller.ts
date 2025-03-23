import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import { getGroupsResponseBodySchema } from "../../schemas/groups";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import { paginatedGetRequestParams } from "../../schemas/query";
import { makeGetGroupsUseCase } from "../../../database/prisma/use-cases/make-get-groups-use-case";

export async function getGroups(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/groups",
			{
				schema: {
					tags: ["Groups"],
					summary: "Get groups",
					security: [{ bearerAuth: [] }],
					querystring: paginatedGetRequestParams.describe("Query params"),
					response: {
						200: defaultSuccessResponseSchema(
							getGroupsResponseBodySchema
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						500: defaultErrorResponseSchema.describe("Internal Server Error"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();
				const query = request.query;

				const getGroupsUseCase = makeGetGroupsUseCase();

				const isActiveValue =
					query.isActive === "true"
						? true
						: query.isActive === "false"
						? false
						: undefined;

				const result = await getGroupsUseCase.execute({
					storeId,
					...query,
					isActive: isActiveValue,
				});

				if (!result) {
					reply.status(400).send({
						success: false,
						errors: [],
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
