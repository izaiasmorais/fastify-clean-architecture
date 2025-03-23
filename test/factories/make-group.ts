import { GroupProps, Group } from "../../src/domain/entities/groups";
import { PrismaGroupMapper } from "../../src/infra/database/prisma/mappers/prisma-group-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";

export function makeGroup(override: Partial<GroupProps> = {}) {
	const group = Group.create({
		id: uuidv4(),
		storeId: uuidv4(),
		name: null,
		isPizza: false,
		status: true,
		createdAt: new Date(),
		updatedAt: null,
		pdvCode: null,
		...override,
	});

	return group;
}

export class GroupFactory {
	async makePrismaGroup(data: Partial<GroupProps> = {}): Promise<Group> {
		const group = makeGroup(data);

		await prisma.categorias.create({
			data: PrismaGroupMapper.toPrisma(group),
		});

		return group;
	}
}
