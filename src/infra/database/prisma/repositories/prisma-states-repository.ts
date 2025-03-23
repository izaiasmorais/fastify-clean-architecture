import type { State } from "../../../../domain/entities/state";
import type { StatesRepository } from "../../../../domain/repositories/states-repository";
import { PrismaStateMapper } from "../mappers/prisma-state-mapper";
import { prisma } from "../prisma";

export class PrismaStatesRepository implements StatesRepository {
	async getById(id: string): Promise<State | null> {
		const state = await prisma.estado.findUnique({
			where: {
				Id: id,
			},
		});

		if (!state) {
			return null;
		}

		return PrismaStateMapper.toDomain(state);
	}
}
