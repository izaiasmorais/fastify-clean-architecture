import type { State } from "../../src/domain/entities/state";
import type { StatesRepository } from "../../src/domain/repositories/states-repository";

export class InMemoryStatesRepository implements StatesRepository {
	public states: State[] = [];

	async getById(id: string): Promise<State | null> {
		return this.states.find((state) => state.id === id) || null;
	}
}
