import type { LaunchType } from "../../../../domain/entities/launch-type";
import type { LaunchTypesRepository } from "../../../../domain/repositories/launch-types-repository";
import { PrismaLaunchTypeMapper } from "../mappers/prisma-launch-type-mapper";
import { prisma } from "../prisma";

export class PrismaLaunchTypesRepository implements LaunchTypesRepository {
	async findById(id: string): Promise<LaunchType | null> {
		const launchType = await prisma.tipoLancamento.findUnique({
			where: {
				Id: id,
			},
		});

		if (!launchType) {
			return null;
		}

		return PrismaLaunchTypeMapper.toDomain(launchType);
	}

	async findMany(): Promise<LaunchType[]> {
		const launchTypes = await prisma.tipoLancamento.findMany();

		return launchTypes.map((launchType) =>
			PrismaLaunchTypeMapper.toDomain(launchType)
		);
	}
}
