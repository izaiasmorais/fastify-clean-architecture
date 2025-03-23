import { GetLaunchTypesUseCase } from "../../../../domain/use-cases/get-launch-types";
import { PrismaLaunchTypesRepository } from "../repositories/prisma-launch-types-repository";

export function makeGetLaunchTypesUseCase() {
	const launchTypesRepository = new PrismaLaunchTypesRepository();
	const useCase = new GetLaunchTypesUseCase(launchTypesRepository);

	return useCase;
}
