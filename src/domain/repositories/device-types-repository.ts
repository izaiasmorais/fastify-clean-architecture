import { DeviceType } from "../entities/device-type";

export interface DeviceTypesRepository {
	findMany(): Promise<DeviceType[]>;
}
