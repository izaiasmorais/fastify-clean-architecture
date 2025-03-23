import { State } from "../../../../domain/entities/state";
import { Estado as PrismaState, type Prisma } from "@prisma/client";
import { PrismaCityMapper } from "./prisma-city-mapper";

export class PrismaStateMapper {
	static toDomain(raw: PrismaState): State {
		return State.create({
			id: raw.Id,
			description: raw.Descricao,
			ibgeCode: raw.CodigoIBGE,
			cities: [],
		});
	}

	static toPrisma(state: State): Prisma.EstadoUncheckedCreateInput {
		return {
			Id: state.id,
			Descricao: state.description,
			CodigoIBGE: state.ibgeCode,
		};
	}
}
