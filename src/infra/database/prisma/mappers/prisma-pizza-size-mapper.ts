import { PizzaSize } from "../../../../domain/entities/pizza-size";
import { TamanhoPizzas as PrismaPizzaSize, Prisma } from "@prisma/client";

export class PrismaPizzaSizeMapper {
	static toDomain(raw: PrismaPizzaSize): PizzaSize {
		return PizzaSize.create({
			id: raw.Id,
			description: raw.Descricao,
			createdAt: raw.CriadoEm,
			updatedAt: raw.AlteradoEm,
			productId: raw.ProdutoId,
			storeId: raw.RestauranteId,
			value: raw.Valor.toNumber(),
			active: raw.Ativo ?? null,
			pdvPrice: raw.PrecoPDV.toNumber(),
		});
	}

	static toPrisma(
		pizzaSize: PizzaSize
	): Prisma.TamanhoPizzasUncheckedCreateInput {
		return {
			Id: pizzaSize.id,
			Descricao: pizzaSize.description,
			CriadoEm: pizzaSize.createdAt,
			AlteradoEm: pizzaSize.updatedAt,
			ProdutoId: pizzaSize.productId,
			RestauranteId: pizzaSize.storeId,
			Valor: pizzaSize.value,
			Ativo: pizzaSize.active === null ? 1 : pizzaSize.active ? 1 : 0,
			PrecoPDV: pizzaSize.pdvPrice ?? 0,
		};
	}
}
