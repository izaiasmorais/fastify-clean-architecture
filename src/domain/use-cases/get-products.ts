import { right, type Either } from "../../core/types/either";
import { env } from "../../infra/env/env";
import type {
	ProductResponse,
	ProductsRepository,
} from "../repositories/products-repository";

type GetProductsRequest = {
	storeId: string;
	currentPage: number;

	isActive?: boolean;
	firstCreatedAt?: Date;
	lastCreatedAt?: Date;
	firstUpdatedAt?: Date;
	lastUpdatedAt?: Date;
};

type GetProductsResponse = Either<
	null,
	{
		products: ProductResponse[];
		currentPageNumber: number;
		totalRecordPerPage: number;
		totalPage: number;
		totalRecord: number;
	}
>;

export class GetProductsUseCase {
	constructor(private productsRepository: ProductsRepository) {}

	async execute(data: GetProductsRequest): Promise<GetProductsResponse> {
		const pageSize = env.PAGE_SIZE;
		const allProducts = await this.productsRepository.findMany(data.storeId, pageSize);

		if (!allProducts) {
			return right({
				products: [],
				currentPageNumber: 1,
				totalRecordPerPage: 0,
				totalPage: 0,
				totalRecord: 0,
			});
		}

		const filteredProducts = await this.productsRepository.findMany(
			data.storeId,
			pageSize,
			data.currentPage,
			data.isActive,
			data.firstCreatedAt,
			data.lastCreatedAt,
			data.firstUpdatedAt,
			data.lastUpdatedAt
		);

		if (!filteredProducts) {
			return right({
				products: [],
				currentPageNumber: 1,
				totalRecordPerPage: 0,
				totalPage: 0,
				totalRecord: 0,
			});
		}

		const currentPageNumber = data.currentPage;
		const totalPage = Math.ceil(allProducts.length / pageSize);
		const totalRecordPerPage = pageSize;
		const totalRecord = allProducts.length;

		return right({
			products: filteredProducts,
			currentPageNumber,
			totalRecordPerPage,
			totalPage,
			totalRecord,
		});
	}
}
