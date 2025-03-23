import { makeCity } from "../../../test/factories/make-city";
import { makeState } from "../../../test/factories/make-state";
import { InMemoryCitiesRepository } from "../../../test/repositories/in-memory-citites-repository";
import { InMemoryStatesRepository } from "../../../test/repositories/in-memory-states-repository";
import { GetCitiesUseCase } from "./get-cities";

let inMemoryCitiesRepository: InMemoryCitiesRepository;
let inMemoryStatesRepository: InMemoryStatesRepository;
let sut: GetCitiesUseCase;

describe("Get Cities Use Case", () => {
	beforeEach(() => {
		inMemoryCitiesRepository = new InMemoryCitiesRepository();
		inMemoryStatesRepository = new InMemoryStatesRepository();

		sut = new GetCitiesUseCase(
			inMemoryCitiesRepository,
			inMemoryStatesRepository
		);
	});

	it("should return cities by UF and IBGE code", async () => {
		const city = makeCity({
			id: "833f3229-f7c4-45cd-90b7-27c63024098c",
			stateId: "SP",
			ibgeCode: 12345,
			description: "São Paulo",
		});

		const state = makeState({
			id: "SP",
			description: "São Paulo",
			ibgeCode: 12345,
		});

		inMemoryCitiesRepository.cities.push(city);
		inMemoryStatesRepository.states.push(state);

		const result = await sut.execute({
			cityName: city.description,
			ibgeCode: city.ibgeCode,
			uf: city.stateId,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			cities: [
				{
					cityName: city.description,
					cityId: city.id,
					ibgeCode: city.ibgeCode,
					state: {
						id: state.id,
						ibgeCode: state.ibgeCode,
						description: state.description,
					},
				},
			],
		});
	});

	it("should return cities by UF and city name", async () => {
		const city = makeCity({
			id: "833f3229-f7c4-45cd-90b7-27c63024098c",
			description: "Rio de Janeiro",
			stateId: "RJ",
			ibgeCode: 67890,
		});

		const state = makeState({
			description: "Rio de Janeiro",
			id: "RJ",
			ibgeCode: 67890,
		});

		inMemoryStatesRepository.states.push(state);
		inMemoryCitiesRepository.cities.push(city);

		const result = await sut.execute({
			uf: "RJ",
			cityName: "Rio",
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			cities: [
				{
					cityId: city.id,
					cityName: city.description,
					ibgeCode: city.ibgeCode,
					state: {
						id: state.id,
						ibgeCode: state.ibgeCode,
						description: state.description,
					},
				},
			],
		});
	});

	it("should return empty array if no cities match", async () => {
		const result = await sut.execute({
			uf: "MG",
			cityName: "Belo Horizonte",
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			cities: [],
		});
	});
});
