import type { PizzaSize } from "../../src/domain/entities/pizza-size";
import type { PizzaSizesRepository } from "../../src/domain/repositories/pizza-sizes-repository";

export class InMemoryPizzaSizesRepository implements PizzaSizesRepository {
	public pizzaSizes: PizzaSize[] = [];

	async findManyByStoreAndProduct(
		storeId: string,
		productId: string,
		isActive?: number,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<PizzaSize[] | null> {
		let filteredPizzaSizes = this.pizzaSizes.filter(
			(pizzaSize) =>
				pizzaSize.storeId === storeId && pizzaSize.productId === productId
		);

		if (isActive !== undefined) {
			filteredPizzaSizes = filteredPizzaSizes.filter(
				(pizzaSize) => pizzaSize.active === isActive
			);
		}

		if (firstCreatedAt) {
			filteredPizzaSizes = filteredPizzaSizes.filter(
				(pizzaSize) => pizzaSize.createdAt >= firstCreatedAt
			);
		}

		if (lastCreatedAt) {
			filteredPizzaSizes = filteredPizzaSizes.filter(
				(pizzaSize) => pizzaSize.createdAt <= lastCreatedAt
			);
		}

		if (firstUpdatedAt) {
			filteredPizzaSizes = filteredPizzaSizes.filter((pizzaSize) =>
				pizzaSize.updatedAt ? pizzaSize.updatedAt >= firstUpdatedAt : false
			);
		}

		if (lastUpdatedAt) {
			filteredPizzaSizes = filteredPizzaSizes.filter((pizzaSize) =>
				pizzaSize.updatedAt ? pizzaSize.updatedAt <= lastUpdatedAt : false
			);
		}

		return filteredPizzaSizes.length > 0 ? filteredPizzaSizes : null;
	}
}
