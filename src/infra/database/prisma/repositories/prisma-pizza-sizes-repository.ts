import type { PizzaSize } from "../../../../domain/entities/pizza-size";
import type { PizzaSizesRepository } from "../../../../domain/repositories/pizza-sizes-repository";
import { PrismaPizzaSizeMapper } from "../mappers/prisma-pizza-size-mapper";
import { prisma } from "../prisma";

export class PrismaPizzaSizesRepository implements PizzaSizesRepository {
	async findManyByStoreAndProduct(
		storeId: string,
		productId: string,
		isActive?: number,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<PizzaSize[] | null> {
		const pizzaSizes = await prisma.tamanhoPizzas.findMany({
			where: {
				RestauranteId: storeId,
				ProdutoId: productId,
				Ativo: isActive !== undefined ? (isActive ? 1 : 0) : undefined,
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

		if (!pizzaSizes || pizzaSizes.length === 0) {
			return null;
		}

		return pizzaSizes.map(PrismaPizzaSizeMapper.toDomain);
	}
}
