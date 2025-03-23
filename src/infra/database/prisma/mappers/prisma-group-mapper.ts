import { Categorias as PrismaGroup, Prisma } from "@prisma/client";
import { Group } from "../../../../domain/entities/groups";

export class PrismaGroupMapper {
	static toDomain(raw: PrismaGroup): Group {
		return Group.create({
			id: raw.Id,
			storeId: raw.RestauranteId,
			name: raw.Nome,
			isPizza: raw.Pizza,
			status: raw.Status,
			createdAt: raw.CriadoEm,
			updatedAt: raw.AlteradoEm,
			pdvCode: raw.CodigoPDV,
		});
	}

	static toPrisma(group: Group): Prisma.CategoriasUncheckedCreateInput {
		return {
			Id: group.id,
			RestauranteId: group.storeId,
			Nome: group.name,
			Pizza: group.isPizza,
			Status: group.status,
			CriadoEm: group.createdAt,
			AlteradoEm: group.updatedAt,
			CodigoPDV: group.pdvCode,
		};
	}
}
