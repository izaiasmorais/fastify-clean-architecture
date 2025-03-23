import { z } from "zod";

export const getGroupsResponseBodySchema = z.object({
	currentPageNumber: z.number(),
	totalRecordPerPage: z.number(),
	totalPage: z.number(),
	totalRecord: z.number(),
	groups: z.array(
		z.object({
			id: z.string(),
			name: z.string().nullable(),
			status: z.boolean(),
			createdAt: z.date(),
			updatedAt: z.date().nullable(),
			pdvCode: z.string().nullable(),
		})
	),
});
