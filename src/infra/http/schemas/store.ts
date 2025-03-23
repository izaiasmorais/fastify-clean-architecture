import { z } from "zod";

const storeSchema = z.object({
	Id: z.string(),
	Nome: z.string().nullable(),
	Telefone: z.string().nullable(),
	CriadoEm: z.date(),
	CNPJ: z.string().nullable(),
	MerchantId: z.string().nullable(),
	MerchantPwd: z.string().nullable(),
	Email: z.string().nullable(),
	Alias: z.string().nullable(),
	Enderecos: z
		.array(
			z.object({
				Id: z.string(),
				Rua: z.string().nullable(),
				Numero: z.string().nullable(),
				Complemento: z.string().nullable(),
				Bairro: z.string().nullable(),
				CEP: z.string().nullable(),
				Cidade: z.string().nullable(),
				Estado: z.string().nullable(),
				Latitude: z.number().nullable(),
				Longitude: z.number().nullable(),
			})
		)
		.nullable(),
});

export type Store = z.infer<typeof storeSchema>;

const restaiurantAddressSchema = z
	.object({
		id: z.string(),
		street: z.string().nullable(),
		number: z.string().nullable(),
		complement: z.string().nullable(),
		neighborhood: z.string().nullable(),
		zipCode: z.string().nullable(),
		city: z.string().nullable(),
		state: z.string().nullable(),
		latitude: z.number().nullable(),
		longitude: z.number().nullable(),
	})
	.nullable();

type RestaurantAddress = z.infer<typeof restaiurantAddressSchema>;

const getDetailsResponseSchema = z
	.object({
		id: z.string(),
		name: z.string().nullable(),
		alias: z.string().nullable(),
		numberDocument: z.string().nullable(),
		email: z.string().nullable(),
		telephone: z.string().nullable(),
		createdAt: z.string().nullable(),
		updatedAt: z.string().nullable(),
		access: z.object({
			merchantId: z.string().nullable(),
			merchantPassword: z.string().nullable(),
		}),
		address: restaiurantAddressSchema,
	})
	.nullable();

type GetDetailsResponse = z.infer<typeof getDetailsResponseSchema>;

const registerStoreResponseSchema = z.object({
	success: z.boolean(),
	errors: z.nullable(z.array(z.string())),
	data: z.object({
		storeId: z.string(),
		merchantId: z.string(),
		marcheandPassword: z.string(),
	}),
});

type RegisterStoreResponse = z.infer<typeof registerStoreResponseSchema>;

const registerStoreRequestBodySchema = z.object({
	name: z.string(),
	alias: z.string(),
	phone: z.string().nullable(),
	cnpj: z.string(),
	email: z.string().email().nullable(),
	address: z.object({
		zipCode: z.string(),
		state: z.string(),
		city: z.string(),
		street: z.string(),
		number: z.string(),
		complement: z.string().nullable(),
		neighborhood: z.string(),
		latitude: z.number().nullable(),
		longitude: z.number().nullable(),
	}),
});

type RegisterStoreRequestBody = z.infer<typeof registerStoreRequestBodySchema>;

const registerStoreParamsSchema = z.object({
	integratorId: z.string(),
});

type RegisterStoreParams = z.infer<typeof registerStoreParamsSchema>;

export {
	GetDetailsResponse,
	getDetailsResponseSchema,
	RestaurantAddress,
	RegisterStoreRequestBody,
	RegisterStoreParams,
	RegisterStoreResponse,
	registerStoreRequestBodySchema,
	registerStoreResponseSchema,
	registerStoreParamsSchema,
	restaiurantAddressSchema,
};
