import { PrismaCollaboratorMapper } from "../../src/infra/database/prisma/mappers/prisma-collaborator-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import {
	Collaborator,
	CollaboratorProps,
} from "../../src/domain/entities/collaborator";

export function makeCollaborator(override: Partial<CollaboratorProps> = {}) {
	const collaborator = Collaborator.create({
		id: uuidv4(),
		createdAt: new Date(),
		collaboratorTypeId: uuidv4(),
		storeId: uuidv4(),
		updatedAt: null,
		username: null,
		password: null,
		name: "John Doe",
		cpf: null,
		birthDate: null,
		phone: null,
		active: true,
		collaboratorType: {
			id: "564b7c1c-9d2f-4554-b074-6a3ed9f44743",
			description: "Operador de Caixa",
			code: 3,
		},
		...override,
	});

	return collaborator;
}

export class CollaboratorFactory {
	async makePrismaCollaborator(
		data: Partial<CollaboratorProps> = {}
	): Promise<Collaborator> {
		const collaborator = makeCollaborator(data);

		await prisma.colaborador.create({
			data: PrismaCollaboratorMapper.toPrisma(collaborator),
		});

		return collaborator;
	}
}
