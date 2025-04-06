import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository";
import { FakeHasher } from "../../../test/cryptography/fake-hasher";
import { SignUpUseCase } from "./sign-up";
import { makeUser } from "../../../test/factories/make-user";
import { UserRole } from "../entities/user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let sut: SignUpUseCase;

describe("Sign Up Use Case", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		fakeHasher = new FakeHasher();
		sut = new SignUpUseCase(inMemoryUsersRepository, fakeHasher);
	});

	it("should be able to sign up a new user", async () => {
		const user = makeUser({
			name: "John Doe",
			email: "johndoe@example.com",
			phone: "1234567890",
			document: "12345678901",
			password: "123456",
			role: UserRole.COMPANY,
		});

		const result = await sut.execute({
			name: user.name,
			email: user.email,
			phone: user.phone,
			document: user.document,
			password: user.password,
			role: user.role,
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toBeNull();
		}
		expect(inMemoryUsersRepository.users).toHaveLength(1);
	});

	it("should not be able to sign up with existing email", async () => {
		const existingUser = makeUser({
			email: "johndoe@example.com",
		});

		await inMemoryUsersRepository.create(existingUser);

		const result = await sut.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			phone: "1234567890",
			document: "12345678901",
			password: "123456",
			role: UserRole.COMPANY,
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(400);
			expect(result.value.message).toEqual("Email já cadastrado");
		}
		expect(inMemoryUsersRepository.users).toHaveLength(1);
	});

	it("should not be able to sign up with existing document", async () => {
		const existingUser = makeUser({
			document: "12345678901",
		});

		await inMemoryUsersRepository.create(existingUser);

		const result = await sut.execute({
			name: "John Doe",
			email: "different@example.com",
			phone: "1234567890",
			document: "12345678901",
			password: "123456",
			role: UserRole.COMPANY,
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(400);
			expect(result.value.message).toEqual("Documento já cadastrado");
		}
		expect(inMemoryUsersRepository.users).toHaveLength(1);
	});
});
