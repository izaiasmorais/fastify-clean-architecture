import type { DeviceType } from "../../src/domain/entities/device-type";
import type { DeviceTypesRepository } from "../../src/domain/repositories/device-types-repository";

export class InMemoryDeviceTypesRepository implements DeviceTypesRepository {
	public deviceTypes: DeviceType[] = [];

	async findMany(): Promise<DeviceType[]> {
		return this.deviceTypes;
	}
}
