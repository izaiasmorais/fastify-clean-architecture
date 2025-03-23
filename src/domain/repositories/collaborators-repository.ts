import type { Collaborator, CollaboratorProps } from "../entities/collaborator";

export interface CollaboratorsRepository {
	findMany(
		storeId: string,
		pageSize: number,
		currentPage?: number,
		isActive?: boolean,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<CollaboratorProps[] | null>;
	findById(storeId: string, id: string): Promise<Collaborator | null>;
	findByUsernameAndPassword(
		clientId: string,
		clientSecret: string,
		clientDocument: string
	): Promise<Collaborator | null>;
}
