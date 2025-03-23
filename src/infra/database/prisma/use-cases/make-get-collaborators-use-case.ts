import { GetCollaboratorsUseCase } from "../../../../domain/use-cases/get-collaborators";
import { PrismaCollaboratorsRepository } from "../repositories/prisma-collaborators-repository";

export function makeGetCollaboratorsUseCase() {
	const collaboratorsRepository = new PrismaCollaboratorsRepository();
	const useCase = new GetCollaboratorsUseCase(collaboratorsRepository);

	return useCase;
}
