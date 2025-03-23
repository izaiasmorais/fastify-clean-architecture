import type { GroupProps } from "../../../../domain/entities/groups";
import type { GroupsRepository } from "../../../../domain/repositories/groups-repository";
import { PrismaGroupMapper } from "../mappers/prisma-group-mapper";
import { prisma } from "../prisma";

export class PrismaGroupsRepository implements GroupsRepository {
	async findMany(
		storeId: string,
		pageSize: number,
		currentPage: number,
		isActive?: boolean,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<GroupProps[] | null> {
		const skip = (currentPage ?? 1 - 1) * pageSize;
		const take = pageSize;

		const groups = await prisma.categorias.findMany({
			skip,
			take,
			where: {
				RestauranteId: storeId,
				Status: isActive,
				CriadoEm: {
					gte: firstCreatedAt,
					lte: lastCreatedAt,
				},
				AlteradoEm: {
					gte: firstUpdatedAt,
					lte: lastUpdatedAt,
				},
			},
		});

		if (!groups || groups.length === 0) {
			return null;
		}

		return groups.map(PrismaGroupMapper.toDomain);
	}
}
