import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryProductsRepository } from "../../../test/repositories/in-memory-products-repository";
import { ListProductsUseCase } from "./list-products";
import { makeProduct } from "../../../test/factories/make-product";

let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: ListProductsUseCase;

describe("List Products Use Case", () => {
	beforeEach(() => {
		inMemoryProductsRepository = new InMemoryProductsRepository();
		sut = new ListProductsUseCase(inMemoryProductsRepository);
	});

	it("should be able to list all products", async () => {
		// Arrange
		const product1 = makeProduct({
			code: "PROD-001",
			name: "Product 1",
			unitPrice: 100,
		});

		const product2 = makeProduct({
			code: "PROD-002",
			name: "Product 2",
			unitPrice: 200,
		});

		await inMemoryProductsRepository.create(product1);
		await inMemoryProductsRepository.create(product2);

		// Act
		const result = await sut.execute();

		// Assert
		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toHaveLength(2);
			expect(result.value[0].code).toEqual("PROD-001");
			expect(result.value[1].code).toEqual("PROD-002");
		}
	});

	it("should return an empty array when no products exist", async () => {
		// Act
		const result = await sut.execute();

		// Assert
		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toHaveLength(0);
			expect(result.value).toEqual([]);
		}
	});
});
