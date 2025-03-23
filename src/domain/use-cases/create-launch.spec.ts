import { InMemoryBankTellersRepository } from "../../../test/repositories/in-memory-bank-tellers-repository";
import { InMemoryCollaboratorsRepository } from "../../../test/repositories/in-memory-collaborators-repository";
import { InMemoryLaunchTypesRepository } from "../../../test/repositories/in-memory-launch-types-repository";
import { InMemoryOrdersRepository } from "../../../test/repositories/in-memory-orders-repository";
import { InMemoryStorePaymentMethodsRepository } from "../../../test/repositories/in-memory-store-payment-methods-repository";
import { InMemoryDevicesRepository } from "../../../test/repositories/in-memory-devices-repository";
import { InMemoryLaunchesRepository } from "../../../test/repositories/in-memory-launches-repository";

import { makeLaunch } from "../../../test/factories/make-launch";
import { makeDevice } from "../../../test/factories/make-device";
import { makeBankTeller } from "../../../test/factories/make-bank-teller";
import { makeCollaborator } from "../../../test/factories/make-collaborator";
import { makeOrder } from "../../../test/factories/make-order";
import { makeStorePaymentMethod } from "../../../test/factories/make-store-payment-method";
import { makeLaunchType } from "../../../test/factories/make-launch-type";
import { CreateLaunchUseCase } from "./create-launch";
import { CustomError } from "../../core/errors/custom-error";

let inMemoryLaunchesRepository: InMemoryLaunchesRepository;
let inMemoryDevicesRepository: InMemoryDevicesRepository;
let inMemoryBankTellersRepository: InMemoryBankTellersRepository;
let inMemoryCollaboratorsRepository: InMemoryCollaboratorsRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryStorePaymentMethodsRepository: InMemoryStorePaymentMethodsRepository;
let inMemoryLaunchTypesRepository: InMemoryLaunchTypesRepository;
let sut: CreateLaunchUseCase;

describe("Create Launch Use Case", () => {
	beforeEach(() => {
		inMemoryLaunchesRepository = new InMemoryLaunchesRepository();
		inMemoryDevicesRepository = new InMemoryDevicesRepository();
		inMemoryBankTellersRepository = new InMemoryBankTellersRepository();
		inMemoryCollaboratorsRepository = new InMemoryCollaboratorsRepository();
		inMemoryOrdersRepository = new InMemoryOrdersRepository();
		inMemoryStorePaymentMethodsRepository =
			new InMemoryStorePaymentMethodsRepository();
		inMemoryLaunchTypesRepository = new InMemoryLaunchTypesRepository();
		sut = new CreateLaunchUseCase(
			inMemoryLaunchesRepository,
			inMemoryDevicesRepository,
			inMemoryBankTellersRepository,
			inMemoryCollaboratorsRepository,
			inMemoryOrdersRepository,
			inMemoryStorePaymentMethodsRepository,
			inMemoryLaunchTypesRepository
		);
	});

	it("should be able to create a launch", async () => {
		const storeId = "934453cd-3de8-45e7-a6a8-d7af99463248";

		const device = makeDevice({ storeId });
		const bankTeller = makeBankTeller({ storeId });
		const operator = makeCollaborator({ storeId });
		const order = makeOrder({ storeId });
		const paymentMethod = makeStorePaymentMethod({ storeId });
		const launchType = makeLaunchType();

		inMemoryDevicesRepository.devices.push(device);
		inMemoryBankTellersRepository.bankTellers.push(bankTeller);
		inMemoryCollaboratorsRepository.collaborators.push(operator);
		inMemoryOrdersRepository.orders.push(order);
		inMemoryStorePaymentMethodsRepository.storePaymentMethods.push(
			paymentMethod
		);
		inMemoryLaunchTypesRepository.launchTypes.push(launchType);

		const launch = makeLaunch({
			storeId,
			deviceId: device.id,
			bankTellerId: bankTeller.id,
			operatorId: operator.id,
			orderId: order.id,
			paymentMethodId: paymentMethod.id,
			launchTypeId: launchType.id,
			value: 100,
		});

		const result = await sut.execute(launch);

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({});
		expect(inMemoryLaunchesRepository.launches).toHaveLength(1);
	});

	it("should return an error if launch already exists", async () => {
		const storeId = "934453cd-3de8-45e7-a6a8-d7af99463248";

		const paymentMethod = makeStorePaymentMethod({ storeId });
		const launchType = makeLaunchType();
		const launch = makeLaunch({
			storeId,
			id: "launch-1",
			value: 100,
			launchTypeId: launchType.id,
			paymentMethodId: paymentMethod.id,
			createdAt: new Date(),
		});

		inMemoryStorePaymentMethodsRepository.storePaymentMethods.push(
			paymentMethod
		);
		inMemoryLaunchTypesRepository.launchTypes.push(launchType);
		inMemoryLaunchesRepository.launches.push(launch);

		const result = await sut.execute(launch);

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(
			new CustomError(409, ["O lançamento já existe"])
		);
	});

	it("should return errors if dependencies do not exist", async () => {
		const storeId = "934453cd-3de8-45e7-a6a8-d7af99463248";
		const launch = makeLaunch({
			storeId,
			deviceId: "device-1",
			bankTellerId: "bank-teller-1",
			operatorId: "operator-1",
			orderId: "order-1",
			paymentMethodId: "payment-method-1",
			launchTypeId: "launch-type-1",
			transferredById: "transferred-by-1",
			originLaunchId: "origin-1",
			destinationLaunchId: "destination-1",
		});

		const result = await sut.execute(launch);

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(CustomError);
		expect((result.value as CustomError).statusCode).toBe(404);
		expect((result.value as CustomError).errors).toEqual([
			"O dispositivo não existe",
			"O caixa não existe",
			"O operador não existe",
			"O operador que está transferindo não existe",
			"O pedido não existe",
			"A forma de pagamento não existe",
			"O tipo de lançamento não existe",
			"A origem do lançamento não existe",
			"O destino do lançamento não existe",
		]);
	});
});
