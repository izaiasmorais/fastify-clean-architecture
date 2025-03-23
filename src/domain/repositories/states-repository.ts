import type { State } from "../entities/state";

export interface StatesRepository {
	getById(id: string): Promise<State | null>;
}
