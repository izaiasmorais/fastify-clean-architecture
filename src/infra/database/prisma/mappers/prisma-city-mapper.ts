import { City } from "../../../../domain/entities/city";
import { Municipio as PrismaCity, type Prisma } from "@prisma/client";

export class PrismaCityMapper {
	static toDomain(raw: PrismaCity): City {
		return City.create({
			id: raw.Id,
			description: raw.Descricao,
			stateId: raw.EstadoId,
			ibgeCode: raw.CodigoIBGE,
		});
	}

	static toPrisma(city: City): Prisma.MunicipioUncheckedCreateInput {
		return {
			Id: city.id,
			Descricao: city.description,
			EstadoId: city.stateId,
			CodigoIBGE: city.ibgeCode,
		};
	}
}
