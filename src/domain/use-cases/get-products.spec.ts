import { makeProduct } from "../../../test/factories/make-product";
import { InMemoryProductsRepository } from "../../../test/repositories/in-memory-products-repository";
import { GetProductsUseCase } from "./get-products";

let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: GetProductsUseCase;

describe("Get Products Use Case", () => {
	beforeEach(() => {
		inMemoryProductsRepository = new InMemoryProductsRepository();
		sut = new GetProductsUseCase(inMemoryProductsRepository);
	});

	it("should return products by store ID", async () => {
		const storeId = "536cd15d-2f36-4ad6-a63f-20ea98fcd31c";
		const product = makeProduct({ storeId, status: true });

		inMemoryProductsRepository.products.push(product);

		const result = await sut.execute({
			storeId,
			currentPage: 1,
			isActive: true,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			products: [
				{
					props: {
						id: product.id,
						name: product.name,
						description: product.description,
						type: product.type,
						image: product.image,
						storeId: product.storeId,
						price: product.price,
						status: product.status,
						createdAt: product.createdAt,
						updatedAt: product.updatedAt,
						synchronizedAt: product.synchronizedAt,
						isBetiquim: product.isBetiquim,
						hungerSize: product.hungerSize,
						externalCode: product.externalCode,
						viewPriceOnline: product.viewPriceOnline,
						pdvPrice: product.pdvPrice,
					},
					groups: [],
				},
			],
			currentPageNumber: 1,
			totalRecordPerPage: 30,
			totalPage: 1,
			totalRecord: 1,
		});
	});

	it("should return empty response if no products match", async () => {
		const result = await sut.execute({
			storeId: "8a4f7cc6-980d-424f-a66a-7096fe777840",
			currentPage: 1,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			products: [],
			currentPageNumber: 1,
			totalRecordPerPage: 0,
			totalPage: 0,
			totalRecord: 0,
		});
	});
});
