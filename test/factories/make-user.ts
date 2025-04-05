import { User, UserProps } from "../../src/domain/entities/user";

export function makeUser(override: Partial<UserProps> = {}) {
	const user = User.create({
		id: "1",
		name: "John Doe",
		email: "johndoe@example.com",
		phone: 1234567890,
		document: 12345678901,
		password: "123456",
		role: "COMPANY",
		...override,
	});

	return user;
}
