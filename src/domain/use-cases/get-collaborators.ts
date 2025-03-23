import { right, type Either } from "../../core/types/either";
import { env } from "../../infra/env/env";
import type { CollaboratorProps } from "../entities/collaborator";
import type { CollaboratorsRepository } from "../repositories/collaborators-repository";

type GetCollaboratorsRequest = {
	storeId: string;
	currentPage: number;

	isActive?: boolean;
	firstCreatedAt?: Date;
	lastCreatedAt?: Date;
	firstUpdatedAt?: Date;
	lastUpdatedAt?: Date;
};

type GetCollaboratorsResponse = Either<
	null,
	{
		collaborators: CollaboratorProps[];
		currentPageNumber: number;
		totalRecordPerPage: number;
		totalPage: number;
		totalRecord: number;
	}
>;

export class GetCollaboratorsUseCase {
	constructor(private collaboratorsRepository: CollaboratorsRepository) {}

	async execute(
		data: GetCollaboratorsRequest
	): Promise<GetCollaboratorsResponse> {
		const pageSize = env.PAGE_SIZE;
		const allCollaborators = await this.collaboratorsRepository.findMany(
			data.storeId,
			pageSize
		);

		if (!allCollaborators) {
			return right({
				collaborators: [],
				currentPageNumber: 1,
				totalRecordPerPage: 0,
				totalPage: 0,
				totalRecord: 0,
			});
		}

		const filteredCollaborators = await this.collaboratorsRepository.findMany(
			data.storeId,
			pageSize,
			data.currentPage,
			data.isActive,
			data.firstCreatedAt,
			data.lastCreatedAt,
			data.firstUpdatedAt,
			data.lastUpdatedAt
		);

		if (!filteredCollaborators) {
			return right({
				collaborators: [],
				currentPageNumber: 1,
				totalRecordPerPage: 0,
				totalPage: 0,
				totalRecord: 0,
			});
		}

		const currentPageNumber = data.currentPage;
		const totalPage = Math.ceil(allCollaborators.length / pageSize);
		const totalRecordPerPage = pageSize;
		const totalRecord = allCollaborators.length;

		const collaborators: CollaboratorProps[] = filteredCollaborators.map(
			(collaborator) => ({
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
			})
		);

		return right({
			collaborators,
			currentPageNumber,
			totalRecordPerPage,
			totalPage,
			totalRecord,
		});
	}
}
