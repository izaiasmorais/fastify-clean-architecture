import { env } from "../../env/env";
import { paginatedGetRequestParams, isoDateString } from "../schemas/query";

interface PaginationQuery {
	currentPage: number;
	isActive?: string | undefined;
	firstCreatedAt?: Date | undefined;
	lastCreatedAt?: Date | undefined;
	firstUpdatedAt?: Date | undefined;
	lastUpdatedAt?: Date | undefined;
}

export function usePagination(query: PaginationQuery) {
	const {
		currentPage,
		isActive,
		firstCreatedAt,
		lastCreatedAt,
		firstUpdatedAt,
		lastUpdatedAt,
	} = query;

	const parsedParams = paginatedGetRequestParams.parse(query);

	function isActiveValue() {
		if (isActive === "false") return false;
		if (isActive === "true") return true;
		return undefined;
	}

	for (const [key, value] of Object.entries(parsedParams)) {
		const keys = ["currentPage", "pageSize", "isActive"];
		if (!keys.includes(key)) {
			isoDateString.parse(value);
		}
	}

	const skipValue = (currentPage - 1) * env.PAGE_SIZE;

	return {
		currentPage,
		isActive,
		firstCreatedAt,
		lastCreatedAt,
		firstUpdatedAt,
		lastUpdatedAt,
		skipValue,
		isActiveValue,
	};
}
