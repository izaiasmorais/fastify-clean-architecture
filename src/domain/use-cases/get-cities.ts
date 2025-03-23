import { right, type Either } from "../../core/types/either";
import type { City } from "../entities/city";
import type { CitiesRepository } from "../repositories/cities-repository";
import type { StatesRepository } from "../repositories/states-repository";

type GetCityRequest = {
	uf: string;
	cityName: string;
	ibgeCode?: number;
};

export type FormattedCity = {
	cityId: string;
	cityName: string;
	ibgeCode: number;
	state: {
		id: string;
		ibgeCode: number;
		description: string;
	};
};

type GetCityResponse = Either<
	null,
	{
		cities: FormattedCity[] | null;
	}
>;

export class GetCitiesUseCase {
	constructor(
		private citiesRepository: CitiesRepository,
		private stateRepository: StatesRepository
	) {}

	async execute(data: GetCityRequest): Promise<GetCityResponse> {
		let cities: City[] | null = null;

		if (data.ibgeCode) {
			cities = await this.citiesRepository.findManyByUfAndIbgeCode(
				data.uf,
				data.ibgeCode
			);
		}

		if (!cities && data.cityName) {
			cities = await this.citiesRepository.findManyByUfAndCity(
				data.uf,
				data.cityName
			);
		}

		if (!cities || cities.length === 0) {
			return right({
				cities: [],
			});
		}

		const formattedCities: FormattedCity[] = [];

		for (const city of cities) {
			const state = await this.stateRepository.getById(city.stateId);
			if (state) {
				formattedCities.push({
					cityId: city.id,
					cityName: city.description,
					ibgeCode: city.ibgeCode,
					state: {
						id: state.id,
						ibgeCode: state.ibgeCode,
						description: state.description,
					},
				});
			}
		}

		return right({
			cities: formattedCities.length > 0 ? formattedCities : null,
		});
	}
}
