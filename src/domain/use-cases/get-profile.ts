import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { UserRepository } from "../repositories/users-repository";

interface GetProfileUseCaseRequest {
	userId: string;
}

interface UserProfileDTO {
	id: string;
	name: string;
	email: string;
	role: string;
}

type GetProfileUseCaseResponse = Either<CustomError, UserProfileDTO>;

export class GetProfileUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		userId,
	}: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			return left(new CustomError(404, "Usuário não encontrado"));
		}

		return right({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	}
}
