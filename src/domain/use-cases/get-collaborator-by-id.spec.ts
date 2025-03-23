import { InMemoryCollaboratorsRepository } from "../../../test/repositories/in-memory-collaborators-repository";
import { GetCollaboratorByIdUseCase } from "./get-collaborator-by-id";
import { makeCollaborator } from "../../../test/factories/make-collaborator";
import { CustomError } from "../../core/errors/custom-error";
import { generateUUID } from "../../core/utils/generate-uuid";

let inMemoryCollaboratorsRepository: InMemoryCollaboratorsRepository;
let sut: GetCollaboratorByIdUseCase;

describe("Get Collaborator By Id Use Case", () => {
	beforeEach(() => {
		inMemoryCollaboratorsRepository = new InMemoryCollaboratorsRepository();
		sut = new GetCollaboratorByIdUseCase(inMemoryCollaboratorsRepository);
	});

	it("should be able to get a collaborator by id", async () => {
		const collaboratorId = generateUUID();
		const storeId = generateUUID();
		const collaboratorTypeId = generateUUID();

		const collaborator = makeCollaborator({
			id: collaboratorId,
			storeId,
			collaboratorTypeId,
			username: "john_doe",
			name: "John Doe",
			cpf: "123.456.789-00",
		});

		inMemoryCollaboratorsRepository.collaborators.push(collaborator);

		const result = await sut.execute({
			collaboratorId,
			storeId,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			id: collaboratorId,
			storeId,
			collaboratorTypeId,
			username: "john_doe",
			password: collaborator.password,
			name: "John Doe",
			cpf: "123.456.789-00",
			birthDate: collaborator.birthDate,
			phone: collaborator.phone,
			active: collaborator.active,
			createdAt: collaborator.createdAt,
			updatedAt: collaborator.updatedAt,
			collaboratorType: collaborator.collaboratorType,
		});
	});

	it("should return an error when collaborator is not found", async () => {
		const result = await sut.execute({
			collaboratorId: generateUUID(),
			storeId: generateUUID(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(
			new CustomError(404, ["Colaborador não encontrado"])
		);
	});
});
