interface DeviceFromPrisma {
	Id: string;
	RestauranteId: string;
	TipoDispositivoId: string;
	Alias: string;
	NebulaCode: string;
	NomeDispositivo: string;
	CriadoEm: Date;
	AlteradoEm?: Date | string | null;
	NumeroSerie?: string | null;
	Marca?: string | null;
	Modelo?: string | null;
	SistemaOperacional?: string | null;
	VersaoOS?: string | null;
	Memoria?: string | null;
	Processador?: string | null;
	MacAddressRede?: string | null;
	HardDiskSerial?: string | null;
	HardDiskTotal?: string | null;
	HardDiskLivre?: string | null;
	IPAddress?: string | null;
	IMEI?: string | null;
	TipoConexao?: string | null;
	UltimoAcesso?: Date | string | null;
	Ativo: boolean;
}

interface DeviceToHttp {
	id: string;
	restaurantId: string;
	deviceTypeId: string;
	alias: string;
	nebulaCode: string;
	deviceName: string;
	createdAt: Date;
	updatedAt?: string | Date | null;
	serialNumber?: string | null;
	brand?: string | null;
	model?: string | null;
	operatingSystem?: string | null;
	osVersion?: string | null;
	memory?: string | null;
	processor?: string | null;
	macAddressNetwork?: string | null;
	hardDiskSerial?: string | null;
	hardDiskTotal?: string | null;
	hardDiskFree?: string | null;
	ipAddress?: string | null;
	imei?: string | null;
	connectionType?: string | null;
	lastAccess?: string | Date | null;
	isActive: boolean;
}

export function deviceToHttp(device: DeviceFromPrisma): DeviceToHttp {
	return {
		id: device.Id,
		restaurantId: device.RestauranteId,
		deviceTypeId: device.TipoDispositivoId,
		alias: device.Alias,
		nebulaCode: device.NebulaCode,
		deviceName: device.NomeDispositivo,
		createdAt: device.CriadoEm,
		updatedAt: device.AlteradoEm,
		serialNumber: device.NumeroSerie ?? null,
		brand: device.Marca ?? null,
		model: device.Modelo ?? null,
		operatingSystem: device.SistemaOperacional ?? null,
		osVersion: device.VersaoOS ?? null,
		memory: device.Memoria ?? null,
		processor: device.Processador ?? null,
		macAddressNetwork: device.MacAddressRede ?? null,
		hardDiskSerial: device.HardDiskSerial ?? null,
		hardDiskTotal: device.HardDiskTotal ?? null,
		hardDiskFree: device.HardDiskLivre ?? null,
		ipAddress: device.IPAddress ?? null,
		imei: device.IMEI ?? null,
		connectionType: device.TipoConexao ?? null,
		lastAccess: device.UltimoAcesso,
		isActive: device.Ativo,
	};
}
