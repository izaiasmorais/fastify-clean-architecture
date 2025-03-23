import { Prisma } from "@prisma/client";
import { Device } from "../../../../domain/entities/device";
import { DeviceType } from "../../../../domain/entities/device-type";

export interface PrismaDevice
	extends Prisma.DispositivoLojaGetPayload<{
		include: {
			TipoDispositivo: {
				select: {
					Id: true;
					Codigo: true;
					Descricao: true;
					Ativo: true;
				};
			};
		};
	}> {}

export class PrismaDeviceMapper {
	static toDomain(raw: PrismaDevice): Device {
		return Device.create({
			id: raw.Id,
			storeId: raw.RestauranteId,
			deviceTypeId: raw.TipoDispositivoId,
			alias: raw.Alias,
			nebulaCode: raw.NebulaCode,
			deviceName: raw.NomeDispositivo,
			createdAt: raw.CriadoEm,
			updatedAt: raw.AlteradoEm,
			serialNumber: raw.NumeroSerie,
			brand: raw.Marca,
			model: raw.Modelo,
			operatingSystem: raw.SistemaOperacional,
			osVersion: raw.VersaoOS,
			memory: raw.Memoria,
			processor: raw.Processador,
			networkMacAddress: raw.MacAddressRede,
			hardDiskSerial: raw.HardDiskSerial,
			hardDiskTotal: raw.HardDiskTotal,
			hardDiskFree: raw.HardDiskLivre,
			ipAddress: raw.IPAddress,
			imei: raw.IMEI,
			connectionType: raw.TipoConexao,
			lastAccess: raw.UltimoAcesso,
			active: raw.Ativo,
			deviceType: DeviceType.create({
				id: raw.TipoDispositivo.Id,
				code: raw.TipoDispositivo.Codigo,
				description: raw.TipoDispositivo.Descricao,
				isActive: raw.TipoDispositivo.Ativo ? 1 : 0,
			}),
		});
	}

	static toPrisma(device: Device): Prisma.DispositivoLojaUncheckedCreateInput {
		return {
			Id: device.id,
			RestauranteId: device.storeId,
			TipoDispositivoId: device.deviceTypeId,
			Alias: device.alias,
			NebulaCode: device.nebulaCode,
			NomeDispositivo: device.deviceName,
			CriadoEm: device.createdAt,
			AlteradoEm: device.updatedAt,
			NumeroSerie: device.serialNumber,
			Marca: device.brand,
			Modelo: device.model,
			SistemaOperacional: device.operatingSystem,
			VersaoOS: device.osVersion,
			Memoria: device.memory,
			Processador: device.processor,
			MacAddressRede: device.networkMacAddress,
			HardDiskSerial: device.hardDiskSerial,
			HardDiskTotal: device.hardDiskTotal,
			HardDiskLivre: device.hardDiskFree,
			IPAddress: device.ipAddress,
			IMEI: device.imei,
			TipoConexao: device.connectionType,
			UltimoAcesso: device.lastAccess,
			Ativo: device.active,
		};
	}
}
