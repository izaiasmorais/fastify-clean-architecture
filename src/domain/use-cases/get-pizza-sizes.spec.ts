import { InMemoryPizzaSizesRepository } from "../../../test/repositories/in-memory-pizza-sizes-respository";
import { makePizzaSize } from "../../../test/factories/make-pizza-size";
import { GetPizzaSizesUseCase } from "./get-pizza-sizes";

let inMemoryPizzaSizesRepository: InMemoryPizzaSizesRepository;
let sut: GetPizzaSizesUseCase;

describe("Get Pizza Sizes Use Case", () => {
	beforeEach(() => {
		inMemoryPizzaSizesRepository = new InMemoryPizzaSizesRepository();
		sut = new GetPizzaSizesUseCase(inMemoryPizzaSizesRepository);
	});

	it("should return pizza sizes by store and product ID", async () => {
		const storeId = "store-1";
		const productId = "product-1";
		const pizzaSize = makePizzaSize({ storeId, productId, active: 1 });

		inMemoryPizzaSizesRepository.pizzaSizes.push(pizzaSize);

		const result = await sut.execute({
			storeId,
			productId,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			pizzaSizes: [
				{
					id: pizzaSize.id,
					description: pizzaSize.description,
					createdAt: pizzaSize.createdAt,
					updatedAt: pizzaSize.updatedAt,
					value: pizzaSize.value,
					isActive: pizzaSize.active,
					pdvPrice: pizzaSize.pdvPrice,
				},
			],
			currentPageNumber: 1,
			totalRecordPerPage: 30,
			totalPage: 1,
			totalRecord: 1,
		});
	});

	it("should return empty response if no pizza sizes match", async () => {
		const result = await sut.execute({
			storeId: "store-2",
			productId: "product-2",
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			pizzaSizes: [],
			currentPageNumber: 1,
			totalRecordPerPage: 0,
			totalPage: 0,
			totalRecord: 0,
		});
	});
});
