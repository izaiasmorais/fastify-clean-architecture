import { PrismaUserRepository } from "../repositories/prisma-user-repository";
import { PrismaStoreRepository } from "../repositories/prisma-store-repository";
import { SignInUseCase } from "../../../../domain/use-cases/sign-in";
import { JwtEncrypter } from "../../../adapters/jwt-encrypter.adapter";
import { FastifyReply } from "fastify";
import { PrismaCollaboratorsRepository } from "../repositories/prisma-collaborators-repository";

export function makeSignInUseCase(reply: FastifyReply) {
	const userRespository = new PrismaUserRepository();
	const storeRepository = new PrismaStoreRepository();
	const collaboratorRepository = new PrismaCollaboratorsRepository();
	const encrypter = new JwtEncrypter(reply);
	const useCase = new SignInUseCase(
		userRespository,
		storeRepository,
		collaboratorRepository,
		encrypter
	);

	return useCase;
}
