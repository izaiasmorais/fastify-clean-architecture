import { PrismaLaunchTypeMapper } from "../../src/infra/database/prisma/mappers/prisma-launch-type-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import {
	LaunchType,
	LaunchTypeProps,
} from "../../src/domain/entities/launch-type";

export function makeLaunchType(override: Partial<LaunchTypeProps> = {}) {
	const launchType = LaunchType.create({
		id: uuidv4(),
		code: 1,
		description: "Default Launch Type",
		...override,
	});

	return launchType;
}

export class LaunchTypeFactory {
	async makePrismaLaunchType(
		data: Partial<LaunchTypeProps> = {}
	): Promise<LaunchType> {
		const launchType = makeLaunchType(data);

		await prisma.tipoLancamento.create({
			data: PrismaLaunchTypeMapper.toPrisma(launchType),
		});

		return launchType;
	}
}
