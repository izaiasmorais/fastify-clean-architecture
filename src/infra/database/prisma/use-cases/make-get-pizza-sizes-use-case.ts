import { GetPizzaSizesUseCase } from "../../../../domain/use-cases/get-pizza-sizes";
import { PrismaPizzaSizesRepository } from "../repositories/prisma-pizza-sizes-repository";

export function makeGetPizzaSizesUseCase() {
	const pizzaSizesRepository = new PrismaPizzaSizesRepository();
	const useCase = new GetPizzaSizesUseCase(pizzaSizesRepository);

	return useCase;
}
