import { CustomError } from "../../core/errors/custom-error";
import { right, Either } from "../../core/types/either";
import type { StatusProps } from "../entities/status";
import type { StatusesRepository } from "../repositories/statuses-repository";

type GetStatusesResponse = Either<CustomError, StatusProps[] | null>;

export class GetStatusesUseCase {
	constructor(private statusRepository: StatusesRepository) {}

	async execute(): Promise<GetStatusesResponse> {
		const statuses = await this.statusRepository.findManyByStoreId();

		if (!statuses) {
			return right(null);
		}

		const statusesResponse: StatusProps[] = statuses.map((status) => ({
			id: status.id,
			name: status.name,
			description: status.description,
			createdAt: status.createdAt,
			updatedAt: status.updatedAt,
			value: status.value,
		}));

		return right(statusesResponse);
	}
}
