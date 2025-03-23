import type { City } from "../../../../domain/entities/city";
import type { CitiesRepository } from "../../../../domain/repositories/cities-repository";
import { PrismaCityMapper } from "../mappers/prisma-city-mapper";
import { prisma } from "../prisma";

export class PrismaCitiesRepository implements CitiesRepository {
	async findManyByUfAndCity(
		uf: string,
		cityName: string
	): Promise<City[] | null> {
		const cities = await prisma.municipio.findMany({
			where: {
				EstadoId: uf,
				Descricao: {
					contains: cityName,
				},
			},
		});

		if (!cities) {
			return null;
		}

		return cities.map(PrismaCityMapper.toDomain);
	}

	async findManyByUfAndIbgeCode(
		uf: string,
		ibgeCode: number
	): Promise<City[] | null> {
		const cities = await prisma.municipio.findMany({
			where: {
				EstadoId: uf,
				CodigoIBGE: ibgeCode,
			},
		});

		if (!cities) {
			return null;
		}

		return cities.map(PrismaCityMapper.toDomain);
	}
}
