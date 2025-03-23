export interface FindUserByEmailAndPasswordResponse {
	RestaurantesUsuarios: {
		Restaurantes: {
			Id: string;
		};
	}[];
}

export interface UserRepository {
	findUserByEmailAndPassword(
		clientId: string,
		clientSecret: string,
		clientDocument: string
	): Promise<FindUserByEmailAndPasswordResponse | null>;
}
