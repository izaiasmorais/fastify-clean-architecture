import type { FastifyInstance } from "fastify";
import { getDeviceTypes } from "./get-device-types.controller";
import { getDeviceById } from "./get-device-by-id.controller";
import { getDevices } from "./get-devices.controller";
import { createDevice } from "./create-device.controller";
import { updateDevice } from "./update-device.controller";
import { getDeviceBySerialNumber } from "./get-device-by-serial-number.controller";

export async function devicesRoutes(app: FastifyInstance) {
	app.register(getDeviceTypes);
	app.register(getDevices);
	app.register(createDevice);
	app.register(updateDevice);
	app.register(getDeviceById);
	app.register(getDeviceBySerialNumber);
}
