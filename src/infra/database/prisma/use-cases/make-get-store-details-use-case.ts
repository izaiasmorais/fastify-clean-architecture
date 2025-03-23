import { GetStoreDetailsUseCase } from "../../../../domain/use-cases/get-store-details";
import { PrismaStoreRepository } from "../repositories/prisma-store-repository";

export function makeGetStoreDetailsUseCase() {
	const storeRepository = new PrismaStoreRepository();
	const useCase = new GetStoreDetailsUseCase(storeRepository);

	return useCase;
}
