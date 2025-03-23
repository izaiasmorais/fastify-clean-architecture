import type { StorePaymentMethod } from "../../src/domain/entities/store-payment-method";
import type {
	PaymentMethodsResponse,
	StorePaymentMethodsRepository,
} from "../../src/domain/repositories/store-payment-methods-repository";

interface PaymentMethod {
	id: string;
	description?: string;
	paymentMethodType: number;
	code: number;
}

export class InMemoryStorePaymentMethodsRepository
	implements StorePaymentMethodsRepository
{
	public storePaymentMethods: StorePaymentMethod[] = [];
	public paymentMethods: PaymentMethod[] = [];

	async findById(
		storeId: string,
		id: string
	): Promise<StorePaymentMethod | null> {
		return (
			this.storePaymentMethods.find(
				(paymentMethod) =>
					paymentMethod.storeId === storeId && paymentMethod.id === id
			) || null
		);
	}

	async findByDeviceType(
		storeId: string,
		deviceType: string
	): Promise<PaymentMethodsResponse[] | null> {
		let filteredStorePaymentMethods = this.storePaymentMethods.filter(
			(paymentMethod) => paymentMethod.storeId === storeId
		);

		if (deviceType === "flow") {
			filteredStorePaymentMethods = filteredStorePaymentMethods.filter(
				(paymentMethod) => paymentMethod.pdvFlow
			);
		}

		if (deviceType === "totem") {
			filteredStorePaymentMethods = filteredStorePaymentMethods.filter(
				(paymentMethod) => paymentMethod.selfServiceKiosk
			);
		}

		if (deviceType === "mob") {
			filteredStorePaymentMethods = filteredStorePaymentMethods.filter(
				(paymentMethod) => paymentMethod.pdvMobile
			);
		}

		if (deviceType === "app") {
			filteredStorePaymentMethods = filteredStorePaymentMethods.filter(
				(paymentMethod) => paymentMethod.appDelivery
			);
		}

		const paymentMethods: PaymentMethodsResponse[] =
			filteredStorePaymentMethods.map((paymentMethod) => {
				const basePaymentMethod = this.paymentMethods.find(
					(pm) => pm.id === paymentMethod.paymentMethodId
				) || { description: "", code: 0, paymentMethodType: 0 };

				return {
					id: paymentMethod.id,
					description: basePaymentMethod.description || "",
					code: basePaymentMethod.code,
					paymentType: basePaymentMethod.paymentMethodType,
					tokenPix: paymentMethod.pixCounterPenseBankToken,
					percentTransactionFee:
						paymentMethod.pixPenseBankTransactionPercentage,
					pixTimeLife: paymentMethod.pixPenseBankTimeLife,
				};
			});

		if (!paymentMethods) {
			return null;
		}

		return paymentMethods;
	}
}
