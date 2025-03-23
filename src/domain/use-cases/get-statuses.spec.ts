import { makeStatus } from "../../../test/factories/make-status";
import { InMemoryStatusesRepository } from "../../../test/repositories/in-memory-statuses-repository";
import { GetStatusesUseCase } from "./get-statuses";

let inMemoryStatusesRepository: InMemoryStatusesRepository;
let sut: GetStatusesUseCase;

describe("Get Statuses Use Case", () => {
	beforeEach(() => {
		inMemoryStatusesRepository = new InMemoryStatusesRepository();
		sut = new GetStatusesUseCase(inMemoryStatusesRepository);
	});

	it("should return statuses when they exist", async () => {
		const status = makeStatus({
			id: "7335930e-27f7-11ee-8418-ae6f5a5dd554",
			description: "CRIADO",
			name: "CREATED",
			value: 0,
			createdAt: new Date("2023-07-21 18:50:23.000000"),
			updatedAt: null,
		});

		inMemoryStatusesRepository.statuses.push(status);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual([
			{
				id: status.id,
				description: status.description,
				name: status.name,
				value: status.value,
				createdAt: status.createdAt,
				updatedAt: status.updatedAt,
			},
		]);
	});
});
