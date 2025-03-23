import type { PizzaSize } from "../entities/pizza-size";

export interface PizzaSizesRepository {
	findManyByStoreAndProduct(
		storeId: string,
		productId: string,
		isActive?: number,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<PizzaSize[] | null>;
}
