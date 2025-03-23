import { Collaborator } from "../../../../domain/entities/collaborator";
import { Prisma } from "@prisma/client";

export interface PrismaCollaborator
	extends Prisma.ColaboradorGetPayload<{
		include: {
			TipoColaborador: {
				select: {
					Id: boolean;
					Descricao: boolean;
					Codigo: boolean;
				};
			};
		};
	}> {}

export class PrismaCollaboratorMapper {
	static toDomain(raw: PrismaCollaborator): Collaborator {
		return Collaborator.create({
			id: raw.Id,
			createdAt: raw.CriadoEm,
			updatedAt: raw.AlteradoEm,
			collaboratorTypeId: raw.TipoColaboradorId,
			storeId: raw.RestauranteId,
			username: raw.Usuario,
			password: raw.Senha,
			name: raw.Nome,
			cpf: raw.Cpf,
			birthDate: raw.DataNascimento,
			phone: raw.Celular,
			active: raw.Ativo,
			collaboratorType: {
				id: raw.TipoColaborador.Id,
				description: raw.TipoColaborador.Descricao,
				code: raw.TipoColaborador.Codigo,
			},
		});
	}

	static toPrisma(
		collaborator: Collaborator
	): Prisma.ColaboradorUncheckedCreateInput {
		return {
			Id: collaborator.id,
			CriadoEm: collaborator.createdAt,
			TipoColaboradorId: collaborator.collaboratorTypeId,
			RestauranteId: collaborator.storeId,
			Usuario: collaborator.username,
			Senha: collaborator.password,
			Nome: collaborator.name,
			Cpf: collaborator.cpf,
			DataNascimento: collaborator.birthDate,
			Celular: collaborator.phone,
			Ativo: collaborator.active,
		};
	}
}
