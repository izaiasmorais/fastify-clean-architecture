import { GetCitiesUseCase } from "../../../../domain/use-cases/get-cities";
import { PrismaCitiesRepository } from "../repositories/prisma-cities-repository";
import { PrismaStatesRepository } from "../repositories/prisma-states-repository";

export function makeGetCitiesUseCase() {
	const citiesRepository = new PrismaCitiesRepository();
	const statesRepository = new PrismaStatesRepository();
	const useCase = new GetCitiesUseCase(citiesRepository, statesRepository);

	return useCase;
}
