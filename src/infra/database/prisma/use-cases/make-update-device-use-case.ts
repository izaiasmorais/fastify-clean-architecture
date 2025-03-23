import { UpdateDeviceUseCase } from "../../../../domain/use-cases/update-device";
import { PrismaDevicesRepository } from "../repositories/prisma-devices-repository";

export function makeUpdateDeviceUseCase() {
	const deviceRepository = new PrismaDevicesRepository();
	const useCase = new UpdateDeviceUseCase(deviceRepository);

	return useCase;
}
