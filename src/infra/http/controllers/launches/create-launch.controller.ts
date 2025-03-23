import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createLaunchRequestBodySchema } from "../../schemas/launch";
import { auth } from "../../middleware/auth";
import { makeCreateLaunchUseCase } from "../../../database/prisma/use-cases/make-create-launch-use-case";
import { z } from "zod";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";

export async function createLaunch(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.post(
			"/api/launches",
			{
				schema: {
					tags: ["Launches"],
					summary: "Create a new launch",
					security: [{ bearerAuth: [] }],
					body: createLaunchRequestBodySchema,
					response: {
						201: defaultSuccessResponseSchema(z.null()).describe("Created"),
						400: defaultErrorResponseSchema.describe("Bad Request"),
						401: defaultErrorResponseSchema.describe("Unauthorized"),
						404: defaultErrorResponseSchema.describe("Not Found"),
						409: defaultErrorResponseSchema.describe("Conflict"),
					},
				},
			},
			async (request, reply) => {
				const storeId = await request.getCurrentStoreId();

				const body = request.body;

				const createLaunchUseCase = makeCreateLaunchUseCase();

				const response = await createLaunchUseCase.execute({
					storeId,
					...body,
				});

				if (response.isLeft()) {
					const status = response.value.statusCode;

					return reply.status(status).send({
						success: false,
						errors: response.value.errors,
						data: null,
					});
				}

				return reply.status(201).send({
					success: true,
					errors: null,
					data: null,
				});
			}
		);
}
