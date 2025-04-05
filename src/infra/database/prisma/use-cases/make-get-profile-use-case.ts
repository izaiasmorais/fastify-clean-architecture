import { PrismaUserRepository } from "../repositories/prisma-user-repository";
import { GetProfileUseCase } from "../../../../domain/use-cases/get-profile";

export function makeGetProfileUseCase() {
	const userRepository = new PrismaUserRepository();

	const useCase = new GetProfileUseCase(userRepository);

	return useCase;
}
