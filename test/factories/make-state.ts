import { prisma } from "../../src/infra/database/prisma/prisma";
import { State, StateProps } from "../../src/domain/entities/state";
import { PrismaStateMapper } from "../../src/infra/database/prisma/mappers/prisma-state-mapper";

export function makeState(override: Partial<StateProps> = {}) {
	const state = State.create({
		id: "SP",
		ibgeCode: 12345,
		description: "São Paulo",
		cities: [],
		...override,
	});

	return state;
}

export class StateFactory {
	async makePrismaState(data: Partial<StateProps> = {}): Promise<State> {
		const state = makeState(data);

		await prisma.estado.create({
			data: PrismaStateMapper.toPrisma(state),
		});

		return state;
	}
}
