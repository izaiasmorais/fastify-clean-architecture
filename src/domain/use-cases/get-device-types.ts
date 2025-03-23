import { right, type Either } from "../../core/types/either";
import { DeviceTypeProps } from "../entities/device-type";

import type { DeviceTypesRepository } from "../repositories/device-types-repository";

type GetDeviceTypesResponse = Either<null, DeviceTypeProps[] | null>;

export class GetDeviceTypesUseCase {
	constructor(private deviceTypesRepository: DeviceTypesRepository) {}

	async execute(): Promise<GetDeviceTypesResponse> {
		const deviceTypes = await this.deviceTypesRepository.findMany();

		if (!deviceTypes) {
			return right(null);
		}

		const deviceTypesResponse: DeviceTypeProps[] = deviceTypes.map(
			(deviceType) => {
				return {
					id: deviceType.id,
					code: deviceType.code,
					description: deviceType.description,
					isActive: deviceType.isActive,
				};
			}
		);

		return right(deviceTypesResponse);
	}
}
