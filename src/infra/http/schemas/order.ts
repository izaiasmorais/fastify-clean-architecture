import { z } from "zod";

const orderTypeSchema = z.object({
	id: z.string().uuid(),
	code: z.number(),
	description: z.string(),
});

export const getOrderTypesResponseBodySchema = z.array(
	z.object({
		id: z.string(),
		description: z.string(),
		code: z.number(),
	})
);

const paymentMethodSchema = z.object({
	id: z.string().uuid(),
	code: z.number(),
	description: z.string(),
	paymentType: z.number(),
});

const subItemsSchema = z.array(
	z.object({
		id: z.string().uuid(),
		productId: z.string().uuid(),
		quantity: z.number(),
		productName: z.string(),
		unitPrice: z.number(),
		subtotal: z.number(),
		type: z.string(),
		pizzaSizeId: z.string().uuid().nullable(),
		observation: z.string().nullable(),

		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date().nullable(),

		subItems: z.null(),
		complements: z.null(),
	})
);

const complementsSchema = z.array(
	z.object({
		id: z.string().uuid(),
		productId: z.string().uuid(),
		productName: z.string(),
		quantity: z.number(),
		unitPrice: z.number(),
		subtotal: z.number(),

		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date().nullable(),
	})
);

const itemsSchema = z.array(
	z.object({
		id: z.string().uuid(),
		productName: z.string(),
		productId: z.string().uuid(),
		quantity: z.number(),
		unitPrice: z.number(),
		subtotal: z.number(),
		type: z.string(),
		pizzaSizeId: z.string().uuid().nullable(),
		observation: z.string().nullable(),

		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date().nullable(),

		subItems: subItemsSchema.nullable(),
		complements: complementsSchema.nullable(),
	})
);

export const createOrderRequestBodySchema = z.object({
	id: z.string().uuid(),
	createdAt: z.coerce.date(),
	orderStatus: z.number(),
	isPaid: z.number(),
	totalValue: z.number(),
	exchangeValue: z.number().default(0),
	serviceFee: z.number().nullable(),
	pixHashPenseBank: z.string().nullable(),
	alias: z.string().nullable(),
	deviceId: z.string().uuid(),

	collaboratorId: z.string().uuid().optional(),
	managerId: z.string().uuid().optional(),
	bankTellerId: z.string().uuid().optional(),
	updatedAt: z.coerce.date().nullable(),

	orderType: orderTypeSchema,
	paymentMethod: paymentMethodSchema,
	items: itemsSchema,
});

export const updateOrderStatusRequestBodySchema = z.object({
	id: z.string(),
	status: z.number(),
});

export const cancelOrderRequestBodySchema = z.object({
	orderId: z.string().uuid(),
	operatorId: z.string().uuid(),
	managerId: z.string().uuid(),
	bankTellerId: z.string().uuid(),
	cancellantionReason: z.string(),
});
