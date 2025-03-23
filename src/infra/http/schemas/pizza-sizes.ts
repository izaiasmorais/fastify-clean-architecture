import { z } from "zod";

export const getPizzasSizesResponseSchema = z.object({
	currentPageNumber: z.number(),
	totalRecordPerPage: z.number(),
	totalPage: z.number(),
	totalRecord: z.number(),
	pizzaSizes: z.array(
		z.object({
			id: z.string(),
			description: z.string().nullable(),
			createdAt: z.date(),
			updatedAt: z.date().nullable(),
			value: z.number(),
			pdvPrice: z.number(),
			isActive: z.number().nullable(),
		})
	),
});
