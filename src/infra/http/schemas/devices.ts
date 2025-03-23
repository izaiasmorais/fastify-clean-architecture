import { z } from "zod";

export const deviceSchema = z.object({
	id: z.string(),
	storeId: z.string(),
	deviceTypeId: z.string(),
	deviceName: z.string(),
	active: z.boolean(),
	alias: z.string().nullable(),
	nebulaCode: z.string().nullable(),
	createdAt: z.coerce.date().nullable(),
	updatedAt: z.coerce.date().nullable(),
	serialNumber: z.string().nullable(),
	brand: z.string().nullable(),
	model: z.string().nullable(),
	operatingSystem: z.string().nullable(),
	osVersion: z.string().nullable(),
	memory: z.string().nullable(),
	processor: z.string().nullable(),
	networkMacAddress: z.string().nullable(),
	hardDiskSerial: z.string().nullable(),
	hardDiskTotal: z.string().nullable(),
	hardDiskFree: z.string().nullable(),
	ipAddress: z.string().nullable(),
	imei: z.string().nullable(),
	connectionType: z.string().nullable(),
	lastAccess: z.coerce.date().nullable(),
});

export const getDevicesResponseBodySchema = z.object({
	totalRecord: z.number(),
	totalRecordPerPage: z.number(),
	totalPage: z.number(),
	currentPageNumber: z.number(),
	devices: z.array(deviceSchema),
});

export const createDeviceRequestBodySchema = z.object({
	id: z.string().uuid("O id deve ser um UUID"),
	typeDeviceId: z.string().uuid("O id do tipo do dispositivo deve ser um UUID"),
	deviceName: z.string().min(1, "O nome do dispositivo é obrigatório"),
	serialNumber: z.string().min(1, "O número de série é obrigatório"),

	macAddressNetwork: z.string().optional(),
	imei: z.string().optional(),
	brand: z.string().optional(),
	model: z.string().optional(),
	operatingSystem: z.string().optional(),
	osVersion: z.string().optional(),
	memory: z.string().optional(),
	processor: z.string().optional(),
	hardDiskSerial: z.string().optional(),
	hardDiskTotal: z.string().optional(),
	hardDiskFree: z.string().optional(),
	ipAddress: z.string().optional(),
	connectionType: z.string().optional(),
});

export const updateDeviceRequestBodySchema = z.object({
	id: z.string(),
	deviceName: z.string().optional(),
	alias: z.string().optional(),
	brand: z.string().optional(),
	model: z.string().optional(),
	operatingSystem: z.string().optional(),
	osVersion: z.string().optional(),
	memory: z.string().optional(),
	processor: z.string().optional(),
	hardDiskSerial: z.string().optional(),
	hardDiskTotal: z.string().optional(),
	hardDiskFree: z.string().optional(),
	ipAddress: z.string().optional(),
	connectionType: z.string().optional(),
});

export type UpdateDeviceRequestBody = z.infer<
	typeof updateDeviceRequestBodySchema
>;
