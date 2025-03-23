import { FakeHasher } from "../../../test/cryptography/fake-hasher";
import { SignInUseCase } from "./sign-in";
import { Encrypter } from "../cryptography/encypter";
import { FakeEncrypter } from "../../../test/cryptography/fake-encrypter";
import { makeUser } from "../../../test/factories/make-user";
import { makeRestaurant } from "../../../test/factories/make-restaurant";
import { InMemoryUserRepository } from "../../../test/repositories/in-memory-user-repository";
import { InMemoryStoreRepository } from "../../../test/repositories/in-memory-store-repository";
import { makeCollaborator } from "../../../test/factories/make-collaborator";
import { InMemoryCollaboratorsRepository } from "../../../test/repositories/in-memory-collaborators-repository";
import { makeStore } from "../../../test/factories/make-store";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryStoreRepository: InMemoryStoreRepository;
let inMemoryCollaboratorsRepository: InMemoryCollaboratorsRepository;

let encrypter: Encrypter;
let fakeHasher: FakeHasher;
let sut: SignInUseCase;

describe("Sign in use case", () => {
	beforeEach(() => {
		inMemoryUserRepository = new InMemoryUserRepository();
		inMemoryStoreRepository = new InMemoryStoreRepository();
		inMemoryCollaboratorsRepository = new InMemoryCollaboratorsRepository();
		fakeHasher = new FakeHasher();
		encrypter = new FakeEncrypter();
		sut = new SignInUseCase(
			inMemoryUserRepository,
			inMemoryStoreRepository,
			inMemoryCollaboratorsRepository,
			encrypter
		);
	});

	it("should be able to sign in with grantType 'Password'", async () => {
		const user = makeUser({
			Email: "johndoe@example.com",
			Senha: await fakeHasher.hash("123456"),
			RestaurantesUsuarios: [
				{
					Restaurantes: {
						Id: 1,
						CNPJ: "12345678901234",
						Ativo: true,
					},
				},
			],
		});

		inMemoryUserRepository.users.push(user);

		const result = await sut.execute({
			grantType: "password",
			clientId: "johndoe@example.com",
			clientSecret: "123456",
			clientDocument: "12345678901234",
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			success: true,
			errors: null,
			data: {
				created: expect.any(String),
				expirationIn: expect.any(String),
				accessToken: expect.any(String),
				grantType: "password",
			},
		});
	});

	it("should be able to sign in with grantType 'ClientCredentials'", async () => {
		const restaurant = makeRestaurant({
			Id: "aaaaa",
			MerchantId: "bbbbb",
			MerchantPwd: "cccccc",
			SoftwareHouse: {
				IntegratorId: "ddddd",
				Id: 1,
				Nome: null,
				Cnpj: null,
				Contato: null,
				CriadoEm: null,
				Ativo: null,
				Bairro: null,
				Cep: null,
				Cidade: null,
				Complemento: null,
				Email: null,
				Estado: null,
				Logradouro: null,
				Numero: null,
				PercentTransactionPixPenseBank: null,
				Telefone: null,
			},
		});

		inMemoryStoreRepository.restaurants.push(restaurant);

		const result = await sut.execute({
			grantType: "ClientCredentials",
			clientId: "bbbbb",
			clientSecret: "cccccc",
			clientDocument: "ddddd",
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			success: true,
			errors: null,
			data: {
				created: expect.any(String),
				expirationIn: expect.any(String),
				accessToken: expect.any(String),
				grantType: "clientcredentials",
			},
		});
	});

	it("should be able to sign in with grantType 'Collaborator'", async () => {
		const username = "johndoe";
		const password = await fakeHasher.hash("123456");
		const storeId = "a4223e13-ea05-4899-9395-c011076dfb11";

		const collaborator = makeCollaborator({
			username,
			password,
			storeId,
		});

		inMemoryCollaboratorsRepository.collaborators.push(collaborator);

		const result = await sut.execute({
			grantType: "collaborator",
			clientId: username,
			clientSecret: "123456",
			clientDocument: storeId,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			success: true,
			errors: null,
			data: {
				created: expect.any(String),
				expirationIn: expect.any(String),
				accessToken: expect.any(String),
				grantType: "collaborator",
				collaborator: {
					id: collaborator.id,
					name: collaborator.name,
					cpf: collaborator.cpf,
					birthDate: collaborator.birthDate,
					phone: collaborator.phone,
					collaboratorType: collaborator.collaboratorType,
				},
			},
		});
	});

	it("should be able to sign in with grantType 'Company'", async () => {
		const nebulaCode = "c011076dfb11";
		const accessKey = "a4223e13";

		const store = makeStore({
			nebulaCode,
			accessKey,
		});

		inMemoryStoreRepository.stores.push(store);

		const result = await sut.execute({
			grantType: "company",
			clientId: nebulaCode,
			clientSecret: accessKey,
			clientDocument: nebulaCode,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			success: true,
			errors: null,
			data: {
				created: expect.any(String),
				expirationIn: expect.any(String),
				accessToken: expect.any(String),
				grantType: "company",
				store: {
					id: store.id,
					cnpj: store.cnpj,
					alias: store.alias,
					name: store.name,
					nebulaCode: store.nebulaCode,
				},
			},
		});
	});
});
