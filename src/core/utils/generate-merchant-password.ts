import { getMd5Hash } from "./get-md5-hash";

export const generateMerchantPassword = (
	restaurantName: string,
	restaurantCnpj: string
): string => {
	let merchantPwd = `retaguardaweb-${restaurantName}-${restaurantCnpj}`;
	merchantPwd = getMd5Hash(merchantPwd);
	return merchantPwd;
};
