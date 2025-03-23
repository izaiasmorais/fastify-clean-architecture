import type { Launch } from "../entities/launch";

export interface LaunchesRepository {
	findById(storeId: string, id: string): Promise<Launch | null>;
	findLaunchByOriginId(
		storeId: string,
		originId: string
	): Promise<Launch | null>;
	findLaunchByDestinationId(
		storeId: string,
		destinationId: string
	): Promise<Launch | null>;
	create(request: Launch): Promise<void>;
}
