import type { City } from "../../src/domain/entities/city";
import type { CitiesRepository } from "../../src/domain/repositories/cities-repository";

export class InMemoryCitiesRepository implements CitiesRepository {
	public cities: City[] = [];

	async findManyByUfAndCity(
		uf: string,
		cityName: string
	): Promise<City[] | null> {
		return (
			this.cities.filter(
				(c) => c.stateId === uf && c.description.includes(cityName)
			) || null
		);
	}

	async findManyByUfAndIbgeCode(
		uf: string,
		ibgeCode: number
	): Promise<City[] | null> {
		return (
			this.cities.filter((c) => c.stateId === uf && c.ibgeCode === ibgeCode) ||
			null
		);
	}
}
