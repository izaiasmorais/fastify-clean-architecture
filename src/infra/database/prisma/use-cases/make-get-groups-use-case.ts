import { GetGroupsUseCase } from "../../../../domain/use-cases/get-groups";
import { PrismaGroupsRepository } from "../repositories/prisma-groups-repository";

export function makeGetGroupsUseCase() {
	const groupsRepository = new PrismaGroupsRepository();
	const useCase = new GetGroupsUseCase(groupsRepository);

	return useCase;
}
