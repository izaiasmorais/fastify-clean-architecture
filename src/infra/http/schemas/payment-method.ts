import { z } from "zod";

export const getPaymentMethodsResponseBodySchema = z.array(
	z.object({
		id: z.string(),
		description: z.string().nullable(),
		code: z.number(),
		paymentType: z.number(),
		tokenPix: z.string().nullable(),
		percentTransactionFee: z.coerce.number().nullable(),
		pixTimeLife: z.number().nullable(),
	})
);
