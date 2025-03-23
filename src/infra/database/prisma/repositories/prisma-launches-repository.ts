import type { Launch } from "../../../../domain/entities/launch";
import type { LaunchesRepository } from "../../../../domain/repositories/launches-repository";
import { PrismaLaunchMapper } from "../mappers/prisma-launch-mapper";
import { prisma } from "../prisma";

export class PrismaLaunchesRepository implements LaunchesRepository {
	async findById(storeId: string, id: string): Promise<Launch | null> {
		const launch = await prisma.lancamento.findUnique({
			where: {
				Id: id,
				RestauranteId: storeId,
			},
		});

		if (!launch) {
			return null;
		}

		return PrismaLaunchMapper.toDomain(launch);
	}

	async findLaunchByOriginId(
		storeId: string,
		originLaunchId: string
	): Promise<Launch | null> {
		const launch = await prisma.lancamento.findFirst({
			where: {
				RestauranteId: storeId,
				LancamentoOrigemId: originLaunchId,
			},
		});

		if (!launch) {
			return null;
		}

		return PrismaLaunchMapper.toDomain(launch);
	}

	async findLaunchByDestinationId(
		storeId: string,
		destinationLaunchId: string
	): Promise<Launch | null> {
		const launch = await prisma.lancamento.findFirst({
			where: {
				RestauranteId: storeId,
				LancamentoDestinoId: destinationLaunchId,
			},
		});

		if (!launch) {
			return null;
		}

		return PrismaLaunchMapper.toDomain(launch);
	}

	async create(data: Launch): Promise<void> {
		await prisma.lancamento.create({
			data: PrismaLaunchMapper.toPrisma(data),
		});
	}
}
