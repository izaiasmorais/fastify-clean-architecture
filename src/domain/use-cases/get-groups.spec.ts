import { InMemoryGroupsRepository } from "../../../test/repositories/in-memory-groups-repository";
import { GetGroupsUseCase } from "./get-groups";
import { makeGroup } from "../../../test/factories/make-group";

let inMemoryGroupsRepository: InMemoryGroupsRepository;
let sut: GetGroupsUseCase;

describe("Get Groups Use Case", () => {
	beforeEach(() => {
		inMemoryGroupsRepository = new InMemoryGroupsRepository();
		sut = new GetGroupsUseCase(inMemoryGroupsRepository);
	});

	it("should return groups by store ID", async () => {
		const storeId = "536cd15d-2f36-4ad6-a63f-20ea98fcd31c";
		const group = makeGroup({ storeId, status: true });

		inMemoryGroupsRepository.groups.push(group);

		const result = await sut.execute({
			storeId,
			currentPage: 1,
			isActive: true,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			groups: [
				{
					id: group.id,
					name: group.name,
					isPizza: group.isPizza,
					status: group.status,
					createdAt: group.createdAt,
					updatedAt: group.updatedAt,
					pdvCode: group.pdvCode,
					storeId: group.storeId,
				},
			],
			currentPageNumber: 1,
			totalRecordPerPage: 30,
			totalPage: 1,
			totalRecord: 1,
		});
	});

	it("should return empty response if no groups match", async () => {
		const result = await sut.execute({
			storeId: "8a4f7cc6-980d-424f-a66a-7096fe777840",
			currentPage: 1,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			groups: [],
			currentPageNumber: 1,
			totalRecordPerPage: 0,
			totalPage: 0,
			totalRecord: 0,
		});
	});
});
