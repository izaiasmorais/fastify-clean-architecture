import { Launch } from "../../../../domain/entities/launch";
import { Lancamento as PrismaLaunch, Prisma } from "@prisma/client";

export class PrismaLaunchMapper {
	static toDomain(raw: PrismaLaunch): Launch {
		return Launch.create({
			storeId: raw.RestauranteId,
			id: raw.Id,
			value: raw.Valor.toNumber(),
			launchTypeId: raw.TipoLancamentoId,
			paymentMethodId: raw.FormaPagamentoId,
			createdAt: raw.CriadoEm,
			materaTransactionId: raw.MateraTransactionId,
			deviceId: raw.DispositivoId,
			bankTellerId: raw.CaixaId,
			operatorId: raw.OperadorId,
			orderId: raw.PedidoId,
			destinationLaunchId: raw.LancamentoDestinoId,
			originLaunchId: raw.LancamentoOrigemId,
			transferredById: raw.TransferidoPorId,
			transferredAt: raw.TransferidoEm,
			discountValue: raw.ValorDesconto ? raw.ValorDesconto.toNumber() : null,
			discountPercentage: raw.PercentualDesconto
				? raw.PercentualDesconto.toNumber()
				: null,
			description: raw.Descricao,
			pixHash: raw.HashPix,
			pixAlias: raw.AliasPix,
		});
	}

	static toPrisma(launch: Launch): Prisma.LancamentoUncheckedCreateInput {
		return {
			RestauranteId: launch.storeId,
			Id: launch.id,
			Valor: launch.value,
			TipoLancamentoId: launch.launchTypeId,
			FormaPagamentoId: launch.paymentMethodId,
			CriadoEm: launch.createdAt,
			MateraTransactionId: launch.materaTransactionId,
			DispositivoId: launch.deviceId,
			CaixaId: launch.bankTellerId,
			OperadorId: launch.operatorId,
			PedidoId: launch.orderId,
			LancamentoDestinoId: launch.destinationLaunchId,
			LancamentoOrigemId: launch.originLaunchId,
			TransferidoPorId: launch.transferredById,
			TransferidoEm: launch.transferredAt,
			ValorDesconto: launch.discountValue,
			PercentualDesconto: launch.discountPercentage,
			Descricao: launch.description,
			HashPix: launch.pixHash,
			AliasPix: launch.pixAlias,
		};
	}
}
