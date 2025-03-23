import type {
	Collaborator,
	CollaboratorProps,
} from "../../../../domain/entities/collaborator";
import type { CollaboratorsRepository } from "../../../../domain/repositories/collaborators-repository";
import { PrismaCollaboratorMapper } from "../mappers/prisma-collaborator-mapper";
import { prisma } from "../prisma";
import { getMd5Hash } from "../../../../core/utils/get-md5-hash";

export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
	async findById(storeId: string, id: string): Promise<Collaborator | null> {
		const collaborator = await prisma.colaborador.findUnique({
			where: {
				Id: id,
				RestauranteId: storeId,
			},
			include: {
				TipoColaborador: {
					select: {
						Id: true,
						Descricao: true,
						Codigo: true,
					},
				},
			},
		});

		if (!collaborator) {
			return null;
		}

		return PrismaCollaboratorMapper.toDomain(collaborator);
	}

	async findByUsernameAndPassword(
		clientId: string,
		clientSecret: string,
		clientDocument: string
	): Promise<Collaborator | null> {
		const collaborator = await prisma.colaborador.findFirst({
			where: {
				Usuario: clientId,
				Senha: getMd5Hash(clientSecret),
				RestauranteId: clientDocument,
				Ativo: true,
			},
			include: {
				TipoColaborador: {
					select: {
						Id: true,
						Descricao: true,
						Codigo: true,
					},
				},
			},
		});

		if (!collaborator) {
			return null;
		}

		return PrismaCollaboratorMapper.toDomain(collaborator);
	}

	async findMany(
		storeId: string,
		pageSize: number,
		currentPage?: number,
		isActive?: boolean,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<CollaboratorProps[] | null> {
		const skip = (currentPage ?? 1 - 1) * pageSize;
		const take = pageSize;

		const collaborators = await prisma.colaborador.findMany({
			skip,
			take,
			where: {
				RestauranteId: storeId,
				Ativo: isActive,
				CriadoEm: {
					gte: firstCreatedAt,
					lte: lastCreatedAt,
				},
				AlteradoEm: {
					gte: firstUpdatedAt,
					lte: lastUpdatedAt,
				},
			},
			include: {
				TipoColaborador: {
					select: {
						Id: true,
						Descricao: true,
						Codigo: true,
					},
				},
			},
		});

		if (!collaborators) {
			return null;
		}

		return collaborators.map(PrismaCollaboratorMapper.toDomain);
	}
}
