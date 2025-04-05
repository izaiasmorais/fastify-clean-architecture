import { z } from "zod";

export const getProfileParamsSchema = z.object({
	userId: z.string().uuid(),
});

export const getProfileResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	role: z.string(),
});
