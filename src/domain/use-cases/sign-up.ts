import { User, UserProps, UserRole } from "../entities/user";
import { UserRepository } from "../repositories/users-repository";
import { Either, left, right } from "../../core/types/either";
import { CustomError } from "../../core/errors/custom-error";
import { randomUUID } from "crypto";
import { HashGenerator } from "../cryptography/hash-generator";

type SignUpRequest = {
	name: string;
	email: string;
	phone: string;
	document: string;
	password: string;
	role: string;
};

type SignUpUseCaseResponse = Either<CustomError, null>;

export class SignUpUseCase {
	constructor(
		private userRepository: UserRepository,
		private hashGenerator: HashGenerator
	) {}

	async execute(request: SignUpRequest): Promise<SignUpUseCaseResponse> {
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
			...request,
			id: randomUUID(),
			password: hashedPassword,
			createdAt: new Date(),
			updatedAt: null,
			role: UserRole[request.role],
		});

		await this.userRepository.create(user);

		return right(null);
	}
}
