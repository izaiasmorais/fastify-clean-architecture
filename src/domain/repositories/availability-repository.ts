import type { Availability } from "../entities/availability";

export interface AvailabilityRepository {
	findMany(
		storeId: string,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<Availability[] | null>;
}
