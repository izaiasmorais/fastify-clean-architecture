import {
	UserRepository,
	FindUserByEmailAndPasswordResponse,
} from "../../src/domain/repositories/users-repository";
import { FakeHasher } from "../../test/cryptography/fake-hasher";
import { User } from "../../src/domain/entities/user";

export class InMemoryUserRepository implements UserRepository {
	public users: User[] = [];
	private fakeHasher = new FakeHasher();

	async findUserByEmailAndPassword(
		clientId: string,
		clientSecret: string,
		clientDocument: string
	): Promise<FindUserByEmailAndPasswordResponse | null> {
		const hashedPassword = await this.fakeHasher.hash(clientSecret);

		const user = this.users.find(
			(usuario) =>
				usuario.Email === clientId && usuario.Senha === hashedPassword
		);

		if (!user) {
			return null;
		}

		const restaurant = user.RestaurantesUsuarios.find(
			(restauranteUsuario) =>
				restauranteUsuario.Restaurantes.CNPJ === clientDocument &&
				restauranteUsuario.Restaurantes.Ativo
		);

		if (!restaurant) {
			return null;
		}

		return {
			RestaurantesUsuarios: [
				{
					Restaurantes: {
						Id: restaurant.Restaurantes.Id.toString(),
					},
				},
			],
		};
	}
}
