import { z } from "zod";

export const getCitiesQueryStringSchema = z.object({
	uf: z.string().length(2),
	cityName: z.string().min(3),
	ibgeCode: z.coerce.number().optional(),
});

export const cityResponseBodySchema = z.object({
	cityId: z.string().uuid(),
	cityName: z.string(),
	uf: z.string().length(2),
	state: z.object({
		id: z.string().uuid(),
		ibgeCode: z.string(),
		description: z.string(),
	}),
});
