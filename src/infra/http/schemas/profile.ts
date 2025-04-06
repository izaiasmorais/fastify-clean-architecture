import { z } from "zod";

export const getProfileResponseSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string().email(),
	role: z.enum(["COMPANY", "CONSULTANT", "CITY"]),
});
