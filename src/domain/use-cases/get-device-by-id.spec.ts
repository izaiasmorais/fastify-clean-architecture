import { makeDevice } from "../../../test/factories/make-device";
import { InMemoryDevicesRepository } from "../../../test/repositories/in-memory-devices-repository";
import { CustomError } from "../../core/errors/custom-error";
import { GetDeviceByIdUseCase } from "./get-device-by-id";

let inMemoryDevicesRepository: InMemoryDevicesRepository;
let sut: GetDeviceByIdUseCase;

describe("Get Device By Id Use Case", () => {
	beforeEach(() => {
		inMemoryDevicesRepository = new InMemoryDevicesRepository();
		sut = new GetDeviceByIdUseCase(inMemoryDevicesRepository);
	});

	it("should return device when it exists", async () => {
		const storeId = "789dce89-c98b-4e38-8266-5e71d0720226";
		const deviceId = "123abc45-67de-89f0-1234-56789abcdef0";
		const device = makeDevice({
			id: deviceId,
			storeId,
			deviceName: "Test Device",
			active: true,
		});

		inMemoryDevicesRepository.devices.push(device);

		const result = await sut.execute({
			storeId,
			deviceId,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			id: device.id,
			storeId: device.storeId,
			deviceTypeId: device.deviceTypeId,
			alias: device.alias,
			nebulaCode: device.nebulaCode,
			deviceName: device.deviceName,
			createdAt: device.createdAt,
			updatedAt: device.updatedAt,
			serialNumber: device.serialNumber,
			brand: device.brand,
			model: device.model,
			operatingSystem: device.operatingSystem,
			osVersion: device.osVersion,
			memory: device.memory,
			processor: device.processor,
			networkMacAddress: device.networkMacAddress,
			hardDiskSerial: device.hardDiskSerial,
			hardDiskTotal: device.hardDiskTotal,
			hardDiskFree: device.hardDiskFree,
			ipAddress: device.ipAddress,
			imei: device.imei,
			connectionType: device.connectionType,
			lastAccess: device.lastAccess,
			active: device.active,
			deviceType: device.deviceType,
		});
	});

	it("should return error when device is not found", async () => {
		const result = await sut.execute({
			storeId: "store-123",
			deviceId: "nonexistent-device-id",
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(
			new CustomError(404, ["Dispositivo não encontrado"])
		);
	});
});
