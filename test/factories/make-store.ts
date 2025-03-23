import { PrismaStoreMapper } from "../../src/infra/database/prisma/mappers/prisma-store-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import { Store, StoreProps } from "../../src/domain/entities/store";

export function makeStore(override: Partial<StoreProps> = {}) {
	const store = Store.create({
		id: uuidv4(),
		name: null,
		nebulaCode: null,
		accessKey: null,
		backgroundImage: null,
		logoImage: null,
		phone: null,
		parameterId: uuidv4(),
		createdAt: new Date(),
		updatedAt: null,
		cnpj: null,
		merchantId: null,
		merchantPassword: null,
		minimumTime: 0,
		isClosed: false,
		lastRequest: null,
		isActive: true,
		synchronizedAt: null,
		facebook: null,
		instagram: null,
		segment: null,
		softwareHouseId: null,
		licenseExpiration: null,
		pdvFlowVersion: null,
		email: null,
		alias: null,
		pdvFlowDbVersion: null,
		scheduledPauseStart: null,
		scheduledPauseEnd: null,
		...override,
	});

	return store;
}

export class StoreFactory {
	async makePrismaStore(data: Partial<StoreProps> = {}): Promise<Store> {
		const store = makeStore(data);

		await prisma.restaurantes.create({
			data: PrismaStoreMapper.toPrisma(store),
		});

		return store;
	}
}
