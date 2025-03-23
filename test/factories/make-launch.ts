import { PrismaLaunchMapper } from "../../src/infra/database/prisma/mappers/prisma-launch-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import { Launch, LaunchProps } from "../../src/domain/entities/launch";

export function makeLaunch(override: Partial<LaunchProps> = {}) {
	const launch = Launch.create({
		storeId: uuidv4(),
		id: uuidv4(),
		value: 0,
		launchTypeId: uuidv4(),
		paymentMethodId: uuidv4(),
		createdAt: new Date(),
		materaTransactionId: null,
		deviceId: null,
		bankTellerId: null,
		operatorId: null,
		orderId: null,
		destinationLaunchId: null,
		originLaunchId: null,
		transferredById: null,
		transferredAt: null,
		discountValue: null,
		discountPercentage: null,
		description: null,
		pixHash: null,
		pixAlias: null,
		...override,
	});

	return launch;
}

export class LaunchFactory {
	async makePrismaLaunch(data: Partial<LaunchProps> = {}): Promise<Launch> {
		const launch = makeLaunch(data);

		await prisma.lancamento.create({
			data: PrismaLaunchMapper.toPrisma(launch),
		});

		return launch;
	}
}
