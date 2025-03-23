import type { City } from "../entities/city";

export interface CitiesRepository {
	findManyByUfAndCity(uf: string, cityName: string): Promise<City[] | null>;
	findManyByUfAndIbgeCode(uf: string, ibgeCode: number): Promise<City[] | null>;
}
