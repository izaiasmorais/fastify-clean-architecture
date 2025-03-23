import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../../infra/database/prisma/prisma";
import { BadRequestError } from "./_errors/bad-request-error";
import { ForbiddenError } from "./_errors/not-allowed-error";
import { cpnjIsNotRegistered } from "./cnpj-is-not-registered";
import { formatStoreResponse } from "./format-store-response";
import { defaultErrorResponseSchema } from "../schemas/http";
import { z } from "zod";
import {
	registerStoreRequestBodySchema,
	getDetailsResponseSchema,
	RegisterStoreRequestBody,
} from "../schemas/store";

export async function registerStore(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/api/store",
		{
			schema: {
				tags: ["Store"],
				summary: "Register a new store",
				headers: z.object({
					integratorid: z.string(),
				}),
				body: registerStoreRequestBodySchema,
				response: {
					201: getDetailsResponseSchema.describe("Created"),
					400: defaultErrorResponseSchema.describe("Forbidden"),
					500: defaultErrorResponseSchema.describe("Internal Server Error"),
				},
			},
		},
		async (request, reply) => {
			const { integratorid } = request.headers as { integratorid: string };

			const body = request.body as RegisterStoreRequestBody;

			const softwareHouse = await prisma.softwareHouse.findFirst({
				where: {
					IntegratorId: integratorid,
					Ativo: 1,
				},
			});

			if (!softwareHouse) {
				throw new BadRequestError("Software house not found!");
			}

			const store = await prisma.restaurantes.findFirst({
				where: {
					CNPJ: body.cnpj,
				},
			});

			const isCnpjRegistered = store !== null;

			if (!isCnpjRegistered)
				return cpnjIsNotRegistered({
					prisma,
					registerStoreBody: body,
					softwareHouseId: softwareHouse.Id,
					reply,
				});

			if (store.SoftwareHouse_Id === null) {
				const updatedStore = await prisma.restaurantes.update({
					where: {
						Id: store.Id,
					},
					data: {
						SoftwareHouse_Id: softwareHouse.Id,
					},
				});

				const response = await formatStoreResponse(updatedStore.Id);

				return reply.status(201).send(response);
			}

			if (store.SoftwareHouse_Id === softwareHouse.Id) {
				const response = await formatStoreResponse(store.Id);

				return reply.status(201).send(response);
			}

			if (store.SoftwareHouse_Id !== softwareHouse.Id) {
				throw new ForbiddenError(
					"This software house has no permission to access this store data!"
				);
			}
		}
	);
}
