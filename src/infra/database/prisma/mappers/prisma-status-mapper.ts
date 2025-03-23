import { Status as PrismaStatus, Prisma } from "@prisma/client";
import { Status } from "../../../../domain/entities/status";

export class PrismaStatusMapper {
	static toDomain(raw: PrismaStatus): Status {
		return Status.create({
			id: raw.Id,
			createdAt: raw.CriadoEm,
			updatedAt: raw.AlteradoEm,
			description: raw.Descricao,
			value: raw.Valor,
			name: raw.Nome,
		});
	}

	static toPrisma(status: Status): Prisma.StatusUncheckedCreateInput {
		return {
			Id: status.id,
			CriadoEm: status.createdAt,
			AlteradoEm: status.updatedAt,
			Descricao: status.description,
			Valor: status.value,
			Nome: status.name,
		};
	}
}
