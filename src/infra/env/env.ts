import z from "zod";

import "dotenv/config";

const envSchema = z.object({
	ENV_DATABASE_SERVER: z.string(),
	ENV_DATABASE_PORT: z.coerce.number().default(3306),
	ENV_DATABASE_NAME: z.string(),
	ENV_DATABASE_USER: z.string(),
	ENV_DATABASE_PWD: z.string(),
	ENV_DATABASE_SSL_MODE: z.string(),
	ENV_DATABASE_MAXPOOLSIZE: z.coerce.number().default(75),
	ENV_FUSO_HORARIO: z.coerce.number().default(-3),
	ENV_DATABASE_URL: z.string(),
	ENV_PORT: z.coerce.number().default(3000),
	ENV_EXPIRES_IN: z.coerce.number().default(3600),
	ENV_NOME_IMAGEM: z.string(),
	ENV_URL_WHATSAPP: z.string(),
	ENV_LOCAL_WHATSAPP: z.string(),
	NODE_ENV: z.string().default("Production"),
	PAGE_SIZE: z.coerce.number().default(30),
});

export const env = envSchema.parse(process.env);
