import { User, type UserProps } from "../entities/user";

export interface UserRepository {
	create(user: UserProps): Promise<void>;
	findByEmail(email: string): Promise<User | null>;
	findByDocument(document: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
}
