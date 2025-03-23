import { getMd5Hash } from "../../../../core/utils/get-md5-hash";
import {
	UserRepository,
	FindUserByEmailAndPasswordResponse,
} from "../../../../domain/repositories/users-repository";
import { prisma } from "../prisma";

export class PrismaUserRepository implements UserRepository {
	async findUserByEmailAndPassword(
		clientId: string,
		clientSecret: string,
		clientDocument: string
	): Promise<FindUserByEmailAndPasswordResponse | null> {
		const user = await prisma.usuarios.findFirst({
			where: {
				Email: clientId,
				Senha: getMd5Hash(clientSecret),
			},
			select: {
				RestaurantesUsuarios: {
					where: {
						Restaurantes: {
							CNPJ: clientDocument,
							Ativo: true,
						},
					},
					select: {
						Restaurantes: {
							select: {
								Id: true,
							},
						},
					},
				},
			},
		});

		if (!user) {
			return null;
		}

		return {
			RestaurantesUsuarios: [
				{
					Restaurantes: {
						Id: user.RestaurantesUsuarios[0].Restaurantes.Id.toString(),
					},
				},
			],
		};
	}
}
