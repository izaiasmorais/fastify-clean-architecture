import { makeDevice } from "../../../test/factories/make-device";
import { InMemoryDevicesRepository } from "../../../test/repositories/in-memory-devices-repository";
import { CustomError } from "../../core/errors/custom-error";
import { GetDeviceBySerialNumberUseCase } from "./get-device-by-serial-number";

let inMemoryDevicesRepository: InMemoryDevicesRepository;
let sut: GetDeviceBySerialNumberUseCase;

describe("Get Store Device By Serial Number Use Case", () => {
	beforeEach(() => {
		inMemoryDevicesRepository = new InMemoryDevicesRepository();
		sut = new GetDeviceBySerialNumberUseCase(inMemoryDevicesRepository);
	});

	it("should return store device when it exists", async () => {
		const storeId = "789dce89-c98b-4e38-8266-5e71d0720226";
		const serialNumber = "SN123456";
		const device = makeDevice({
			storeId,
			serialNumber,
			deviceName: "Test Device",
			active: true,
		});

		inMemoryDevicesRepository.devices.push(device);

		const result = await sut.execute({
			storeId,
			serialNumber,
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
		});
	});

	it("should return error when store device is not found", async () => {
		const result = await sut.execute({
			storeId: "store-123",
			serialNumber: "NONEXISTENT",
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(
			new CustomError(400, ["Dispositivo não encontrado"])
		);
	});
});
