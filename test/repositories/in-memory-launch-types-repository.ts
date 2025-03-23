import type { LaunchType } from "../../src/domain/entities/launch-type";
import type { LaunchTypesRepository } from "../../src/domain/repositories/launch-types-repository";

export class InMemoryLaunchTypesRepository implements LaunchTypesRepository {
	public launchTypes: LaunchType[] = [];

	async findById(id: string) {
		return this.launchTypes.find((launchType) => launchType.id === id) || null;
	}

	async findMany(): Promise<LaunchType[]> {
		return this.launchTypes;
	}
}
