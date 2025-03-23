import { InMemoryDevicesRepository } from "../../../test/repositories/in-memory-devices-repository";
import { CustomError } from "../../core/errors/custom-error";
import { generateUUID } from "../../core/utils/generate-uuid";
import { CreateDeviceUseCase } from "./create-device";

let inMemoryDevicesRepository: InMemoryDevicesRepository;
let sut: CreateDeviceUseCase;

describe("Register Device Use Case", () => {
	beforeEach(() => {
		inMemoryDevicesRepository = new InMemoryDevicesRepository();
		sut = new CreateDeviceUseCase(inMemoryDevicesRepository);
	});

	it("should be able to create a device", async () => {
		const deviceId = generateUUID();
		const typeDeviceId = generateUUID();
		const storeId = generateUUID();

		const requestData = {
			storeId,
			id: deviceId,
			typeDeviceId,
			deviceName: "Test Device",
			serialNumber: "SN123",
		};

		const result = await sut.execute(requestData);

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toBeNull();
		expect(inMemoryDevicesRepository.devices).toHaveLength(1);
		expect(inMemoryDevicesRepository.devices[0]).toMatchObject({
			id: deviceId,
			storeId: storeId,
			deviceTypeId: typeDeviceId,
			nebulaCode: "",
			deviceName: "Test Device",
			alias: "",
			serialNumber: "SN123",
			brand: null,
			model: null,
			operatingSystem: null,
			osVersion: null,
			memory: null,
			processor: null,
			networkMacAddress: null,
			hardDiskSerial: null,
			hardDiskTotal: null,
			hardDiskFree: null,
			ipAddress: null,
			imei: null,
			connectionType: null,
			lastAccess: null,
			active: true,
		});
		expect(inMemoryDevicesRepository.devices[0].createdAt).toBeInstanceOf(Date);
		expect(inMemoryDevicesRepository.devices[0].updatedAt).toBeNull();
	});

	it("should return an error when trying to create a device that already exists", async () => {
		const deviceId = generateUUID();
		const typeDeviceId = generateUUID();
		const storeId = generateUUID();

		const initialRequestData = {
			storeId,
			id: deviceId,
			typeDeviceId,
			codeNebula: "NEB123",
			deviceName: "Test Device",
			alias: "Test Alias",
			serialNumber: "SN123",
		};

		await sut.execute(initialRequestData);

		const duplicateRequestData = {
			storeId,
			id: deviceId,
			typeDeviceId: generateUUID(),
			codeNebula: "NEB456",
			deviceName: "Another Device",
			alias: "Another Alias",
			serialNumber: "SN456",
		};

		const result = await sut.execute(duplicateRequestData);

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(
			new CustomError(409, ["Dispositivo já cadastrado"])
		);
		expect(inMemoryDevicesRepository.devices).toHaveLength(1);
	});
});
