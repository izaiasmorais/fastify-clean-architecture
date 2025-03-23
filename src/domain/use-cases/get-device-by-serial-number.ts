import { CustomError } from "../../core/errors/custom-error";
import { left, right, type Either } from "../../core/types/either";
import type { DeviceProps } from "../entities/device";
import type { DevicesRepository } from "../repositories/devices-repository";

type GetDeviceBySerialNumberRequest = {
	storeId: string;
	serialNumber: string;
};

type GetDeviceBySerialNumberResponse = Either<CustomError, DeviceProps | null>;

export class GetDeviceBySerialNumberUseCase {
	constructor(private devicesRepository: DevicesRepository) {}

	async execute({
		storeId,
		serialNumber,
	}: GetDeviceBySerialNumberRequest): Promise<GetDeviceBySerialNumberResponse> {
		const device = await this.devicesRepository.findBySerialNumber(
			storeId,
			serialNumber
		);

		if (!device) {
			return left(new CustomError(404, ["Dispositivo não encontrado"]));
		}

		const deviceResponse: DeviceProps = {
			id: device.id,
			storeId: device.storeId,
			deviceTypeId: device.deviceTypeId,
			alias: device.alias,
			nebulaCode: device.nebulaCode,
			deviceName: device.deviceName,
			createdAt: device.createdAt,
			updatedAt: device.updatedAt,
			serialNumber: device.serialNumber,
			brand: device.brand,
			model: device.model,
			operatingSystem: device.operatingSystem,
			osVersion: device.osVersion,
			memory: device.memory,
			processor: device.processor,
			networkMacAddress: device.networkMacAddress,
			hardDiskSerial: device.hardDiskSerial,
			hardDiskTotal: device.hardDiskTotal,
			hardDiskFree: device.hardDiskFree,
			ipAddress: device.ipAddress,
			imei: device.imei,
			connectionType: device.connectionType,
			lastAccess: device.lastAccess,
			active: device.active,
		};

		return right(deviceResponse);
	}
}
