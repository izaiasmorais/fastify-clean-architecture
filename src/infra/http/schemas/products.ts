import { z } from "zod";

export const getProductsResponseSchema = z.object({
	totalRecord: z.number(),
	totalRecordPerPage: z.number(),
	totalPage: z.number(),
	currentPageNumber: z.number(),
	products: z.array(
		z.object({
			id: z.string(),
			name: z.string().nullable(),
			description: z.string().nullable(),
			type: z.string(),
			image: z.string().nullable(),
			price: z.number(),
			pdvPrice: z.number(),
			status: z.boolean(),
			createdAt: z.date(),
			externalCode: z.string().nullable(),
			updatedAt: z.date().nullable(),
			groups: z
				.array(
					z.object({
						id: z.string(),
						groupId: z.string(),
						isActive: z.boolean(),
					})
				)
				.nullable(),
		})
	),
});
