import { InMemoryDeviceTypesRepository } from "../../../test/repositories/in-memory-device-types-repository";
import { GetDeviceTypesUseCase } from "./get-device-types";
import { makeDeviceType } from "../../../test/factories/make-device-type";

let inMemoryDeviceTypesRepository: InMemoryDeviceTypesRepository;
let sut: GetDeviceTypesUseCase;

describe("Get Device Types Use Case", () => {
	beforeEach(() => {
		inMemoryDeviceTypesRepository = new InMemoryDeviceTypesRepository();
		sut = new GetDeviceTypesUseCase(inMemoryDeviceTypesRepository);
	});

	it("should return all device types", async () => {
		const deviceType1 = makeDeviceType({
			id: "71c96beb-fa80-11ef-b303-0242c0a81417",
			description: "PDVFlow",
			code: "FLOW",
			isActive: 1,
		});
		const deviceType2 = makeDeviceType({
			id: "720e46a4-fa80-11ef-b303-0242c0a81417",
			description: "Totem Auto-Atendimento",
			code: "TOTEM",
			isActive: 1,
		});

		inMemoryDeviceTypesRepository.deviceTypes.push(deviceType1, deviceType2);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual([
			{
				id: "71c96beb-fa80-11ef-b303-0242c0a81417",
				description: "PDVFlow",
				code: "FLOW",
				isActive: 1,
			},
			{
				id: "720e46a4-fa80-11ef-b303-0242c0a81417",
				description: "Totem Auto-Atendimento",
				code: "TOTEM",
				isActive: 1,
			},
		]);
	});

	it("should return null if no device types exist", async () => {
		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual([]);
	});
});
