import { ResourceNotFoundError } from "../../core/errors/errors/resource-not-found-error";
import { Either, left, right } from "../../core/types/either";
import { StoreRepository } from "../repositories/stores-repository";

type RestaurantAddress = {
	id: string;
	street: string | null;
	number: string | null;
	complement: string | null;
	neighborhood: string | null;
	zipCode: string | null;
	city: string | null;
	state: string | null;
	latitude: number | null;
	longitude: number | null;
} | null;

type StoreDetailsResponse = {
	success: true;
	errors: null;
	data: {
		id: string;
		name: string | null;
		alias: string | null;
		numberDocument: string | null;
		email: string | null;
		telephone: string | null;
		createdAt: string | null;
		updatedAt: string | null;
		access: {
			merchantId: string | null;
			merchantPassword: string | null;
		};
		address: RestaurantAddress;
	} | null;
};

type GetStoreDetailsResponse = Either<
	ResourceNotFoundError,
	StoreDetailsResponse
>;

export class GetStoreDetailsUseCase {
	constructor(private storeRepository: StoreRepository) {}

	async execute(
		restaurantId: string,
		firstUpdatedAt: string | undefined,
		lastUpdatedAt: string | undefined
	): Promise<GetStoreDetailsResponse> {
		const store = await this.storeRepository.findById(
			restaurantId,
			firstUpdatedAt,
			lastUpdatedAt
		);

		if (!store && (firstUpdatedAt || lastUpdatedAt)) {
			const response: StoreDetailsResponse = {
				success: true,
				errors: null,
				data: null,
			};

			return right(response);
		}

		if (!store) return left(new ResourceNotFoundError());

		let address: RestaurantAddress = null;

		if (store.Enderecos && store.Enderecos.length > 0) {
			const restaurantAddress = store.Enderecos[store.Enderecos.length - 1];

			address = {
				id: restaurantAddress.Id,
				street: restaurantAddress.Rua,
				number: restaurantAddress.Numero,
				complement: restaurantAddress.Complemento,
				neighborhood: restaurantAddress.Bairro,
				zipCode: restaurantAddress.CEP,
				city: restaurantAddress.Cidade,
				state: restaurantAddress.Estado,
				latitude: restaurantAddress.Latitude,
				longitude: restaurantAddress.Longitude,
			};
		}

		const response: StoreDetailsResponse = {
			success: true,
			errors: null,
			data: {
				id: store.Id,
				name: store.Nome,
				alias: store.Alias,
				numberDocument: store.CNPJ,
				email: store.Email,
				telephone: store.Telefone,
				createdAt: store.CriadoEm.toISOString(),
				updatedAt: store.AlteradoEm?.toISOString() ?? null,
				access: {
					merchantId: store.MerchantId,
					merchantPassword: store.MerchantPwd,
				},
				address: address ?? null,
			},
		};

		return right(response);
	}
}
