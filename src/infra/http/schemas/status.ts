import { z } from "zod";

export const getStatusesResponseSchema = z.object({
	id: z.string(),
	createdAt: z.coerce.date().nullable(),
	updatedAt: z.coerce.date().nullable(),
	description: z.string(),
	value: z.number().nullable(),
	name: z.string().nullable(),
});
