import { GetDevicesUseCase } from "../../../../domain/use-cases/get-devices";
import { PrismaDevicesRepository } from "../repositories/prisma-devices-repository";

export function makeGetDevicesUseCase() {
	const devicesRepository = new PrismaDevicesRepository();
	const useCase = new GetDevicesUseCase(devicesRepository);

	return useCase;
}
