import { CustomError } from "../../core/errors/custom-error";
import { right, left, type Either } from "../../core/types/either";
import { adjustTimezone } from "../../core/utils/adjust-timezone";
import type { DevicesRepository } from "../repositories/devices-repository";

export interface UpdateDeviceRequest {
	storeId: string;
	id: string;
	deviceName?: string;
	alias?: string;
	brand?: string;
	model?: string;
	operatingSystem?: string;
	osVersion?: string;
	memory?: string;
	processor?: string;
	hardDiskSerial?: string;
	hardDiskTotal?: string;
	hardDiskFree?: string;
	ipAddress?: string;
	connectionType?: string;
}

type UpdateDeviceResponse = Either<CustomError, null>;

export class UpdateDeviceUseCase {
	constructor(private devicesRepository: DevicesRepository) {}

	async execute(data: UpdateDeviceRequest): Promise<UpdateDeviceResponse> {
		const device = await this.devicesRepository.findById(data.storeId, data.id);

		if (!device) {
			return left(new CustomError(404, ["Dispositivo não encontrado"]));
		}

		const updateData = {
			updatedAt: adjustTimezone(new Date()),
			deviceName: data.deviceName ?? device.deviceName,
			alias: data.alias ?? device.alias,
			brand: data.brand ?? device.brand,
			model: data.model ?? device.model,
			operatingSystem: data.operatingSystem ?? device.operatingSystem,
			osVersion: data.osVersion ?? device.osVersion,
			memory: data.memory ?? device.memory,
			processor: data.processor ?? device.processor,
			hardDiskSerial: data.hardDiskSerial ?? device.hardDiskSerial,
			hardDiskTotal: data.hardDiskTotal ?? device.hardDiskTotal,
			hardDiskFree: data.hardDiskFree ?? device.hardDiskFree,
			ipAddress: data.ipAddress ?? device.ipAddress,
			connectionType: data.connectionType ?? device.connectionType,
		};

		device.updatedAt = updateData.updatedAt;
		device.deviceName = updateData.deviceName;
		device.alias = updateData.alias;
		device.brand = updateData.brand;
		device.model = updateData.model;
		device.operatingSystem = updateData.operatingSystem;
		device.osVersion = updateData.osVersion;
		device.memory = updateData.memory;
		device.processor = updateData.processor;
		device.hardDiskSerial = updateData.hardDiskSerial;
		device.hardDiskTotal = updateData.hardDiskTotal;
		device.hardDiskFree = updateData.hardDiskFree;
		device.ipAddress = updateData.ipAddress;
		device.connectionType = updateData.connectionType;

		await this.devicesRepository.save(data.storeId, device);

		return right(null);
	}
}
