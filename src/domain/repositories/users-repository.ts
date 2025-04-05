import { User, type UserProps } from "../entities/user";

export interface UserRepository {
	create(user: UserProps): Promise<void>;
	findByEmail(email: string): Promise<User | null>;
	findByDocument(document: number): Promise<User | null>;
}
