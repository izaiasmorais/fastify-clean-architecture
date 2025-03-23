import type { Device } from "../entities/device";

export interface DevicesRepository {
	findMany(
		storeId: string,
		pageSize: number,
		currentPage?: number,
		isActive?: boolean,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<Device[] | null>;
	findBySerialNumber(
		storeId: string,
		serialNumber: string
	): Promise<Device | null>;
	findById(storeId: string, id: string): Promise<Device | null>;
	findByImei(storeId: string, imei: string): Promise<Device | null>;
	findByMacAddress(storeId: string, macAddress: string): Promise<Device | null>;
	save(storeId: string, device: Device): Promise<void>;
	create(device: Device): Promise<void>;
}
