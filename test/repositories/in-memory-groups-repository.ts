import type { GroupProps } from "../../src/domain/entities/groups";
import type { GroupsRepository } from "../../src/domain/repositories/groups-repository";

export class InMemoryGroupsRepository implements GroupsRepository {
	public groups: GroupProps[] = [];

	async findMany(
		storeId: string,
		pageSize: number,
		currentPage?: number,
		isActive?: boolean,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<GroupProps[] | null> {
		let filteredGroups = this.groups.filter(
			(group) => group.storeId === storeId
		);

		if (isActive !== undefined) {
			filteredGroups = filteredGroups.filter(
				(group) => group.status === isActive
			);
		}

		if (firstCreatedAt) {
			filteredGroups = filteredGroups.filter(
				(group) => group.createdAt >= firstCreatedAt
			);
		}

		if (lastCreatedAt) {
			filteredGroups = filteredGroups.filter(
				(group) => group.createdAt <= lastCreatedAt
			);
		}

		if (firstUpdatedAt) {
			filteredGroups = filteredGroups.filter((group) =>
				group.updatedAt ? group.updatedAt >= firstUpdatedAt : false
			);
		}

		if (lastUpdatedAt) {
			filteredGroups = filteredGroups.filter((group) =>
				group.updatedAt ? group.updatedAt <= lastUpdatedAt : false
			);
		}

		if (!currentPage) {
			currentPage = 1;
		}

		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedGroups = filteredGroups.slice(startIndex, endIndex);

		return paginatedGroups.length > 0 ? paginatedGroups : null;
	}
}
