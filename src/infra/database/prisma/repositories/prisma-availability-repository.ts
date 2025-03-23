import type { Availability } from "../../../../domain/entities/availability";
import type { AvailabilityRepository } from "../../../../domain/repositories/availability-repository";
import { PrismaAvailabilityMapper } from "../mappers/prisma-availability-mapper";
import { prisma } from "../prisma";

export class PrismaAvailabilityRepository implements AvailabilityRepository {
	async findMany(
		storeId: string,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<Availability[] | null> {
		const availability = await prisma.disponibilidades.findMany({
			where: {
				RestauranteId: storeId,
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

		if (!availability) {
			return null;
		}

		return availability.map(PrismaAvailabilityMapper.toDomain);
	}
}
