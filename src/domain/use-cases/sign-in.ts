import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { HashComparer } from "../cryptography/hash-comparer";
import { Encrypter } from "../cryptography/encypter";
import { UserRepository } from "../repositories/users-repository";

interface SignInUseCaseRequest {
	email: string;
	password: string;
}

// either = qualquer um
type SignInUseCaseResponse = Either<
	CustomError,
	{
		accessToken: string;
	}
>;

export class SignInUseCase {
	constructor(
		private userRepository: UserRepository,
		private hashComparer: HashComparer,
		private encrypter: Encrypter
	) {}

	async execute({
		email,
		password,
	}: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			return left(new CustomError(400, "Credenciais inválidas"));
		}

		const isPasswordValid = await this.hashComparer.compare(
			password,
			user.password
		);

		if (!isPasswordValid) {
			return left(new CustomError(400, "Credenciais inválidas"));
		}

		const accessToken = await this.encrypter.encrypt({
			sub: user.id,
			role: user.role,
		});

		return right({
			accessToken,
		});
	}
}
