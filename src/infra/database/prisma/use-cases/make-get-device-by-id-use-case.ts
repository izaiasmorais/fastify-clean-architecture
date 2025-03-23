import { GetDeviceByIdUseCase } from "../../../../domain/use-cases/get-device-by-id";
import { PrismaDevicesRepository } from "../repositories/prisma-devices-repository";

export function makeGetDeviceByIdUseCase() {
	const devicesRepository = new PrismaDevicesRepository();
	const useCase = new GetDeviceByIdUseCase(devicesRepository);

	return useCase;
}
