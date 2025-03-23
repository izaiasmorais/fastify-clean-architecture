import { PrismaCityMapper } from "../../src/infra/database/prisma/mappers/prisma-city-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import { City, CityProps } from "../../src/domain/entities/city";

export function makeCity(override: Partial<CityProps> = {}) {
	const city = City.create({
		id: uuidv4(),
		description: "São Paulo",
		stateId: "SP",
		ibgeCode: 3550308,
		...override,
	});

	return city;
}

export class CityFactory {
	async makePrismaCity(data: Partial<CityProps> = {}): Promise<City> {
		const city = makeCity(data);

		await prisma.municipio.create({
			data: PrismaCityMapper.toPrisma(city),
		});

		return city;
	}
}
