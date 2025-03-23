import { PrismaLaunchesRepository } from "../repositories/prisma-launches-repository";
import { PrismaDevicesRepository } from "../repositories/prisma-devices-repository";
import { PrismaBankTellersRepository } from "../repositories/prisma-bank-tellers-repository";
import { PrismaCollaboratorsRepository } from "../repositories/prisma-collaborators-repository";
import { PrismaOrdersRepository } from "../repositories/prisma-orders-repository";
import { PrismaStorePaymentMethodsRepository } from "../repositories/prisma-store-payment-methods-repository";
import { PrismaLaunchTypesRepository } from "../repositories/prisma-launch-types-repository";
import { CreateLaunchUseCase } from "../../../../domain/use-cases/create-launch";

export function makeCreateLaunchUseCase() {
	const launchesRepository = new PrismaLaunchesRepository();
	const devicesRepository = new PrismaDevicesRepository();
	const bankTellersRepository = new PrismaBankTellersRepository();
	const collaboratorRepository = new PrismaCollaboratorsRepository();
	const ordersRepository = new PrismaOrdersRepository();
	const storePaymentMethodsRepository =
		new PrismaStorePaymentMethodsRepository();
	const launchTypesRepository = new PrismaLaunchTypesRepository();
	const useCase = new CreateLaunchUseCase(
		launchesRepository,
		devicesRepository,
		bankTellersRepository,
		collaboratorRepository,
		ordersRepository,
		storePaymentMethodsRepository,
		launchTypesRepository
	);

	return useCase;
}
