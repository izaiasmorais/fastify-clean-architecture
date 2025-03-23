import { makeRestaurant } from "../../../test/factories/make-restaurant";
import { InMemoryStoreRepository } from "../../../test/repositories/in-memory-store-repository";
import { GetStoreDetailsUseCase } from "./get-store-details";

let inMemoryStoreRepository: InMemoryStoreRepository;
let sut: GetStoreDetailsUseCase;

describe("Get store details use case", () => {
	beforeEach(() => {
		inMemoryStoreRepository = new InMemoryStoreRepository();
		sut = new GetStoreDetailsUseCase(inMemoryStoreRepository);
	});

	it("should be able to get store details", async () => {
		const restaurant = makeRestaurant({
			Id: "aaaaa",
		});

		inMemoryStoreRepository.restaurants.push(restaurant);

		const result = await sut.execute("aaaaa", undefined, undefined);

		expect(result.isRight()).toBeTruthy();
		
		expect(result.value).toEqual({
			success: true,
			errors: null,
			data: {
				id: expect.any(String),
				name: expect.any(String),
				alias: expect.any(String),
				numberDocument: expect.any(String),
				email: expect.any(String),
				telephone: expect.any(String),
				createdAt: expect.any(String),
				updatedAt: null,
				access: {
					merchantId: expect.any(String),
					merchantPassword: expect.any(String),
				},
				address: {
					id: expect.any(String),
					street: expect.any(String),
					number: expect.any(String),
					city: expect.any(String),
					complement: expect.any(String),
					latitude: expect.any(Number),
					longitude: expect.any(Number),
					neighborhood: expect.any(String),
					state: expect.any(String),
					zipCode: expect.any(String),
				},
			},
		});
	});
});
