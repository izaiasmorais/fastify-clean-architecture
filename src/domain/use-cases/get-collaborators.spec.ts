import { makeCollaborator } from "../../../test/factories/make-collaborator";
import { InMemoryCollaboratorsRepository } from "../../../test/repositories/in-memory-collaborators-repository";
import { GetCollaboratorsUseCase } from "./get-collaborators";

let inMemoryCollaboratorsRepository: InMemoryCollaboratorsRepository;
let sut: GetCollaboratorsUseCase;

describe("Get Collaborators Use Case", () => {
	beforeEach(() => {
		inMemoryCollaboratorsRepository = new InMemoryCollaboratorsRepository();
		sut = new GetCollaboratorsUseCase(inMemoryCollaboratorsRepository);
	});

	it("should return collaborators by store ID", async () => {
		const storeId = "536cd15d-2f36-4ad6-a63f-20ea98fcd31c";
		const collaborator = makeCollaborator({ storeId, active: true });

		inMemoryCollaboratorsRepository.collaborators.push(collaborator);

		const result = await sut.execute({
			storeId,
			currentPage: 1,
			isActive: true,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			collaborators: [
				{
					id: collaborator.id,
					createdAt: collaborator.createdAt,
					updatedAt: collaborator.updatedAt,
					collaboratorTypeId: collaborator.collaboratorTypeId,
					storeId: collaborator.storeId,
					username: collaborator.username,
					password: collaborator.password,
					name: collaborator.name,
					cpf: collaborator.cpf,
					birthDate: collaborator.birthDate,
					phone: collaborator.phone,
					active: collaborator.active,
					collaboratorType: collaborator.collaboratorType,
				},
			],
			currentPageNumber: 1,
			totalRecordPerPage: 30,
			totalPage: 1,
			totalRecord: 1,
		});
	});

	it("should return empty response if no collaborators match", async () => {
		const result = await sut.execute({
			storeId: "8a4f7cc6-980d-424f-a66a-7096fe777840",
			currentPage: 1,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			collaborators: [],
			currentPageNumber: 1,
			totalRecordPerPage: 0,
			totalPage: 0,
			totalRecord: 0,
		});
	});
});
