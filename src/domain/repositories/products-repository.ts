import type { ProductProps } from "../entities/product";

export interface ProductResponse extends ProductProps {
	groups: {
		id: string;
		groupId: string;
		isActive: boolean;
	}[];
}

export interface ProductsRepository {
	findMany(
		storeId: string,
		pageSize: number,
		currentPage?: number,
		isActive?: boolean,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<ProductResponse[] | null>;
}
