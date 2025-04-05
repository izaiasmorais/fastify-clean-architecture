import { FastifyReply } from "fastify";
import { PrismaUserRepository } from "../repositories/prisma-user-repository";
import { SignInUseCase } from "../../../../domain/use-cases/sign-in";
import { JwtEncrypter } from "../../../adapters/jwt-encrypter.adapter";
import { BcryptAdapter } from "../../../adapters/bcrypt-adapter";

export function makeSignInUseCase(reply: FastifyReply) {
	const userRepository = new PrismaUserRepository();
	const encrypter = new JwtEncrypter(reply);
	const hashComparer = new BcryptAdapter(10);

	const useCase = new SignInUseCase(userRepository, hashComparer, encrypter);

	return useCase;
}
