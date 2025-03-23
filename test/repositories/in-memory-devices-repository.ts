import type { Device } from "../../src/domain/entities/device";
import type { DevicesRepository } from "../../src/domain/repositories/devices-repository";

export class InMemoryDevicesRepository implements DevicesRepository {
	public devices: Device[] = [];

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
		let filteredDevices = this.devices.filter(
			(device) => device.storeId === storeId
		);

		if (isActive !== undefined) {
			filteredDevices = filteredDevices.filter(
				(device) => device.active === isActive
			);
		}

		if (firstCreatedAt) {
			filteredDevices = filteredDevices.filter(
				(device) => device.createdAt >= firstCreatedAt
			);
		}

		if (lastCreatedAt) {
			filteredDevices = filteredDevices.filter(
				(device) => device.createdAt <= lastCreatedAt
			);
		}

		if (firstUpdatedAt) {
			filteredDevices = filteredDevices.filter((device) =>
				device.updatedAt ? device.updatedAt >= firstUpdatedAt : false
			);
		}

		if (lastUpdatedAt) {
			filteredDevices = filteredDevices.filter((device) =>
				device.updatedAt ? device.updatedAt <= lastUpdatedAt : false
			);
		}

		if (!currentPage) {
			currentPage = 1;
		}

		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedDevices = filteredDevices.slice(startIndex, endIndex);

		return paginatedDevices.length > 0 ? paginatedDevices : null;
	}

	async findById(storeId: string, id: string) {
		return (
			this.devices.find(
				(device) => device.storeId === storeId && device.id === id
			) || null
		);
	}

	async save(storeId: string, device: Device): Promise<void> {
		const index = this.devices.findIndex(
			(d) => d.storeId === storeId && d.id === device.id
		);

		this.devices[index] = device;
	}

	async findBySerialNumber(
		storeId: string,
		serialNumber: string
	): Promise<Device | null> {
		return (
			this.devices.find(
				(device) =>
					device.storeId === storeId && device.serialNumber === serialNumber
			) || null
		);
	}

	async findByImei(storeId: string, imei: string): Promise<Device | null> {
		return (
			this.devices.find(
				(device) => device.storeId === storeId && device.imei === imei
			) || null
		);
	}

	async findByMacAddress(
		storeId: string,
		macAddress: string
	): Promise<Device | null> {
		return (
			this.devices.find(
				(device) =>
					device.storeId === storeId && device.networkMacAddress === macAddress
			) || null
		);
	}

	async create(device: Device): Promise<void> {
		this.devices.push(device);
	}
}
