import type { Launch } from "../../src/domain/entities/launch";
import type { LaunchesRepository } from "../../src/domain/repositories/launches-repository";

export class InMemoryLaunchesRepository implements LaunchesRepository {
	public launches: Launch[] = [];

	async findById(storeId: string, id: string) {
		return (
			this.launches.find(
				(launch) => launch.storeId === storeId && launch.id === id
			) || null
		);
	}

	async findLaunchByOriginId(storeId: string, originLaunchId: string) {
		return (
			this.launches.find(
				(launch) =>
					launch.storeId === storeId && launch.originLaunchId === originLaunchId
			) || null
		);
	}

	async findLaunchByDestinationId(
		storeId: string,
		destinationLaunchId: string
	) {
		return (
			this.launches.find(
				(launch) =>
					launch.storeId === storeId &&
					launch.destinationLaunchId === destinationLaunchId
			) || null
		);
	}

	async create(data: Launch) {
		this.launches.push(data);
	}
}
