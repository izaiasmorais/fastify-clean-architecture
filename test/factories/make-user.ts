import { User } from "../../src/domain/entities/user";

export function makeUser(override: Partial<User> = {}) {
	const user: User = {
		Email: "johndoe@example.com",
		Senha: "123456",
		RestaurantesUsuarios: [
			{
				Restaurantes: {
					Id: 1,
					CNPJ: "12345678901234",
					Ativo: true,
				},
			},
		],
		...override,
	};

	return user;
}
