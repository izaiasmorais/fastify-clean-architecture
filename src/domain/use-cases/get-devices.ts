import { right, type Either } from "../../core/types/either";
import { env } from "../../infra/env/env";
import type { DeviceProps } from "../entities/device";
import type { DevicesRepository } from "../repositories/devices-repository";

type GetDevicesRequest = {
	storeId: string;
	currentPage: number;
	isActive?: boolean;
	firstCreatedAt?: Date;
	lastCreatedAt?: Date;
	firstUpdatedAt?: Date;
	lastUpdatedAt?: Date;
};

type GetDevicesResponse = Either<
	null,
	{
		devices: DeviceProps[];
		currentPageNumber: number;
		totalRecordPerPage: number;
		totalPage: number;
		totalRecord: number;
	}
>;

export class GetDevicesUseCase {
	constructor(private devicesRepository: DevicesRepository) {}

	async execute(data: GetDevicesRequest): Promise<GetDevicesResponse> {
		const pageSize = env.PAGE_SIZE;
		const allDevices = await this.devicesRepository.findMany(
			data.storeId,
			pageSize
		);

		if (!allDevices) {
			return right({
				devices: [],
				currentPageNumber: 1,
				totalRecordPerPage: 0,
				totalPage: 0,
				totalRecord: 0,
			});
		}

		const filteredDevices = await this.devicesRepository.findMany(
			data.storeId,
			pageSize,
			data.currentPage,
			data.isActive,
			data.firstCreatedAt,
			data.lastCreatedAt,
			data.firstUpdatedAt,
			data.lastUpdatedAt
		);

		const currentPageNumber = data.currentPage;
		const totalPage = Math.ceil(allDevices.length / pageSize);
		const totalRecordPerPage = pageSize;
		const totalRecord = allDevices.length;

		if (!filteredDevices) {
			return right({
				devices: [],
				totalRecord: 0,
				totalPage: 0,
				currentPageNumber: data.currentPage,
				totalRecordPerPage,
			});
		}

		const formattedDevices: DeviceProps[] = filteredDevices.map((device) => ({
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
		}));

		return right({
			devices: formattedDevices,
			currentPageNumber,
			totalRecordPerPage,
			totalPage,
			totalRecord,
		});
	}
}
