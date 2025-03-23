import { InMemoryStorePaymentMethodsRepository } from "../../../test/repositories/in-memory-store-payment-methods-repository";
import { GetPaymentMethodsUseCase } from "./get-payment-methods";
import { makeStorePaymentMethod } from "../../../test/factories/make-store-payment-method";
import { InMemoryDevicesRepository } from "../../../test/repositories/in-memory-devices-repository";
import { makeDevice } from "../../../test/factories/make-device";
import { DeviceType } from "../entities/device-type";

let inMemoryStorePaymentMethodsRepository: InMemoryStorePaymentMethodsRepository;
let inMemoryDevicesRepository: InMemoryDevicesRepository;
let sut: GetPaymentMethodsUseCase;

describe("Get Payment Methods Use Case", () => {
	beforeEach(() => {
		inMemoryDevicesRepository = new InMemoryDevicesRepository();
		inMemoryStorePaymentMethodsRepository =
			new InMemoryStorePaymentMethodsRepository();

		sut = new GetPaymentMethodsUseCase(
			inMemoryStorePaymentMethodsRepository,
			inMemoryDevicesRepository
		);
	});

	it("should return payment methods for valid device type", async () => {
		const storeId = "21840786-9506-4bcd-b2db-4eb2c87770ee";
		const deviceId = "789dce89-c98b-4e38-8266-5e71d0720226";
		const paymentMethodId = "c274bb29-0acd-4272-8fc0-21274f0c0dc4";
		const storePaymentMethod = makeStorePaymentMethod({
			storeId,
			paymentMethodId,
			pdvFlow: true,
		});
		const device = makeDevice({
			id: deviceId,
			storeId,
			deviceType: DeviceType.create({
				id: "7a85112a-8844-46c0-ae94-71a1b06bc726",
				code: "FLOW",
				description: "PDVFlow",
				isActive: 1,
			}),
		});
		
		inMemoryDevicesRepository.devices.push(device);
		inMemoryStorePaymentMethodsRepository.paymentMethods.push({
			id: paymentMethodId,
			paymentMethodType: 1,
			code: 1,
			description: "Pix",
		});
		inMemoryStorePaymentMethodsRepository.storePaymentMethods.push(
			storePaymentMethod
		);

		const result = await sut.execute(storeId, deviceId);

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual([
			{
				id: storePaymentMethod.id,
				tokenPix: storePaymentMethod.pixCounterPenseBankToken,
				percentTransactionFee:
					storePaymentMethod.pixPenseBankTransactionPercentage,
				pixTimeLife: storePaymentMethod.pixPenseBankTimeLife,
				description: "Pix",
				code: 1,
				paymentType: 1,
			},
		]);
	});
});
