import { User, type UserRole } from "../entities/user";
import { UserRepository } from "../repositories/users-repository";
import { Either, left, right } from "../../core/types/either";
import { CustomError } from "../../core/errors/custom-error";
import { randomUUID } from "crypto";
import type { HashGenerator } from "../cryptography/hash-generator";

interface SignUpUseCaseRequest {
	name: string;
	email: string;
	phone: number;
	document: number;
	password: string;
	role: UserRole;
}

type SignUpUseCaseResponse = Either<CustomError, null>;

export class SignUpUseCase {
	constructor(
		private userRepository: UserRepository,
		private hashGenerator: HashGenerator
	) {}

	async execute(request: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
		const userWithSameEmail = await this.userRepository.findByEmail(
			request.email
		);

		if (userWithSameEmail) {
			return left(new CustomError(400, "Email já cadastrado"));
		}

		const userWithSameDocument = await this.userRepository.findByDocument(
			request.document
		);

		if (userWithSameDocument) {
			return left(new CustomError(400, "Documento já cadastrado"));
		}

		const hashedPassword = await this.hashGenerator.hash(request.password);

		const user = User.create({
			id: randomUUID(),
			...request,
			password: hashedPassword,
		});

		await this.userRepository.create(user);

		return right(null);
	}
}
