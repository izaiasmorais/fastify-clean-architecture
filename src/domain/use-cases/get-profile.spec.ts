import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository";
import { GetProfileUseCase } from "./get-profile";
import { User } from "../entities/user";

let inMemoryUserRepository: InMemoryUsersRepository;
let sut: GetProfileUseCase;

describe("Get Profile Use Case", () => {
	beforeEach(() => {
		inMemoryUserRepository = new InMemoryUsersRepository();
		sut = new GetProfileUseCase(inMemoryUserRepository);
	});

	it("should be able to get a user profile", async () => {
		const user = User.create({
			id: "user-1",
			name: "John Doe",
			email: "johndoe@example.com",
			phone: 123456789,
			document: 123456789,
			password: "123456",
			role: "COMPANY",
		});

		await inMemoryUserRepository.create(user);

		const result = await sut.execute({
			userId: "user-1",
		});

		expect(result.isRight()).toBe(true);

		if (result.isRight()) {
			expect(result.value).toEqual({
				id: "user-1",
				name: "John Doe",
				email: "johndoe@example.com",
				role: "COMPANY",
			});
		}
	});

	it("should not be able to get a profile of a non-existing user", async () => {
		const result = await sut.execute({
			userId: "non-existing-user",
		});

		expect(result.isLeft()).toBe(true);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
		}
	});
});
