import { ListProductsUseCase } from "../../../../domain/use-cases/list-products";
import { PrismaProductsRepository } from "../repositories/prisma-products-repository";

export function makeListProductsUseCase() {
	const productsRepository = new PrismaProductsRepository();
	
	const useCase = new ListProductsUseCase(productsRepository);

	return useCase;
}
