import { getMd5Hash } from "./get-md5-hash";

export const generateMerchantId = (restauranteId: string): string => {
	let merchantId = `retaguardaweb-${restauranteId}`;
	merchantId = getMd5Hash(merchantId);
	return merchantId;
};
