import {
	StoreRepository,
	findByClientCredentialsResponse,
} from "../../src/domain/repositories/stores-repository";
import { Restaurant } from "../../src/domain/entities/restaurant";
import type { Store } from "../../src/domain/entities/store";

export class InMemoryStoreRepository implements StoreRepository {
	public restaurants: Restaurant[] = [];
	public stores: Store[] = [];

	async findById(restaurantId: string): Promise<Restaurant | null> {
		const restaurant = this.restaurants.find(
			(restaurant) => restaurant.Id === restaurantId
		);

		if (!restaurant) {
			return null;
		}

		return restaurant;
	}

	async findByClientCredentials(
		clientId: string,
		clientSecret: string,
		clientDocument: string
	): Promise<findByClientCredentialsResponse | null> {
		const restaurant = this.restaurants.find(
			(restaurant) =>
				restaurant.MerchantId === clientId &&
				restaurant.MerchantPwd === clientSecret &&
				restaurant.SoftwareHouse?.IntegratorId === clientDocument
		);

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
		const store = this.stores.find(
			(store) =>
				store.nebulaCode === nebulaCode && store.accessKey === accessKey
		);

		if (!store) {
			return null;
		}

		return store;
	}
}
