import { CustomError } from "../../core/errors/custom-error";
import { right, left, type Either } from "../../core/types/either";
import type { DeviceProps } from "../entities/device";
import type { DevicesRepository } from "../repositories/devices-repository";

type GetDeviceByIdRequest = {
	deviceId: string;
	storeId: string;
};

type GetDeviceByIdResponse = Either<CustomError, DeviceProps>;

export class GetDeviceByIdUseCase {
	constructor(private devicesRepository: DevicesRepository) {}

	async execute(data: GetDeviceByIdRequest): Promise<GetDeviceByIdResponse> {
		const device = await this.devicesRepository.findById(
			data.storeId,
			data.deviceId
		);

		if (!device) {
			return left(new CustomError(404, ["Dispositivo não encontrado"]));
		}

		const formattedDevice: DeviceProps = {
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
			deviceType: device.deviceType,
		};

		return right(formattedDevice);
	}
}
