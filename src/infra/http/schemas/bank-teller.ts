import { z } from "zod";

export const openBankTellerRequestBodySchema = z.object({
	id: z.string().uuid("Invalid UUID"),
	deviceId: z.string().uuid("Invalid UUID"),
	collaboratorId: z.string().uuid("Invalid UUID"),
	offlineSession: z.number(),
	openedAt: z.coerce.date(),
	openingValue: z.number(),
});

export const bankTellerResponseBodySchema = z.object({
	id: z.string().uuid(),
	session: z.number(),
	openedAt: z.date(),
	openingValue: z.number(),
	offlineSession: z.number().nullable(),
	closedAt: z.coerce.date().nullable(),
	registeredValue: z.number().nullable(),
	reportedValue: z.number().nullable(),
});

export const getBankTellerByIdParamsSchema = z.object({
	collaboratorId: z.string().uuid("Collaborator ID must be a valid UUID"),
	deviceId: z.string().uuid("Device ID must be a valid UUID"),
});

export const launchBankTeller = z.object({
	id: z.string().uuid("Invalid UUID"),
	paymentMethodId: z.string().uuid("Invalid UUID"),
	value: z.number(),
	tipo: z.enum(["F"]),
	description: z.string().optional(),
});

export const closeBankTellerRequestBodySchema = z.object({
	id: z.string().uuid("Invalid UUID"),
	closedAt: z.coerce.date(),
	registeredValue: z.number(),
	reportedValue: z.number(),
	launchBankTellers: z.array(launchBankTeller),
});
