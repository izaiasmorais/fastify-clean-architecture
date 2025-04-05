import z from "zod";

import "dotenv/config";

const envSchema = z.object({
	DATABASE_URL: z.string().url().optional(),
	ENV_PORT: z.coerce.number().default(3333).optional(),
	NODE_ENV: z
		.enum(["development", "production"])
		.default("development")
		.optional(),
	ENV_EXPIRES_IN: z.coerce
		.number()
		.default(60 * 60)
		.optional(), // 1 hour
});

export const env = envSchema.parse(process.env);
