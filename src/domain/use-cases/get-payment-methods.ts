import { CustomError } from "../../core/errors/custom-error";
import { left, right, type Either } from "../../core/types/either";
import type { DevicesRepository } from "../repositories/devices-repository";
import type {
	PaymentMethodsResponse,
	StorePaymentMethodsRepository,
} from "../repositories/store-payment-methods-repository";

type GetPaymentMethodsResponse = Either<
	CustomError,
	PaymentMethodsResponse[] | null
>;

export class GetPaymentMethodsUseCase {
	constructor(
		private storePaymentMethodsRepository: StorePaymentMethodsRepository,
		private devicesRepository: DevicesRepository
	) {}

	async execute(
		storeId: string,
		deviceId: string
	): Promise<GetPaymentMethodsResponse> {
		const device = await this.devicesRepository.findById(storeId, deviceId);

		if (!device) {
			return left(new CustomError(404, ["Dispositivo não encontrado"]));
		}

		if (!device.deviceType) {
			return left(new CustomError(404, ["Tipo de dispositivo não encontrado"]));
		}

		const devicetype = device.deviceType.code;

		const deviceTypes = ["flow", "totem", "mob", "app"];

		if (deviceTypes.indexOf(devicetype.toLocaleLowerCase()) === -1) {
			return left(new CustomError(400, ["Credenciais Inválidas"]));
		}

		const paymentMethods =
			await this.storePaymentMethodsRepository.findByDeviceType(
				storeId,
				devicetype
			);

		return right(paymentMethods);
	}
}
