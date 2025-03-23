import { PrismaDeviceMapper } from "../../src/infra/database/prisma/mappers/prisma-device-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import { Device, DeviceProps } from "../../src/domain/entities/device";

export function makeDevice(override: Partial<DeviceProps> = {}) {
	const device = Device.create({
		id: uuidv4(),
		storeId: uuidv4(),
		deviceTypeId: uuidv4(),
		alias: "Device Alias",
		nebulaCode: "NEBULA123",
		deviceName: "Device Name",
		createdAt: new Date(),
		updatedAt: null,
		serialNumber: "SN123456",
		brand: null,
		model: null,
		operatingSystem: null,
		osVersion: null,
		memory: null,
		processor: null,
		networkMacAddress: null,
		hardDiskSerial: null,
		hardDiskTotal: null,
		hardDiskFree: null,
		ipAddress: null,
		imei: null,
		connectionType: null,
		lastAccess: null,
		active: true,
		...override,
	});

	return device;
}

export class DeviceFactory {
	async makePrismaDevice(data: Partial<DeviceProps> = {}): Promise<Device> {
		const device = makeDevice(data);

		await prisma.dispositivoLoja.create({
			data: PrismaDeviceMapper.toPrisma(device),
		});

		return device;
	}
}
