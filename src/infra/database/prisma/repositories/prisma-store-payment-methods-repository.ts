import type { StorePaymentMethod } from "../../../../domain/entities/store-payment-method";
import type {
	PaymentMethodsResponse,
	StorePaymentMethodsRepository,
} from "../../../../domain/repositories/store-payment-methods-repository";
import { PrismaStorePaymentMethodMapper } from "../mappers/prisma-store-payment-method-mapper";
import { prisma } from "../prisma";

export class PrismaStorePaymentMethodsRepository
	implements StorePaymentMethodsRepository
{
	async findById(
		storeId: string,
		id: string
	): Promise<StorePaymentMethod | null> {
		const storePaymentMethod =
			await prisma.restauranteFormaPagamento.findUnique({
				where: {
					RestauranteId: storeId,
					Id: id,
				},
			});

		if (!storePaymentMethod) {
			return null;
		}

		return PrismaStorePaymentMethodMapper.toDomain(storePaymentMethod);
	}

	async findByDeviceType(
		storeId: string,
		deviceType: string
	): Promise<PaymentMethodsResponse[] | null> {
		const deviceTypes = ["flow", "totem", "mob", "app"];
		const deviceTypesFilters = [
			"PDVFlow",
			"TotemAutoAtendimento",
			"PDVMobile",
			"AppDelivery",
		];
		const index = deviceTypes.indexOf(deviceType.toLocaleLowerCase());
		const deviceTypeFilter =
			index !== -1 ? { [deviceTypesFilters[index]]: true } : {};

		const paymentMethods = await prisma.restauranteFormaPagamento.findMany({
			where: {
				...deviceTypeFilter,
				RestauranteId: storeId,
			},
			select: {
				TokenPixBalcaoPenseBank: true,
				Id: true,
				PercentTransactionPixPenseBank: true,
				TimeLifePixPenseBank: true,
				FormasPagamento: {
					select: {
						Nome: true,
						Codigo: true,
						TipoFormaPagamento: true,
					},
				},
			},
		});

		if (!paymentMethods) {
			return null;
		}

		const paymentMethodsResponse: PaymentMethodsResponse[] = paymentMethods.map(
			(paymentMethod) => {
				return {
					id: paymentMethod.Id,
					code: paymentMethod.FormasPagamento.Codigo,
					description: paymentMethod.FormasPagamento.Nome,
					paymentType: paymentMethod.FormasPagamento.TipoFormaPagamento,
					percentTransactionFee: paymentMethod.PercentTransactionPixPenseBank
						? paymentMethod.PercentTransactionPixPenseBank?.toNumber()
						: null,
					pixTimeLife: paymentMethod.TimeLifePixPenseBank,
					tokenPix: paymentMethod.TokenPixBalcaoPenseBank,
				};
			}
		);

		return paymentMethodsResponse;
	}
}
