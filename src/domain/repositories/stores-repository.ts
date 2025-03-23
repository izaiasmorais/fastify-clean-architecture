import { Restaurant } from "../entities/restaurant";
import type { Store } from "../entities/store";

export interface findByClientCredentialsResponse {
	Id: string;
}

export interface StoreRepository {
	findById(
		storeId: string,
		firstUpdatedAt: string | undefined,
		lastUpdatedAt: string | undefined
	): Promise<Restaurant | null>;
	findByClientCredentials(
		clientId: string,
		clientSecret: string,
		clientDocument: string
	): Promise<findByClientCredentialsResponse | null>;
	findByNebulaCodeAndAccessKey(
		nebulaCode: string,
		accessKey: string
	): Promise<Store | null>;
}
