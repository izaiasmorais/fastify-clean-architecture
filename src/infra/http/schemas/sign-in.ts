import { z } from "zod";

export const signInRequestBodySchema = z.object({
	grantType: z.string(),
	clientId: z.string(),
	clientSecret: z.string(),
	clientDocument: z.string().optional(),
});

export const signInResponseSchema = z.object({
	created: z.string(),
	expirationIn: z.string(),
	accessToken: z.string(),
	grantType: z.string(),
	store: z
		.object({
			id: z.string().uuid(),
			cnpj: z.string().nullable(),
			name: z.string().nullable(),
			alias: z.string().nullable(),
			nebulaCode: z.string().nullable(),
		})
		.optional(),
	collaborator: z
		.object({
			id: z.string().uuid(),
			birthDate: z.coerce.date().nullable(),
			name: z.string().nullable(),
			cpf: z.string().nullable(),
			phone: z.string().nullable(),
			collaboratorType: z.object({
				id: z.string().uuid(),
				description: z.string(),
				code: z.number(),
			}),
		})
		.optional(),
});
