import { GetPaymentMethodsUseCase } from "../../../../domain/use-cases/get-payment-methods";
import { PrismaDevicesRepository } from "../repositories/prisma-devices-repository";
import { PrismaStorePaymentMethodsRepository } from "../repositories/prisma-store-payment-methods-repository";

export function makeGetPaymentMethodsUseCase() {
	const paymentMethodsRepository = new PrismaStorePaymentMethodsRepository();
	const devicesRepository = new PrismaDevicesRepository();
	const useCase = new GetPaymentMethodsUseCase(
		paymentMethodsRepository,
		devicesRepository
	);

	return useCase;
}
