import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeSignInUseCase } from "../../../database/prisma/use-cases/make-sign-in-use-case";
import { BadRequestError } from "../_errors/bad-request-error";
import {
	defaultErrorResponseSchema,
	defaultSuccessResponseSchema,
} from "../../schemas/http";
import {
	signInRequestBodySchema,
	signInResponseSchema,
} from "../../schemas/sign-in";

export async function signIn(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/api/auth/sign-in",
		{
			schema: {
				tags: ["Auth"],
				summary: "Authenticate with email and password",
				body: signInRequestBodySchema.describe("Sign in request body"),
				response: {
					201: defaultSuccessResponseSchema(signInResponseSchema).describe(
						"Created"
					),
					400: defaultErrorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const { grantType, clientId, clientSecret, clientDocument } =
				request.body;

			const signInUseCase = makeSignInUseCase(reply);

			const response = await signInUseCase.execute({
				grantType,
				clientId,
				clientSecret,
				clientDocument,
			});

			if (response.isLeft()) {
				return reply.status(response.value.statusCode).send({
					success: false,
					errors: response.value.errors,
					data: null,
				});
			}

			return reply.status(201).send(response.value);
		}
	);
}
