import { Collaborator } from "../../src/domain/entities/collaborator";
import { CollaboratorsRepository } from "../../src/domain/repositories/collaborators-repository";
import { FakeHasher } from "../cryptography/fake-hasher";

export class InMemoryCollaboratorsRepository
	implements CollaboratorsRepository
{
	public collaborators: Collaborator[] = [];
	private fakeHasher = new FakeHasher();

	async findById(storeId: string, id: string) {
		return (
			this.collaborators.find(
				(collaborator) =>
					collaborator.storeId === storeId && collaborator.id === id
			) || null
		);
	}

	async findByUsernameAndPassword(
		username: string,
		password: string,
		storeId: string
	): Promise<Collaborator | null> {
		const hashedPassword = await this.fakeHasher.hash(password);

		return (
			this.collaborators.find(
				(collaborator) =>
					collaborator.username === username &&
					collaborator.password === hashedPassword &&
					collaborator.storeId === storeId &&
					collaborator.active === true
			) || null
		);
	}

	async findMany(
		storeId: string,
		pageSize: number,
		currentPage?: number,
		isActive?: boolean,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<Collaborator[] | null> {
		let filteredCollaborators = this.collaborators.filter(
			(collaborator) => collaborator.storeId === storeId
		);

		if (isActive !== undefined) {
			filteredCollaborators = filteredCollaborators.filter(
				(collaborator) => collaborator.active === isActive
			);
		}

		if (firstCreatedAt) {
			filteredCollaborators = filteredCollaborators.filter(
				(collaborator) => collaborator.createdAt >= firstCreatedAt
			);
		}

		if (lastCreatedAt) {
			filteredCollaborators = filteredCollaborators.filter(
				(collaborator) => collaborator.createdAt <= lastCreatedAt
			);
		}

		if (firstUpdatedAt) {
			filteredCollaborators = filteredCollaborators.filter((collaborator) =>
				collaborator.updatedAt
					? collaborator.updatedAt >= firstUpdatedAt
					: false
			);
		}

		if (lastUpdatedAt) {
			filteredCollaborators = filteredCollaborators.filter((collaborator) =>
				collaborator.updatedAt ? collaborator.updatedAt <= lastUpdatedAt : false
			);
		}

		if (!currentPage) {
			currentPage = 1;
		}

		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedCollaborators = filteredCollaborators.slice(
			startIndex,
			endIndex
		);

		return paginatedCollaborators.length > 0 ? paginatedCollaborators : null;
	}
}
