import type { Status } from "../../src/domain/entities/status";
import type { StatusesRepository } from "../../src/domain/repositories/statuses-repository";

export class InMemoryStatusesRepository implements StatusesRepository {
	public statuses: Status[] = [];

	async findManyByStoreId(): Promise<Status[] | null> {
		return this.statuses.length > 0 ? this.statuses : null;
	}
}
