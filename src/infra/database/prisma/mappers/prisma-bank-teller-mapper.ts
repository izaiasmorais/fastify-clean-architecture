import { BankTeller } from "../../../../domain/entities/bank-teller";
import { Caixa as PrismaBankTeller, Prisma } from "@prisma/client";

export class PrismaBankTellerMapper {
	static toDomain(raw: PrismaBankTeller): BankTeller {
		return BankTeller.create({
			id: raw.Id,
			storeId: raw.RestauranteId,
			operatorId: raw.OperadorId,
			deviceId: raw.DispositivoId,
			session: raw.Sessao,
			offlineSession: raw.SessaoOffline,
			createdAt: raw.CriadoEm,
			openedAt: raw.AbertoEm,
			closedAt: raw.FechadoEm,
			openingAmount: raw.ValorAbertura.toNumber(),
			registeredAmount: raw.ValorRegistrado
				? raw.ValorRegistrado.toNumber()
				: null,
			drawerAmount: raw.ValorGaveta ? raw.ValorGaveta.toNumber() : null,
		});
	}

	static toPrisma(bankteller: BankTeller): Prisma.CaixaUncheckedCreateInput {
		return {
			Id: bankteller.id,
			RestauranteId: bankteller.storeId,
			OperadorId: bankteller.operatorId,
			DispositivoId: bankteller.deviceId,
			Sessao: bankteller.session,
			SessaoOffline: bankteller.offlineSession,
			CriadoEm: bankteller.createdAt,
			AbertoEm: bankteller.openedAt,
			FechadoEm: bankteller.closedAt,
			ValorAbertura: bankteller.openingAmount,
			ValorRegistrado: bankteller.registeredAmount,
			ValorGaveta: bankteller.drawerAmount,
		};
	}
}
