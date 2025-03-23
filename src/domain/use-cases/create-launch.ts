import { CustomError } from "../../core/errors/custom-error";
import { left, right, type Either } from "../../core/types/either";
import type { BankTellersRepository } from "../repositories/bank-tellers-repository";
import type { CollaboratorsRepository } from "../repositories/collaborators-repository";
import type { LaunchTypesRepository } from "../repositories/launch-types-repository";
import type { OrdersRepository } from "../repositories/orders-repository";
import type { StorePaymentMethodsRepository } from "../repositories/store-payment-methods-repository";
import type { DevicesRepository } from "../repositories/devices-repository";
import type { LaunchesRepository } from "../repositories/launches-repository";
import { Launch } from "../entities/launch";

type CreateLaunchRequest = {
	storeId: string;
	id: string;
	value: number;
	launchTypeId: string;
	paymentMethodId: string;
	createdAt: Date;
	materaTransactionId?: string | null;
	deviceId?: string | null;
	bankTellerId?: string | null;
	operatorId?: string | null;
	orderId?: string | null;
	destinationLaunchId?: string | null;
	originLaunchId?: string | null;
	transferredById?: string | null;
	transferredAt?: Date | null;
	discountValue?: number | null;
	discountPercentage?: number | null;
	description?: string | null;
	pixHash?: string | null;
	pixAlias?: string | null;
};

type CreateLaunchUseCaseResponse = Either<CustomError, {}>;

export class CreateLaunchUseCase {
	constructor(
		private launchesRepository: LaunchesRepository,
		private devicesRepository: DevicesRepository,
		private bankTellersRepository: BankTellersRepository,
		private collaboratorsRepository: CollaboratorsRepository,
		private ordersRepository: OrdersRepository,
		private storePaymentMethodsRepository: StorePaymentMethodsRepository,
		private launchTypesRepository: LaunchTypesRepository
	) {}

	async execute(
		body: CreateLaunchRequest
	): Promise<CreateLaunchUseCaseResponse> {
		const errors: string[] = [];

		if (body.deviceId) {
			const doesDeviceExist = await this.devicesRepository.findById(
				body.storeId,
				body.deviceId
			);
			if (!doesDeviceExist) errors.push("O dispositivo não existe");
		}

		if (body.bankTellerId) {
			const doesBankTellerExist = await this.bankTellersRepository.findById(
				body.storeId,
				body.bankTellerId
			);
			if (!doesBankTellerExist) errors.push("O caixa não existe");
		}

		if (body.operatorId) {
			const doesOperatorExist = await this.collaboratorsRepository.findById(
				body.storeId,
				body.operatorId
			);
			if (!doesOperatorExist) errors.push("O operador não existe");
		}

		if (body.transferredById) {
			const doesTransferredByExist =
				await this.collaboratorsRepository.findById(
					body.storeId,
					body.transferredById
				);
			if (!doesTransferredByExist)
				errors.push("O operador que está transferindo não existe");
		}

		if (body.orderId) {
			const doesOrderExist = await this.ordersRepository.findById(
				body.storeId,
				body.orderId
			);
			if (!doesOrderExist) errors.push("O pedido não existe");
		}

		if (body.paymentMethodId) {
			const doesPaymentMethodExist =
				await this.storePaymentMethodsRepository.findById(
					body.storeId,
					body.paymentMethodId
				);
			if (!doesPaymentMethodExist)
				errors.push("A forma de pagamento não existe");
		}

		if (body.launchTypeId) {
			const doesLaunchTypeExist = await this.launchTypesRepository.findById(
				body.launchTypeId
			);
			if (!doesLaunchTypeExist) errors.push("O tipo de lançamento não existe");
		}

		if (body.originLaunchId) {
			const doesOriginLaunchExist =
				await this.launchesRepository.findLaunchByOriginId(
					body.storeId,
					body.originLaunchId
				);
			if (!doesOriginLaunchExist)
				errors.push("A origem do lançamento não existe");
		}

		if (body.destinationLaunchId) {
			const doesDestinationLaunchExist =
				await this.launchesRepository.findLaunchByDestinationId(
					body.storeId,
					body.destinationLaunchId
				);
			if (!doesDestinationLaunchExist)
				errors.push("O destino do lançamento não existe");
		}

		if (errors.length > 0) {
			return left(new CustomError(404, errors));
		}

		const doesLaunchExist = await this.launchesRepository.findById(
			body.storeId,
			body.id
		);

		if (doesLaunchExist) {
			return left(new CustomError(409, ["O lançamento já existe"]));
		}

		const launch = Launch.create(body);

		await this.launchesRepository.create(launch);

		return right({});
	}
}
