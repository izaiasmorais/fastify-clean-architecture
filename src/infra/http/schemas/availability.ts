import z from "zod";

const firstDateDescription =
	"Data inicial na pesquisa por data de inclusão. A data deve ser fornecida no padrão ISO 8601. <br> Exemplo: 2025-12-30T00:00:00.000Z";

const lastDateDescription =
	"Data final na pesquisa por data de inclusão. A data deve ser fornecida no padrão ISO 8601. <br> Exemplo: 2025-12-30T00:00:00.000Z";

const dateSchema = z
	.string()
	.regex(
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
		"A data deve estar no formato YYYY-MM-DDTHH:mm:ss.SSSZ"
	)
	.transform((value) => new Date(value))
	.optional();

export const paginatedGetRequestParams = z.object({
	firstCreatedAt: dateSchema.describe(firstDateDescription),
	lastCreatedAt: dateSchema.describe(lastDateDescription),
	firstUpdatedAt: dateSchema.describe(firstDateDescription),
	lastUpdatedAt: dateSchema.describe(lastDateDescription),
});

export type PaginatedGetRequestParams = z.infer<
	typeof paginatedGetRequestParams
>;

export const isoDateString = z.string();

export const getAvailabilitiesResponseBodySchema = z.array(
	z.object({
		id: z.string().uuid(),
		storeId: z.string().uuid().nullable(),
		start: z.string().nullable(),
		end: z.string().nullable(),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date().nullable(),
		menuCategoryId: z.string().uuid().nullable(),
		menuItemId: z.string().uuid().nullable(),
		startDay: z.number(),
		endDay: z.number(),
		startWeekDay: z.string(),
		endWeekDay: z.string(),
		startPeriod: z.coerce.date().nullable(),
		endPeriod: z.coerce.date().nullable(),
		couponId: z.string().uuid().nullable(),
	})
);
