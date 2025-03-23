import { Store } from "../../../../domain/entities/store";
import { Restaurantes as PrismaStore, Prisma } from "@prisma/client";

export class PrismaStoreMapper {
	static toDomain(raw: PrismaStore): Store {
		return Store.create({
			id: raw.Id,
			name: raw.Nome,
			nebulaCode: raw.NebulaCode,
			accessKey: raw.ChaveAcesso,
			backgroundImage: raw.ImagemFundo,
			logoImage: raw.ImagemLogo,
			phone: raw.Telefone,
			parameterId: raw.Parametro_Id,
			createdAt: raw.CriadoEm,
			updatedAt: raw.AlteradoEm,
			cnpj: raw.CNPJ,
			merchantId: raw.MerchantId,
			merchantPassword: raw.MerchantPwd,
			minimumTime: raw.TempoMinimo,
			isClosed: raw.Fechado,
			lastRequest: raw.UltimaRequest,
			isActive: raw.Ativo,
			synchronizedAt: raw.SincronizadoEm,
			facebook: raw.Facebook,
			instagram: raw.Instagram,
			segment: raw.Segmento,
			softwareHouseId: raw.SoftwareHouse_Id,
			licenseExpiration: raw.VencimentoLicensa,
			pdvFlowVersion: raw.VersaoPDVFlow,
			email: raw.Email,
			alias: raw.Alias,
			pdvFlowDbVersion: raw.VersaoDBPDVFlow,
			scheduledPauseStart: raw.InicioPausaProgramada,
			scheduledPauseEnd: raw.FimPausaProgramada,
		});
	}

	static toPrisma(store: Store): Prisma.RestaurantesUncheckedCreateInput {
		return {
			Id: store.id,
			Nome: store.name,
			NebulaCode: store.nebulaCode,
			ChaveAcesso: store.accessKey,
			ImagemFundo: store.backgroundImage,
			ImagemLogo: store.logoImage,
			Telefone: store.phone,
			Parametro_Id: store.parameterId,
			CriadoEm: store.createdAt,
			AlteradoEm: store.updatedAt,
			CNPJ: store.cnpj,
			MerchantId: store.merchantId,
			MerchantPwd: store.merchantPassword,
			TempoMinimo: store.minimumTime,
			Fechado: store.isClosed,
			UltimaRequest: store.lastRequest,
			Ativo: store.isActive,
			SincronizadoEm: store.synchronizedAt,
			Facebook: store.facebook,
			Instagram: store.instagram,
			Segmento: store.segment,
			SoftwareHouse_Id: store.softwareHouseId,
			VencimentoLicensa: store.licenseExpiration,
			VersaoPDVFlow: store.pdvFlowVersion,
			Email: store.email,
			Alias: store.alias,
			VersaoDBPDVFlow: store.pdvFlowDbVersion,
			InicioPausaProgramada: store.scheduledPauseStart,
			FimPausaProgramada: store.scheduledPauseEnd,
		};
	}
}
