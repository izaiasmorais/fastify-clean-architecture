import { z } from "zod";

export const createLaunchRequestBodySchema = z.object({
	id: z.string().uuid(),
	value: z.number(),
	launchTypeId: z.string().uuid(),
	paymentMethodId: z.string().uuid(),
	createdAt: z.coerce.date(),

	materaTransactionId: z.string().max(50).nullable().optional(),
	deviceId: z.string().uuid().nullable().optional(),
	bankTellerId: z.string().uuid().nullable().optional(),
	operatorId: z.string().uuid().nullable().optional(),
	orderId: z.string().uuid().nullable().optional(),
	destinationLaunchId: z.string().uuid().nullable().optional(),
	originLaunchId: z.string().uuid().nullable().optional(),
	transferredById: z.string().uuid().nullable().optional(),

	transferredAt: z.coerce.date().nullable().optional(),
	discountValue: z.number().nullable().optional(),
	discountPercentage: z.number().nullable().optional(),
	description: z.string().max(100).nullable().optional(),
	pixHash: z.string().max(255).nullable().optional(),
	pixAlias: z.string().max(100).nullable().optional(),
});

export const getLaunchTypesResponseBodySchema = z.array(
	z.object({
		id: z.string().uuid(),
		description: z.string(),
		code: z.number(),
	})
);
