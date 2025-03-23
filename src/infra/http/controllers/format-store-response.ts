import { GetDetailsResponse, RestaurantAddress } from "../schemas/store";
import { prisma } from "../../../infra/database/prisma/prisma";
import { BadRequestError } from "./_errors/bad-request-error";

export async function formatStoreResponse(
	storeId: string
): Promise<GetDetailsResponse> {
	let index = 0;
	let address: RestaurantAddress | null = null;

	const store = await prisma.restaurantes.findUnique({
		where: {
			Id: storeId,
		},
		select: {
			Id: true,
			Nome: true,
			Alias: true,
			CNPJ: true,
			Email: true,
			Telefone: true,
			CriadoEm: true,
			AlteradoEm: true,
			MerchantId: true,
			MerchantPwd: true,
			Enderecos: {
				where: {
					Ativo: true,
				},
				select: {
					Id: true,
					Rua: true,
					Numero: true,
					Complemento: true,
					Bairro: true,
					CEP: true,
					Cidade: true,
					Estado: true,
					Latitude: true,
					Longitude: true,
				},
			},
		},
	});

	if (!store) {
		throw new BadRequestError("Store not found!");
	}

	if (store.Enderecos && store.Enderecos.length > 0) {
		const restaurantAddress = store.Enderecos[index];

		index = store.Enderecos.length - 1;

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

	const response: GetDetailsResponse = {
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
	};

	return response;
}
