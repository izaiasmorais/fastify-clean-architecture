import { right, type Either } from "../../core/types/either";
import { env } from "../../infra/env/env";
import type { PizzaSizesRepository } from "../repositories/pizza-sizes-repository";

type GetPizzaSizesRequest = {
	storeId: string;
	productId: string;
	isActive?: number;
	firstCreatedAt?: Date;
	lastCreatedAt?: Date;
	firstUpdatedAt?: Date;
	lastUpdatedAt?: Date;
};

type FormattedPizzaSizes = {
	id: string;
	description: string | null;
	createdAt: Date;
	updatedAt: Date | null;
	value: number;
	pdvPrice: number;
	isActive: number | null;
};

type GetPizzaSizesResponse = Either<
	null,
	{
		pizzaSizes: FormattedPizzaSizes[];
		currentPageNumber: number;
		totalRecordPerPage: number;
		totalPage: number;
		totalRecord: number;
	}
>;

export class GetPizzaSizesUseCase {
	constructor(private pizzaSizesRepository: PizzaSizesRepository) {}

	async execute(data: GetPizzaSizesRequest): Promise<GetPizzaSizesResponse> {
		const allPizzaSizes =
			await this.pizzaSizesRepository.findManyByStoreAndProduct(
				data.storeId,
				data.productId,
				data.isActive,
				data.firstCreatedAt,
				data.lastCreatedAt,
				data.firstUpdatedAt,
				data.lastUpdatedAt
			);

		if (!allPizzaSizes || allPizzaSizes.length === 0) {
			return right({
				pizzaSizes: [],
				currentPageNumber: 1,
				totalRecordPerPage: 0,
				totalPage: 0,
				totalRecord: 0,
			});
		}

		const pageSize = env.PAGE_SIZE
		const currentPageNumber = 1;
		const totalRecord = allPizzaSizes.length;
		const totalPage = Math.ceil(totalRecord / pageSize);
		const totalRecordPerPage = pageSize;

		const formattedPizzaSizes: FormattedPizzaSizes[] = allPizzaSizes.map(
			(pizzaSize) => ({
				id: pizzaSize.id,
				description: pizzaSize.description,
				createdAt: pizzaSize.createdAt,
				updatedAt: pizzaSize.updatedAt,
				value: pizzaSize.value,
				pdvPrice: pizzaSize.pdvPrice,
				isActive: pizzaSize.active,
			})
		);

		return right({
			pizzaSizes: formattedPizzaSizes,
			currentPageNumber,
			totalRecordPerPage,
			totalPage,
			totalRecord,
		});
	}
}
