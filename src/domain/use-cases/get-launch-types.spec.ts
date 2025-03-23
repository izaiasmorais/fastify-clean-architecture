import { InMemoryLaunchTypesRepository } from "../../../test/repositories/in-memory-launch-types-repository";
import { GetLaunchTypesUseCase } from "./get-launch-types";
import { makeLaunchType } from "../../../test/factories/make-launch-type";

let inMemoryLaunchTypesRepository: InMemoryLaunchTypesRepository;
let sut: GetLaunchTypesUseCase;

describe("Get Launch Types Use Case", () => {
	beforeEach(() => {
		inMemoryLaunchTypesRepository = new InMemoryLaunchTypesRepository();
		sut = new GetLaunchTypesUseCase(inMemoryLaunchTypesRepository);
	});

	it("should return all launch types", async () => {
		const launchType1 = makeLaunchType({
			id: "type-1",
			code: 1,
			description: "Type 1",
		});
		const launchType2 = makeLaunchType({
			id: "type-2",
			code: 2,
			description: "Type 2",
		});

		inMemoryLaunchTypesRepository.launchTypes.push(launchType1, launchType2);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual([
			{ id: "type-1", code: 1, description: "Type 1" },
			{ id: "type-2", code: 2, description: "Type 2" },
		]);
	});

	it("should return null if no launch types exist", async () => {
		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual([]);
	});
});
