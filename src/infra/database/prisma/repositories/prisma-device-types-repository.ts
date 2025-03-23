import { DeviceType } from "../../../../domain/entities/device-type";
import { DeviceTypesRepository } from "../../../../domain/repositories/device-types-repository";
import { PrismaDeviceTypeMapper } from "../mappers/prisma-device-type-mapper";
import { prisma } from "../prisma";

export class PrismaDeviceTypesRepository implements DeviceTypesRepository {
	async findMany(): Promise<DeviceType[]> {
		const deviceTypes = await prisma.tipoDispositivo.findMany();

		return deviceTypes.map(PrismaDeviceTypeMapper.toDomain);
	}
}
