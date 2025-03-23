import z from "zod";

const firstDateDescription =
	"Data inicial na pesquisa por data de inclusão. A data deve ser fornecida no padrão ISO 8601. <br> Exemplo: 2025-12-30T00:00:00.000Z";

const lastDateDescription =
	"Data final na pesquisa por data de inclusão. A data deve ser fornecida no padrão ISO 8601. <br> Exemplo: 2025-12-30T00:00:00.000Z";

const activeDescription =
	"Somente itens ativos: true | Somente itens falsos: false <br> Exemplo: true";

const currentPageDescription = "Página atual <br> Exemplo: 1";

const dateSchema = z
	.string()
	.regex(
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
		"A data deve estar no formato YYYY-MM-DDTHH:mm:ss.SSSZ"
	)
	.transform((value) => new Date(value))
	.optional();

export const paginatedGetRequestParams = z.object({
	currentPage: z.coerce.number().describe(currentPageDescription),
	isActive: z.string().optional().describe(activeDescription),
	firstCreatedAt: dateSchema.describe(firstDateDescription),
	lastCreatedAt: dateSchema.describe(lastDateDescription),
	firstUpdatedAt: dateSchema.describe(firstDateDescription),
	lastUpdatedAt: dateSchema.describe(lastDateDescription),
});

export type PaginatedGetRequestParams = z.infer<
	typeof paginatedGetRequestParams
>;

export const getStoreDetailsParams = z.object({
	firstUpdatedAt: z.string().optional().describe(firstDateDescription),
	lastUpdatedAt: z.string().optional().describe(lastDateDescription),
});

export type GetStoreDetailsParams = z.infer<typeof getStoreDetailsParams>;

export const isoDateString = z
	.string()
	.regex(
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
		"A data deve estar no formato YYYY-MM-DDTHH:mm:ss.SSSZ"
	);
