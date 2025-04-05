import { UserRepository } from "../../src/domain/repositories/users-repository";
import { User } from "../../src/domain/entities/user";

export class InMemoryUsersRepository implements UserRepository {
	public users: User[] = [];

	async create(user: User): Promise<void> {
		this.users.push(user);
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.users.find((user) => user.email === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByDocument(document: number): Promise<User | null> {
		const user = this.users.find((user) => user.document === document);

		if (!user) {
			return null;
		}

		return user;
	}
}
