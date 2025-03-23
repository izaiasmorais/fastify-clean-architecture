import { CreateDeviceUseCase } from "../../../../domain/use-cases/create-device";
import { PrismaDevicesRepository } from "../repositories/prisma-devices-repository";

export function makeCreateDeviceUseCase() {
	const deviceRepository = new PrismaDevicesRepository();
	const useCase = new CreateDeviceUseCase(deviceRepository);

	return useCase;
}
