import type { Status } from "../entities/status";

export interface StatusesRepository {
	findManyByStoreId(): Promise<Status[] | null>
}
