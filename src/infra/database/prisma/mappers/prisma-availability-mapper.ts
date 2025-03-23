import { Availability } from "../../../../domain/entities/availability";
import { Disponibilidades as PrismaAvailability, Prisma } from "@prisma/client";

export class PrismaAvailabilityMapper {
	static toDomain(raw: PrismaAvailability): Availability {
		return Availability.create({
			id: raw.Id,
			storeId: raw.RestauranteId,
			start: raw.Inicio,
			end: raw.Fim,
			createdAt: raw.CriadoEm,
			updatedAt: raw.AlteradoEm,
			menuCategoryId: raw.CardapioCategoriaId,
			menuItemId: raw.CardapioItemId,
			endDay: raw.DiaFim,
			startDay: raw.DiaInicio,
			startPeriod: raw.PeriodoInicio,
			endPeriod: raw.PeriodoFinal,
			couponId: raw.CupomId,
		});
	}

	static toPrisma(
		availability: Availability
	): Prisma.DisponibilidadesUncheckedCreateInput {
		return {
			Id: availability.id,
			RestauranteId: availability.storeId,
			Inicio: availability.start,
			Fim: availability.end,
			CriadoEm: availability.createdAt,
			AlteradoEm: availability.updatedAt,
			CardapioCategoriaId: availability.menuCategoryId,
			CardapioItemId: availability.menuItemId,
			DiaFim: availability.endDay,
			DiaInicio: availability.startDay,
			PeriodoInicio: availability.startPeriod,
			PeriodoFinal: availability.endPeriod,
			CupomId: availability.couponId,
		};
	}
}
