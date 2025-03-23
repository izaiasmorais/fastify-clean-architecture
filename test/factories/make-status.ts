import { Status, type StatusProps } from "../../src/domain/entities/status";
import { PrismaStatusMapper } from "../../src/infra/database/prisma/mappers/prisma-status-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";

export function makeStatus(override: Partial<StatusProps> = {}) {
	const status = Status.create({
		id: "c52f2a6c-43dc-44c4-8811-fdb8c36e6666",
		createdAt: new Date(),
		updatedAt: null,
		description: "Active",
		value: 1,
		name: "ativo",
		...override,
	});

	return status;
}

export class StatusFactory {
	async makePrismaStatus(data: Partial<StatusProps> = {}): Promise<Status> {
		const status = makeStatus(data);

		await prisma.status.create({
			data: PrismaStatusMapper.toPrisma(status),
		});

		return status;
	}
}
