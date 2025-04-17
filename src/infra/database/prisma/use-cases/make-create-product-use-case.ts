import { PrismaProductsRepository } from "../repositories/prisma-products-repository";
import { CreateProductUseCase } from "../../../../domain/use-cases/create-product";

export function makeCreateProductUseCase() {
	const productRepository = new PrismaProductsRepository();

	const useCase = new CreateProductUseCase(productRepository);

	return useCase;
}
