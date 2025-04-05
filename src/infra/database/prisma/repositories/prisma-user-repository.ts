import { UserRepository } from "../../../../domain/repositories/users-repository";
import { prisma } from "../prisma";
import { User } from "../../../../domain/entities/user";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

export class PrismaUserRepository implements UserRepository {
	async create(user: User): Promise<void> {
		await prisma.user.create({
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				document: user.document,
				password: user.password,
				role: user.role,
			},
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async findByDocument(document: number): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				document,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}
}
