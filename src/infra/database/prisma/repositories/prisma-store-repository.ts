import { Restaurant } from "../../../../domain/entities/restaurant";
import { prisma } from "../prisma";
import {
	StoreRepository,
	findByClientCredentialsResponse,
} from "../../../../domain/repositories/stores-repository";
import type { Store } from "../../../../domain/entities/store";
import { PrismaStoreMapper } from "../mappers/prisma-store-mapper";

export class PrismaStoreRepository implements StoreRepository {
	async findById(
		storeId: string,
		firstUpdatedAt: string | undefined,
		lastUpdatedAt: string | undefined
	): Promise<Restaurant | null> {
		const store = await prisma.restaurantes.findUnique({
			where: {
				Id: storeId,
				AlteradoEm: {
					gte: firstUpdatedAt,
					lte: lastUpdatedAt,
				},
			},
			include: {
				Enderecos: true,
				SoftwareHouse: true,
			},
		});

		return store;
	}

	async findByClientCredentials(
		clientId: string,
		clientSecret: string,
		clientDocument: string
	): Promise<findByClientCredentialsResponse | null> {
		const restaurant = await prisma.restaurantes.findFirst({
			where: {
				MerchantId: clientId,
				MerchantPwd: clientSecret,
				Ativo: true,
			},
			select: {
				Id: true,
				SoftwareHouse: {
					where: {
						IntegratorId: {
							equals: clientDocument,
						},
					},
				},
			},
		});

		if (!restaurant) {
			return null;
		}

		return {
			Id: restaurant.Id,
		};
	}

	async findByNebulaCodeAndAccessKey(
		nebulaCode: string,
		accessKey: string
	): Promise<Store | null> {
		const store = await prisma.restaurantes.findFirst({
			where: {
				NebulaCode: nebulaCode,
				ChaveAcesso: accessKey,
			},
		});

		if (!store) {
			return null;
		}

		return PrismaStoreMapper.toDomain(store);
	}
}
