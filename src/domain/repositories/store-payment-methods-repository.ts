import type { StorePaymentMethod } from "../entities/store-payment-method";

export interface PaymentMethodsResponse {
	id: string;
	description: string | null;
	code: number;
	paymentType: number;
	tokenPix: string | null;
	percentTransactionFee: number | null;
	pixTimeLife: number | null;
}

export interface StorePaymentMethodsRepository {
	findById(storeId: string, id: string): Promise<StorePaymentMethod | null>;
	findByDeviceType(
		storeId: string,
		deviceId: string
	): Promise<PaymentMethodsResponse[] | null>;
}
