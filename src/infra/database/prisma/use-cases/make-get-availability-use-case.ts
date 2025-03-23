import { GetAvailabilityUseCase } from "../../../../domain/use-cases/get-availability";
import { PrismaAvailabilityRepository } from "../repositories/prisma-availability-repository";

export function makeGetAvailabilitiesUseCase() {
	const availabilitiesRepository = new PrismaAvailabilityRepository();

	const useCase = new GetAvailabilityUseCase(availabilitiesRepository);

	return useCase;
}
