import { z } from "zod";

const collaboratorTypeSchema = z.object({
	id: z.string().length(36),
	description: z.string().max(50),
	code: z.number().int(),
});

export const collaboratorSchema = z.object({
	id: z.string().length(36),
	createdAt: z.date(),
	active: z.boolean(),
	name: z.string().max(100),
	username: z.string().max(50).nullable(),
	phone: z.string().max(20).nullable(),
	cpf: z.string().max(14).nullable(),
	birthDate: z.date().nullable(),
	collaboratorType: collaboratorTypeSchema.optional(),
});

export const getCollaboratorsResponseBodySchema = z.object({
	totalRecord: z.number(),
	totalRecordPerPage: z.number(),
	totalPage: z.number(),
	currentPageNumber: z.number(),
	collaborators: z.array(collaboratorSchema),
});

export type Collaborator = z.infer<typeof collaboratorSchema>;
