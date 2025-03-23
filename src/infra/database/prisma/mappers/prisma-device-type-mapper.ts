import { Prisma } from "@prisma/client";
import { DeviceType } from "../../../../domain/entities/device-type";

export class PrismaDeviceTypeMapper {
	static toDomain(raw: Prisma.TipoDispositivoGetPayload<{}>): DeviceType {
		return DeviceType.create({
			id: raw.Id,
			code: raw.Codigo,
			description: raw.Descricao,
			isActive: raw.Ativo ? 1 : 0,
		});
	}

	static toPrisma(
		deviceType: DeviceType
	): Prisma.TipoDispositivoUncheckedCreateInput {
		return {
			Id: deviceType.id,
			Codigo: deviceType.code,
			Descricao: deviceType.description,
			Ativo: deviceType.isActive === 1,
		};
	}
}
