import { getDetailsResponseSchema } from "../schemas/store";
import { makeGetStoreDetailsUseCase } from "../../../infra/database/prisma/use-cases/make-get-store-details-use-case";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { BadRequestError } from "./_errors/bad-request-error";
import { auth } from "../middleware/auth";
import { getStoreDetailsParams, isoDateString } from "../schemas/query";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../schemas/http";

export async function getStoreDetails(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/api/store/details",
			{
				schema: {
					tags: ["Store"],
					summary: "Get Store Details",
					security: [{ bearerAuth: [] }],
					querystring: getStoreDetailsParams,
					response: {
						200: defaultSuccessResponseSchema(
							getDetailsResponseSchema
						).describe("Success"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const { firstUpdatedAt, lastUpdatedAt } = request.query;

				const parsedParams = getStoreDetailsParams.parse({
					firstUpdatedAt,
					lastUpdatedAt,
				});

				for (const [_, value] of Object.entries(parsedParams)) {
					if (value !== undefined) isoDateString.parse(value);
				}

				const getStoreDetailsUseCase = makeGetStoreDetailsUseCase();

				const response = await getStoreDetailsUseCase.execute(
					storeId,
					firstUpdatedAt,
					lastUpdatedAt
				);

				if (response.isLeft()) {
					throw new BadRequestError("Invalid credentials");
				}

				return reply.status(200).send(response.value);
			}
		);
}
