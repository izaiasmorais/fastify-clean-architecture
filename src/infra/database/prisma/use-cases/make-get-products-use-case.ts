import { GetProductsUseCase } from "../../../../domain/use-cases/get-products";
import { PrismaProductsRepository } from "../repositories/prisma-products-repository";

export function makeGetProductsUseCase() {
	const productsRepository = new PrismaProductsRepository();
	const useCase = new GetProductsUseCase(productsRepository);

	return useCase;
}
