import { GetStatusesUseCase } from "../../../../domain/use-cases/get-statuses";
import { PrismaStatusesRepository } from "../repositories/prisma-statuses-repository";

export function makeGetStatusesUseCase() {
	const StatusesRepository = new PrismaStatusesRepository();
	const useCase = new GetStatusesUseCase(StatusesRepository);

	return useCase;
}
