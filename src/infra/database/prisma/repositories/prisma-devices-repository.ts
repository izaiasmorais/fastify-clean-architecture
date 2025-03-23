import type { Device } from "../../../../domain/entities/device";
import type { DevicesRepository } from "../../../../domain/repositories/devices-repository";
import { PrismaDeviceMapper } from "../mappers/prisma-device-mapper";
import { prisma } from "../prisma";

export class PrismaDevicesRepository implements DevicesRepository {
	async findMany(
		storeId: string,
		pageSize: number,
		currentPage?: number,
		isActive?: boolean,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<Device[] | null> {
		const skip = (currentPage ?? 1 - 1) * pageSize;
		const take = pageSize;

		const devices = await prisma.dispositivoLoja.findMany({
			skip,
			take,
			where: {
				RestauranteId: storeId,
				Ativo: isActive,
				CriadoEm: {
					gte: firstCreatedAt,
					lte: lastCreatedAt,
				},
				AlteradoEm: {
					gte: firstUpdatedAt,
					lte: lastUpdatedAt,
				},
			},
			include: {
				TipoDispositivo: true,
			},
		});

		if (!devices) {
			return null;
		}

		return devices.map(PrismaDeviceMapper.toDomain);
	}

	async findById(storeId: string, id: string): Promise<Device | null> {
		const device = await prisma.dispositivoLoja.findUnique({
			where: {
				Id: id,
				RestauranteId: storeId,
			},
			include: {
				TipoDispositivo: true,
			},
		});

		if (!device) {
			return null;
		}

		return PrismaDeviceMapper.toDomain(device);
	}

	async findBySerialNumber(
		storeId: string,
		serialNumber: string
	): Promise<Device | null> {
		const device = await prisma.dispositivoLoja.findFirst({
			where: {
				RestauranteId: storeId,
				NumeroSerie: serialNumber,
			},
			include: {
				TipoDispositivo: true,
			},
		});

		if (!device) {
			return null;
		}

		return PrismaDeviceMapper.toDomain(device);
	}

	async findByImei(storeId: string, imei: string): Promise<Device | null> {
		const device = await prisma.dispositivoLoja.findFirst({
			where: {
				RestauranteId: storeId,
				IMEI: imei,
			},
			include: {
				TipoDispositivo: true,
			},
		});

		if (!device) {
			return null;
		}

		return PrismaDeviceMapper.toDomain(device);
	}

	async findByMacAddress(
		storeId: string,
		macAddress: string
	): Promise<Device | null> {
		const device = await prisma.dispositivoLoja.findFirst({
			where: {
				RestauranteId: storeId,
				MacAddressRede: macAddress,
			},
			include: {
				TipoDispositivo: true,
			},
		});

		if (!device) {
			return null;
		}

		return PrismaDeviceMapper.toDomain(device);
	}

	async save(storeId: string, device: Device): Promise<void> {
		const data = PrismaDeviceMapper.toPrisma(device);

		await prisma.dispositivoLoja.update({
			where: {
				Id: device.id,
				RestauranteId: storeId,
			},
			data,
		});
	}

	async create(device: Device): Promise<void> {
		const data = PrismaDeviceMapper.toPrisma(device);

		await prisma.dispositivoLoja.create({
			data: {
				...data,
				RestauranteId: device.storeId,
			},
		});
	}
}
