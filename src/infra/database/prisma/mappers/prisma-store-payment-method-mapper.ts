import { StorePaymentMethod } from "../../../../domain/entities/store-payment-method";
import {
	RestauranteFormaPagamento as PrismaStorePaymentMethod,
	Prisma,
} from "@prisma/client";

export class PrismaStorePaymentMethodMapper {
	static toDomain(raw: PrismaStorePaymentMethod): StorePaymentMethod {
		return StorePaymentMethod.create({
			id: raw.Id,
			storeId: raw.RestauranteId,
			paymentMethodId: raw.FormaPagamentoId,
			status: raw.Status,
			createdAt: raw.CriadoEm,
			updatedAt: raw.AlteradoEm,
			pixCounterPenseBankToken: raw.TokenPixBalcaoPenseBank,
			pixPenseBankTransactionPercentage: raw.PercentTransactionPixPenseBank
				? raw.PercentTransactionPixPenseBank.toNumber()
				: null,
			pixPenseBankTimeLife: raw.TimeLifePixPenseBank,
			serviceFee: raw.TaxaServico ? raw.TaxaServico.toNumber() : null,
			appDelivery: raw.AppDelivery,
			pdvFlow: raw.PDVFlow,
			selfServiceKiosk: raw.TotemAutoAtendimento,
			pdvMobile: raw.PDVMobile,
		});
	}

	static toPrisma(
		storePaymentMethod: StorePaymentMethod
	): Prisma.RestauranteFormaPagamentoUncheckedCreateInput {
		return {
			Id: storePaymentMethod.id,
			RestauranteId: storePaymentMethod.storeId,
			FormaPagamentoId: storePaymentMethod.paymentMethodId,
			Status: storePaymentMethod.status,
			CriadoEm: storePaymentMethod.createdAt,
			AlteradoEm: storePaymentMethod.updatedAt,
			TokenPixBalcaoPenseBank: storePaymentMethod.pixCounterPenseBankToken,
			PercentTransactionPixPenseBank:
				storePaymentMethod.pixPenseBankTransactionPercentage,
			TimeLifePixPenseBank: storePaymentMethod.pixPenseBankTimeLife,
			TaxaServico: storePaymentMethod.serviceFee,
			AppDelivery: storePaymentMethod.appDelivery,
			PDVFlow: storePaymentMethod.pdvFlow,
			TotemAutoAtendimento: storePaymentMethod.selfServiceKiosk,
			PDVMobile: storePaymentMethod.pdvMobile,
		};
	}
}
