import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { adjustTimezone } from "../../core/utils/adjust-timezone";
import { env } from "../../infra/env/env";
import { Encrypter } from "../cryptography/encypter";
import { CollaboratorsRepository } from "../repositories/collaborators-repository";
import { StoreRepository } from "../repositories/stores-repository";
import { UserRepository } from "../repositories/users-repository";

interface SignInUseCaseRequest {
	grantType: string;
	clientId: string;
	clientSecret: string;
	clientDocument: string | undefined;
}

type SignInUseCaseResponse = Either<
	CustomError,
	{
		success: true;
		errors: null;
		data: {
			created: string;
			expirationIn: string;
			accessToken: string;
			grantType: string;
			collaborator?: {
				id: string;
				birthDate: Date | null;
				name: string | null;
				cpf: string | null;
				phone: string | null;
				collaboratorType: {
					id: string;
					code: number;
					description: string;
				};
			};
			store?: {
				id: string;
				cnpj: string | null;
				name: string | null;
				nebulaCode: string | null;
				alias: string | null;
			};
		};
	}
>;

export class SignInUseCase {
	constructor(
		private userRepository: UserRepository,
		private storeRepository: StoreRepository,
		private collaboratorRepository: CollaboratorsRepository,
		private encrypter: Encrypter
	) {}

	async execute({
		grantType,
		clientId,
		clientSecret,
		clientDocument,
	}: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
		const normalizedGrantType = grantType.toLowerCase();

		if (normalizedGrantType === "company") {
			const store = await this.storeRepository.findByNebulaCodeAndAccessKey(
				clientId,
				clientSecret
			);

			if (!store) return left(new CustomError(400, "Credenciais Inválidas"));

			const accessToken = await this.encrypter.encrypt({
				sub: store.id,
			});

			return right({
				success: true,
				errors: null,
				data: {
					created: new Date().toISOString(),
					expirationIn: String(env.ENV_EXPIRES_IN),
					accessToken,
					grantType: normalizedGrantType,
					store: {
						id: store.id,
						cnpj: store.cnpj,
						name: store.name,
						nebulaCode: store.nebulaCode,
						alias: store.alias,
					},
				},
			});
		}

		if (normalizedGrantType === "collaborator") {
			if (!clientDocument)
				return left(new CustomError(400, "Credenciais Inválidas"));

			const collaborator =
				await this.collaboratorRepository.findByUsernameAndPassword(
					clientId,
					clientSecret,
					clientDocument
				);

			if (!collaborator)
				return left(new CustomError(400, "Credenciais Inválidas"));

			const accessToken = await this.encrypter.encrypt({
				sub: collaborator.storeId,
				collaboratorId: collaborator.id,
			});

			return right({
				success: true,
				errors: null,
				data: {
					created: adjustTimezone(new Date()).toISOString(),
					expirationIn: String(env.ENV_EXPIRES_IN),
					accessToken,
					grantType: normalizedGrantType,
					collaborator: {
						id: collaborator.id,
						name: collaborator.name,
						cpf: collaborator.cpf,
						birthDate: collaborator.birthDate,
						phone: collaborator.phone,
						collaboratorType: {
							id: collaborator.collaboratorType.id,
							code: collaborator.collaboratorType.code,
							description: collaborator.collaboratorType.description,
						},
					},
				},
			});
		}

		if (normalizedGrantType === "password") {
			if (!clientDocument)
				return left(new CustomError(400, "Credenciais Inválidas"));

			const user = await this.userRepository.findUserByEmailAndPassword(
				clientId,
				clientSecret,
				clientDocument
			);

			if (!user) return left(new CustomError(400, "Credenciais Inválidas"));

			const accessToken = await this.encrypter.encrypt({
				sub: user.RestaurantesUsuarios[0].Restaurantes.Id,
			});

			return right({
				success: true,
				errors: null,
				data: {
					created: new Date().toISOString(),
					expirationIn: String(env.ENV_EXPIRES_IN),
					accessToken,
					grantType: normalizedGrantType,
				},
			});
		}

		if (normalizedGrantType === "clientcredentials") {
			if (!clientDocument)
				return left(new CustomError(400, "Credenciais Inválidas"));

			const store = await this.storeRepository.findByClientCredentials(
				clientId,
				clientSecret,
				clientDocument
			);

			if (!store) return left(new CustomError(400, "Credenciais Inválidas"));

			const accessToken = await this.encrypter.encrypt({
				sub: store.Id,
			});

			return right({
				success: true,
				errors: null,
				data: {
					created: new Date().toISOString(),
					expirationIn: String(env.ENV_EXPIRES_IN),
					accessToken,
					grantType: normalizedGrantType,
				},
			});
		}

		return left(new CustomError(400, "Credenciais Inválidas"));
	}
}
