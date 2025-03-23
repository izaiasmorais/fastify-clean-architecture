import { prisma } from "../../src/infra/database/prisma/prisma";
import {
	DeviceType,
	DeviceTypeProps,
} from "../../src/domain/entities/device-type";
import { PrismaDeviceTypeMapper } from "../../src/infra/database/prisma/mappers/prisma-device-type-mapper";

export function makeDeviceType(override: Partial<DeviceTypeProps> = {}) {
	const deviceType = DeviceType.create({
		id: "71c96beb-fa80-11ef-b303-0242c0a81417",
		description: "PDVFlow",
		code: "FLOW",
		isActive: 1,
		...override,
	});

	return deviceType;
}

export class DeviceTypeFactory {
	async makePrismaDeviceType(
		data: Partial<DeviceTypeProps> = {}
	): Promise<DeviceType> {
		const deviceType = makeDeviceType(data);

		await prisma.tipoDispositivo.create({
			data: PrismaDeviceTypeMapper.toPrisma(deviceType),
		});

		return deviceType;
	}
}
