import { GetDeviceTypesUseCase } from "../../../../domain/use-cases/get-device-types";
import { PrismaDeviceTypesRepository } from "../repositories/prisma-device-types-repository";

export function makeGetDeviceTypesUseCase() {
	const deviceTypesRepository = new PrismaDeviceTypesRepository();
	const useCase = new GetDeviceTypesUseCase(deviceTypesRepository);

	return useCase;
}
