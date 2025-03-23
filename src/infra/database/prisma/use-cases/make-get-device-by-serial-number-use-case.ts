import { GetDeviceBySerialNumberUseCase } from "../../../../domain/use-cases/get-device-by-serial-number";
import { PrismaDevicesRepository } from "../repositories/prisma-devices-repository";

export function makeGetDeviceBySerialNumberUseCase() {
	const devicesRepository = new PrismaDevicesRepository();
	const useCase = new GetDeviceBySerialNumberUseCase(devicesRepository);

	return useCase;
}
