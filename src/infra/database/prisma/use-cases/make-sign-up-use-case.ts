import { PrismaUsersRepository } from "../repositories/prisma-users-repository";
import { SignUpUseCase } from "../../../../domain/use-cases/sign-up";
import { BcryptAdapter } from "../../../adapters/bcrypt-adapter";

export function makeSignUpUseCase() {
	const userRepository = new PrismaUsersRepository();
	const hashGenerator = new BcryptAdapter(10);

	const useCase = new SignUpUseCase(userRepository, hashGenerator);

	return useCase;
}
