import { GetCollaboratorByIdUseCase } from "../../../../domain/use-cases/get-collaborator-by-id";
import { PrismaCollaboratorsRepository } from "../repositories/prisma-collaborators-repository";

export function makeGetCollaboratorByIdUseCase() {
	const collaboratorsRepository = new PrismaCollaboratorsRepository();
	const useCase = new GetCollaboratorByIdUseCase(collaboratorsRepository);

	return useCase;
}
