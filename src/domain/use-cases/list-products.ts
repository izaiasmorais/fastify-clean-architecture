import { Either, right } from "../../core/types/either";
import { Product } from "../entities/product";
import { ProductsRepository } from "../repositories/products-repository";
import { CustomError } from "../../core/errors/custom-error";

type ListProductsUseCaseResponse = Either<CustomError, Product[]>;

export class ListProductsUseCase {
	constructor(private productsRepository: ProductsRepository) {}

	async execute(): Promise<ListProductsUseCaseResponse> {
		const products = await this.productsRepository.findMany();

		return right(products);
	}
}
