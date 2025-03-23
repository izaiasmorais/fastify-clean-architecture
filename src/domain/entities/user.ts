export interface User {
	Email: string;
	Senha: string;
	RestaurantesUsuarios: {
		Restaurantes: {
			Id: number;
			CNPJ: string;
			Ativo: boolean;
		};
	}[];
}
