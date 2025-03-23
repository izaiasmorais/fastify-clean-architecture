import { InMemoryDevicesRepository } from "../../../test/repositories/in-memory-devices-repository";
import { UpdateDeviceUseCase } from "./update-device";
import { makeDevice } from "../../../test/factories/make-device";
import { CustomError } from "../../core/errors/custom-error";

let inMemoryDevicesRepository: InMemoryDevicesRepository;
let sut: UpdateDeviceUseCase;

describe("Update Device Use Case", () => {
	beforeEach(() => {
		inMemoryDevicesRepository = new InMemoryDevicesRepository();
		sut = new UpdateDeviceUseCase(inMemoryDevicesRepository);
	});

	it("should update an existing device successfully", async () => {
		const deviceId = "680b5ab6-33cd-42dd-b87e-b0cd0756aaf6";
		const storeId = "40476672-0a70-43c1-9445-c36f5bc7fa87";

		const device = makeDevice({
			id: deviceId,
			storeId: storeId,
			deviceName: "Device 1",
			alias: "Device 1",
		});

		inMemoryDevicesRepository.devices.push(device);

		const updateData = {
			storeId: storeId,
			id: deviceId,
			deviceName: "Device 2",
			alias: "Device 2",
			brand: "New Brand",
		};

		const result = await sut.execute(updateData);

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toBeNull();
		expect(inMemoryDevicesRepository.devices[0]).toMatchObject({
			deviceName: "Device 2",
			alias: "Device 2",
			brand: "New Brand",
		});
		expect(inMemoryDevicesRepository.devices[0].updatedAt).toBeInstanceOf(Date);
	});

	it("should return an error if device is not found", async () => {
		const deviceId = "680b5ab6-33cd-42dd-b87e-b0cd0756aaf6";
		const storeId = "40476672-0a70-43c1-9445-c36f5bc7fa87";

		const updateData = {
			storeId: storeId,
			id: deviceId,
			deviceName: "Updated Name",
		};

		const result = await sut.execute(updateData);

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(
			new CustomError(404, ["Dispositivo não encontrado"])
		);
	});
});
