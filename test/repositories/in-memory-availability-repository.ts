import type { Availability } from "../../src/domain/entities/availability";
import type { AvailabilityRepository } from "../../src/domain/repositories/availability-repository";

export class InMemoryAvailabilityRepository implements AvailabilityRepository {
	public availabilities: Availability[] = [];

	async findMany(
		storeId: string,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<Availability[] | null> {
		let filteredAvailabilities = this.availabilities.filter(
			(availability) => availability.storeId === storeId
		);

		if (firstCreatedAt) {
			filteredAvailabilities = filteredAvailabilities.filter(
				(availability) => availability.createdAt >= firstCreatedAt
			);
		}

		if (lastCreatedAt) {
			filteredAvailabilities = filteredAvailabilities.filter(
				(availability) => availability.createdAt <= lastCreatedAt
			);
		}

		if (firstUpdatedAt) {
			filteredAvailabilities = filteredAvailabilities.filter((availability) =>
				availability.updatedAt
					? availability.updatedAt >= firstUpdatedAt
					: false
			);
		}

		if (lastUpdatedAt) {
			filteredAvailabilities = filteredAvailabilities.filter((availability) =>
				availability.updatedAt ? availability.updatedAt <= lastUpdatedAt : false
			);
		}

		return filteredAvailabilities.length > 0 ? filteredAvailabilities : null;
	}
}
