import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryProductsRepository } from "../../../test/repositories/in-memory-products-repository";
import { CreateProductUseCase } from "./create-product";
import { makeProduct } from "../../../test/factories/make-product";

let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: CreateProductUseCase;

describe("Create Product Use Case", () => {
	beforeEach(() => {
		inMemoryProductsRepository = new InMemoryProductsRepository();
		sut = new CreateProductUseCase(inMemoryProductsRepository);
	});

	it("should be able to create a new product", async () => {
		const product = makeProduct({
			code: "",
			name: "",
			unitPrice: 100,
		});

		const result = await sut.execute({
			code: product.code,
			name: product.name,
			unitPrice: product.unitPrice,
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toBeNull();
		}
		expect(inMemoryProductsRepository.products[0].code).toEqual(product.code);
		expect(inMemoryProductsRepository.products[0].name).toEqual(product.name);
		expect(inMemoryProductsRepository.products[0].unitPrice).toEqual(
			product.unitPrice
		);
	});

	it("should not be able to create a product with existing code", async () => {
		const existingProduct = makeProduct({
			code: "PROD-001",
		});

		await inMemoryProductsRepository.create(existingProduct);

		const result = await sut.execute({
			code: "PROD-001",
			name: "Another Product",
			unitPrice: 200,
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(400);
			expect(result.value.message).toEqual("Código de produto já cadastrado");
		}
		expect(inMemoryProductsRepository.products).toHaveLength(1);
	});
});
