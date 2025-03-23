import { LaunchType } from "../../../../domain/entities/launch-type";
import { TipoLancamento as PrismaLaunchType, Prisma } from "@prisma/client";

export class PrismaLaunchTypeMapper {
	static toDomain(raw: PrismaLaunchType): LaunchType {
		return LaunchType.create({
			id: raw.Id,
			code: raw.Codigo,
			description: raw.DESCRICAO,
		});
	}

	static toPrisma(
		launchType: LaunchType
	): Prisma.TipoLancamentoUncheckedCreateInput {
		return {
			Id: launchType.id,
			Codigo: launchType.code,
			DESCRICAO: launchType.description,
		};
	}
}
