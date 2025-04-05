import { describe, it, expect, beforeEach } from "vitest";
import { SignInUseCase } from "./sign-in";
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository";
import { FakeEncrypter } from "../../../test/cryptography/fake-encrypter";
import { FakeHasher } from "../../../test/cryptography/fake-hasher";
import { makeUser } from "../../../test/factories/make-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeEncrypter: FakeEncrypter;
let fakeHasher: FakeHasher;
let sut: SignInUseCase;

describe("Sign In Use Case", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		fakeEncrypter = new FakeEncrypter();
		fakeHasher = new FakeHasher();
		sut = new SignInUseCase(inMemoryUsersRepository, fakeHasher, fakeEncrypter);
	});

	it("should be able to authenticate with valid credentials", async () => {
		const user = makeUser({
			email: "johndoe@example.com",
			password: "123456-hashed",
		});

		await inMemoryUsersRepository.create(user);

		const result = await sut.execute({
			email: "johndoe@example.com",
			password: "123456",
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toEqual({
				accessToken: expect.any(String),
			});
		}
	});

	it("should not be able to authenticate with wrong email", async () => {
		const result = await sut.execute({
			email: "wrong-email@example.com",
			password: "123456",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(400);
			expect(result.value.message).toEqual("Credenciais inválidas");
		}
	});

	it("should not be able to authenticate with wrong password", async () => {
		const user = makeUser({
			email: "johndoe@example.com",
			password: "123456-hashed",
		});

		await inMemoryUsersRepository.create(user);

		const result = await sut.execute({
			email: "johndoe@example.com",
			password: "wrong-password",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(400);
			expect(result.value.message).toEqual("Credenciais inválidas");
		}
	});
});
