import { right, type Either } from "../../core/types/either";
import type { LaunchTypeProps } from "../entities/launch-type";
import type { LaunchTypesRepository } from "../repositories/launch-types-repository";

type GetLaunchTypesResponse = Either<null, LaunchTypeProps[] | null>;

export class GetLaunchTypesUseCase {
	constructor(private launchTypesRepository: LaunchTypesRepository) {}

	async execute(): Promise<GetLaunchTypesResponse> {
		const launchTypes = await this.launchTypesRepository.findMany();

		if (!launchTypes) {
			return right(null);
		}

		const launchTypesResponse: LaunchTypeProps[] = launchTypes.map(
			(launchType) => {
				return {
					id: launchType.id,
					description: launchType.description,
					code: launchType.code,
				};
			}
		);

		return right(launchTypesResponse);
	}
}
