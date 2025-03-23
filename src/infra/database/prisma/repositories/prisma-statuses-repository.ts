import { StatusesRepository } from "../../../../domain/repositories/statuses-repository";
import { Status } from "../../../../domain/entities/status";
import { PrismaStatusMapper } from "../mappers/prisma-status-mapper";
import { prisma } from "../prisma";

export class PrismaStatusesRepository implements StatusesRepository {
	async findManyByStoreId(): Promise<Status[] | null> {
		const statuses = await prisma.status.findMany();

		if (!statuses) {
			return null;
		}

		return statuses.map((status) => PrismaStatusMapper.toDomain(status));
	}
}
