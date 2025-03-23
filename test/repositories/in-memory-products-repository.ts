import type { ProductProps } from "../../src/domain/entities/product";
import type {
	ProductResponse,
	ProductsRepository,
} from "../../src/domain/repositories/products-repository";

export class InMemoryProductsRepository implements ProductsRepository {
	public products: ProductProps[] = [];
	public groups: { id: string; groupId: string; isActive: boolean }[] = [];

	async findMany(
		storeId: string,
		pageSize: number,
		currentPage?: number,
		isActive?: boolean,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<ProductResponse[] | null> {
		let filteredProducts = this.products.filter(
			(product) => product.storeId === storeId
		);

		if (isActive !== undefined) {
			filteredProducts = filteredProducts.filter(
				(product) => product.status === isActive
			);
		}

		if (firstCreatedAt) {
			filteredProducts = filteredProducts.filter(
				(product) => product.createdAt >= firstCreatedAt
			);
		}

		if (lastCreatedAt) {
			filteredProducts = filteredProducts.filter(
				(product) => product.createdAt <= lastCreatedAt
			);
		}

		if (firstUpdatedAt) {
			filteredProducts = filteredProducts.filter((product) =>
				product.updatedAt ? product.updatedAt >= firstUpdatedAt : false
			);
		}

		if (lastUpdatedAt) {
			filteredProducts = filteredProducts.filter((product) =>
				product.updatedAt ? product.updatedAt <= lastUpdatedAt : false
			);
		}

		if (!currentPage) {
			currentPage = 1;
		}

		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

		const productResponses: ProductResponse[] = paginatedProducts.map(
			(product) => ({
				...product,
				groups: this.groups.filter((group) => group.groupId === product.id),
			})
		);

		return productResponses.length > 0 ? productResponses : null;
	}
}
