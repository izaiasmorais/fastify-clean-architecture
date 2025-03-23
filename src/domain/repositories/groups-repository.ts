import type { GroupProps } from "../entities/groups";

export interface GroupsRepository {
	findMany(
		storeId: string,
		pageSize: number,
		currentPage?: number,
		isActive?: boolean,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<GroupProps[] | null>;
}
