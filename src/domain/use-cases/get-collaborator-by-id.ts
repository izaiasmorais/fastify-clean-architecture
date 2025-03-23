import { CustomError } from "../../core/errors/custom-error";
import { right, left, type Either } from "../../core/types/either";
import type { CollaboratorProps } from "../entities/collaborator";
import type { CollaboratorsRepository } from "../repositories/collaborators-repository";

type GetCollaboratorByIdRequest = {
	collaboratorId: string;
	storeId: string;
};

type GetCollaboratorByIdResponse = Either<CustomError, CollaboratorProps>;

export class GetCollaboratorByIdUseCase {
	constructor(private collaboratorsRepository: CollaboratorsRepository) {}

	async execute(
		data: GetCollaboratorByIdRequest
	): Promise<GetCollaboratorByIdResponse> {
		const collaborator = await this.collaboratorsRepository.findById(
			data.storeId,
			data.collaboratorId
		);

		if (!collaborator) {
			return left(new CustomError(404, ["Colaborador não encontrado"]));
		}

		const formattedCollaborator: CollaboratorProps = {
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
		};

		return right(formattedCollaborator);
	}
}
