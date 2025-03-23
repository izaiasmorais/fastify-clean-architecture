import { PrismaPizzaSizeMapper } from "../../src/infra/database/prisma/mappers/prisma-pizza-size-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import {
	PizzaSize,
	PizzaSizeProps,
} from "../../src/domain/entities/pizza-size";

export function makePizzaSize(override: Partial<PizzaSizeProps> = {}) {
	const pizzaSize = PizzaSize.create({
		id: uuidv4(),
		description: null,
		createdAt: new Date(),
		updatedAt: null,
		productId: uuidv4(),
		storeId: uuidv4(),
		value: 0,
		active: 1,
		pdvPrice: 0,
		...override,
	});

	return pizzaSize;
}

export class PizzaSizeFactory {
	async makePrismaPizzaSize(
		data: Partial<PizzaSizeProps> = {}
	): Promise<PizzaSize> {
		const pizzaSize = makePizzaSize(data);

		await prisma.tamanhoPizzas.create({
			data: PrismaPizzaSizeMapper.toPrisma(pizzaSize),
		});

		return pizzaSize;
	}
}
