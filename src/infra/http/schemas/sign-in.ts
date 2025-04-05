import { z } from "zod";

export const signInRequestBodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const signInResponseSchema = z.object({
	accessToken: z.string(),
});
