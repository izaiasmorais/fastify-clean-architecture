import {
	Prisma,
	User as PrismaUser,
	UserRole as PrismaUserRole,
} from "@prisma/client";
import { User, UserRole } from "../../../../domain/entities/user";

export class PrismaUserMapper {
	private static mapRole(prismaRole: PrismaUserRole): UserRole {
		const roleMapping = {
			ADMIN: UserRole.ADMIN,
			COMPANY: UserRole.COMPANY,
			CONSULTANT: UserRole.CONSULTANT,
			CITY: UserRole.CITY,
		};

		return roleMapping[prismaRole];
	}

	private static mapToPrismaRole(domainRole: UserRole): PrismaUserRole {
		const roleMapping = {
			[UserRole.ADMIN]: "ADMIN" as PrismaUserRole,
			[UserRole.COMPANY]: "COMPANY" as PrismaUserRole,
			[UserRole.CONSULTANT]: "CONSULTANT" as PrismaUserRole,
			[UserRole.CITY]: "CITY" as PrismaUserRole,
		};

		return roleMapping[domainRole];
	}

	static toDomain(raw: PrismaUser): User {
		return User.create({
			id: raw.id,
			email: raw.email,
			password: raw.password,
			name: raw.name,
			document: raw.document,
			phone: raw.phone,
			role: this.mapRole(raw.role),
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
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
			role: this.mapToPrismaRole(user.role),
		};
	}
}
