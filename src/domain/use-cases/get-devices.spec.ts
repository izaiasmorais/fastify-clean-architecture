import { makeDevice } from "../../../test/factories/make-device";
import { InMemoryDevicesRepository } from "../../../test/repositories/in-memory-devices-repository";
import { GetDevicesUseCase } from "./get-devices";

let inMemoryDevicesRepository: InMemoryDevicesRepository;
let sut: GetDevicesUseCase;

describe("Get Devices Use Case", () => {
	beforeEach(() => {
		inMemoryDevicesRepository = new InMemoryDevicesRepository();
		sut = new GetDevicesUseCase(inMemoryDevicesRepository);
	});

	it("should return paginated devices", async () => {
		const storeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

		for (let i = 0; i < 12; i++) {
			const device = makeDevice({
				storeId,
				deviceName: `Device ${i}`,
				active: i % 2 === 0,
			});
			inMemoryDevicesRepository.devices.push(device);
		}

		const result = await sut.execute({
			storeId,
			currentPage: 1,
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.currentPageNumber).toBe(1);
			expect(result.value.devices).toHaveLength(12);
			expect(result.value.totalPage).toBe(1);
			expect(result.value.totalRecord).toBe(12);
		}
	});

	it("should return empty devices list when no devices exist", async () => {
		const result = await sut.execute({
			storeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			currentPage: 1,
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.devices).toHaveLength(0);
			expect(result.value.totalRecord).toBe(0);
		}
	});

	it("should filter devices by active status", async () => {
		const storeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

		for (let i = 0; i < 10; i++) {
			const device = makeDevice({
				storeId,
				deviceName: `Device ${i}`,
				active: i < 5,
			});
			inMemoryDevicesRepository.devices.push(device);
		}

		const result = await sut.execute({
			storeId,
			currentPage: 1,
			isActive: true,
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.devices).toHaveLength(5);
			expect(
				result.value.devices.every((device) => device.active)
			).toBeTruthy();
		}
	});

	it("should filter devices by date range", async () => {
		const storeId = "store-123";
		const baseDate = new Date("2023-01-01");

		for (let i = 0; i < 6; i++) {
			const deviceDate = new Date(baseDate);
			deviceDate.setMonth(baseDate.getMonth() + i);

			const device = makeDevice({
				storeId,
				deviceName: `Device ${i}`,
				createdAt: deviceDate,
			});
			inMemoryDevicesRepository.devices.push(device);
		}

		const firstCreatedAt = new Date("2023-02-01");
		const lastCreatedAt = new Date("2023-04-01");

		const result = await sut.execute({
			storeId,
			currentPage: 1,
			firstCreatedAt,
			lastCreatedAt,
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.devices).toHaveLength(3);
			expect(
				result.value.devices.every(
					(device) =>
						device.createdAt >= firstCreatedAt &&
						device.createdAt <= lastCreatedAt
				)
			).toBeTruthy();
		}
	});

	it("should handle second page correctly", async () => {
		const storeId = "store-123";

		for (let i = 0; i < 20; i++) {
			const device = makeDevice({
				storeId,
				deviceName: `Device ${i}`,
			});
			inMemoryDevicesRepository.devices.push(device);
		}

		const result = await sut.execute({
			storeId,
			currentPage: 1,
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.currentPageNumber).toBe(1);
			expect(result.value.totalPage).toBe(1);
			expect(result.value.devices).toHaveLength(20);
			expect(result.value.totalRecord).toBe(20);
			expect(result.value.totalRecordPerPage).toBe(30);
		}
	});
});
