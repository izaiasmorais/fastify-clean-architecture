import { right, type Either } from "../../core/types/either";
import { env } from "../../infra/env/env";
import type { GroupProps } from "../entities/groups";
import type { GroupsRepository } from "../repositories/groups-repository";

type GetGroupsRequest = {
	storeId: string;
	currentPage: number;

	isActive?: boolean;
	firstCreatedAt?: Date;
	lastCreatedAt?: Date;
	firstUpdatedAt?: Date;
	lastUpdatedAt?: Date;
};

type GetGroupsResponse = Either<
	null,
	{
		groups: GroupProps[];
		currentPageNumber: number;
		totalRecordPerPage: number;
		totalPage: number;
		totalRecord: number;
	}
>;

export class GetGroupsUseCase {
	constructor(private groupsRepository: GroupsRepository) {}

	async execute(data: GetGroupsRequest): Promise<GetGroupsResponse> {
		const pageSize = env.PAGE_SIZE;
		const allGroups = await this.groupsRepository.findMany(data.storeId, pageSize);

		if (!allGroups) {
			return right({
				groups: [],
				currentPageNumber: 1,
				totalRecordPerPage: 0,
				totalPage: 0,
				totalRecord: 0,
			});
		}

		const filteredGroups = await this.groupsRepository.findMany(
			data.storeId,
			pageSize,
			data.currentPage,
			data.isActive,
			data.firstCreatedAt,
			data.lastCreatedAt,
			data.firstUpdatedAt,
			data.lastUpdatedAt
		);

		if (!filteredGroups) {
			return right({
				groups: [],
				currentPageNumber: 1,
				totalRecordPerPage: 0,
				totalPage: 0,
				totalRecord: 0,
			});
		}

		const currentPageNumber = data.currentPage;
		const totalPage = Math.ceil(allGroups.length / pageSize);
		const totalRecordPerPage = pageSize;
		const totalRecord = allGroups.length;

		const formattedGroups: GroupProps[] = filteredGroups.map((group) => ({
			id: group.id,
			name: group.name,
			isPizza: group.isPizza,
			status: group.status,
			createdAt: group.createdAt,
			updatedAt: group.updatedAt,
			pdvCode: group.pdvCode,
			storeId: group.storeId,
		}));

		return right({
			groups: formattedGroups,
			currentPageNumber,
			totalRecordPerPage,
			totalPage,
			totalRecord,
		});
	}
}
