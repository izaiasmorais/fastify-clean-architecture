import type { LaunchType } from "../entities/launch-type";

export interface LaunchTypesRepository {
	findById(id: string): Promise<LaunchType | null>;
	findMany(): Promise<LaunchType[]>;
}
