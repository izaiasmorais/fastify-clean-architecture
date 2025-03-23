import { PrismaStorePaymentMethodMapper } from "../../src/infra/database/prisma/mappers/prisma-store-payment-method-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import {
	StorePaymentMethod,
	StorePaymentMethodProps,
} from "../../src/domain/entities/store-payment-method";

export function makeStorePaymentMethod(
	override: Partial<StorePaymentMethodProps> = {}
) {
	const storePaymentMethod = StorePaymentMethod.create({
		id: uuidv4(),
		storeId: uuidv4(),
		paymentMethodId: uuidv4(),
		status: 1,
		createdAt: new Date(),
		updatedAt: null,
		pixCounterPenseBankToken: null,
		pixPenseBankTransactionPercentage: null,
		pixPenseBankTimeLife: null,
		serviceFee: null,
		appDelivery: true,
		pdvFlow: true,
		selfServiceKiosk: false,
		pdvMobile: false,
		...override,
	});

	return storePaymentMethod;
}

export class StorePaymentMethodFactory {
	async makePrismaStorePaymentMethod(
		data: Partial<StorePaymentMethodProps> = {}
	): Promise<StorePaymentMethod> {
		const storePaymentMethod = makeStorePaymentMethod(data);

		await prisma.restauranteFormaPagamento.create({
			data: PrismaStorePaymentMethodMapper.toPrisma(storePaymentMethod),
		});

		return storePaymentMethod;
	}
}
