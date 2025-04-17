import { PrismaUsersRepository } from "../repositories/prisma-users-repository";
import { GetProfileUseCase } from "../../../../domain/use-cases/get-profile";

export function makeGetProfileUseCase() {
	const userRepository = new PrismaUsersRepository();

	const useCase = new GetProfileUseCase(userRepository);

	return useCase;
}
