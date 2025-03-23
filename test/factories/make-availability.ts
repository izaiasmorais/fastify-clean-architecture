import { PrismaAvailabilityMapper } from "../../src/infra/database/prisma/mappers/prisma-availability-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import {
	Availability,
	AvailabilityProps,
} from "../../src/domain/entities/availability";

export function makeAvailability(override: Partial<AvailabilityProps> = {}) {
	const availability = Availability.create({
		id: uuidv4(),
		storeId: "0b6e0dad-7e0a-433f-850d-c895bd76063f",
		start: null,
		end: null,
		createdAt: new Date(),
		updatedAt: null,
		menuCategoryId: null,
		menuItemId: null,
		endDay: 0,
		startDay: 0,
		startPeriod: null,
		endPeriod: null,
		couponId: null,
		...override,
	});

	return availability;
}

export class AvailabilityFactory {
	async makePrismaAvailability(
		data: Partial<AvailabilityProps> = {}
	): Promise<Availability> {
		const availability = makeAvailability(data);

		await prisma.disponibilidades.create({
			data: PrismaAvailabilityMapper.toPrisma(availability),
		});

		return availability;
	}
}
