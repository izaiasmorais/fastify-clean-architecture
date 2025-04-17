import { Product } from "../entities/product";
import { ProductsRepository } from "../repositories/products-repository";
import { Either, left, right } from "../../core/types/either";
import { CustomError } from "../../core/errors/custom-error";
import { randomUUID } from "crypto";

type CreateProductRequest = {
	code: string;
	name: string;
	unitPrice: number;
};

type CreateProductUseCaseResponse = Either<CustomError, null>;

export class CreateProductUseCase {
	constructor(private productsRepository: ProductsRepository) {}

	async execute(
		request: CreateProductRequest
	): Promise<CreateProductUseCaseResponse> {
		const productWithSameCode = await this.productsRepository.findByCode(
			request.code
		);

		if (productWithSameCode) {
			return left(new CustomError(400, "Código de produto já cadastrado"));
		}

		const product = Product.create({
			...request,
			id: randomUUID(),
			createdAt: new Date(),
			updatedAt: null,
		});

		await this.productsRepository.create(product);

		return right(null);
	}
}
