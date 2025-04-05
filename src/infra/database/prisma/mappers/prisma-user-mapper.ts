import { User as PrismaUser, Prisma } from "@prisma/client";
import { User, type UserRole } from "../../../../domain/entities/user";

export class PrismaUserMapper {
	static toDomain(raw: PrismaUser): User {
		return User.create({
			id: raw.id,
			document: raw.document,
			email: raw.email,
			password: raw.password,
			name: raw.name,
			phone: raw.phone,
			role: raw.role as UserRole,
		});
	}

	static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
		return {
			id: user.id,
			document: user.document,
			email: user.email,
			password: user.password,
			name: user.name,
			phone: user.phone,
			role: user.role as UserRole,
		};
	}
}
