import { CustomError } from "../../core/errors/custom-error";
import { right, left, type Either } from "../../core/types/either";
import { adjustTimezone } from "../../core/utils/adjust-timezone";
import { Device } from "../entities/device";
import { DevicesRepository } from "../repositories/devices-repository";

export type CreateDeviceRequest = {
	storeId: string;
	id: string;
	typeDeviceId: string;
	deviceName: string;
	serialNumber: string;

	imei?: string;
	macAddressNetwork?: string;
	brand?: string;
	model?: string;
	memory?: string;
	processor?: string;
	ipAddress?: string;
	osVersion?: string;
	hardDiskFree?: string;
	hardDiskTotal?: string;
	connectionType?: string;
	hardDiskSerial?: string;
	operatingSystem?: string;
};

type CreateDeviceResponse = Either<CustomError, null>;

export class CreateDeviceUseCase {
	constructor(private devicesRepository: DevicesRepository) {}

	async execute(data: CreateDeviceRequest): Promise<CreateDeviceResponse> {
		const doesDeviceExist = await this.devicesRepository.findById(
			data.storeId,
			data.id
		);

		if (doesDeviceExist) {
			return left(new CustomError(409, ["Dispositivo já cadastrado"]));
		}

		if (data.imei) {
			const imeiExists = await this.devicesRepository.findByImei(
				data.storeId,
				data.imei
			);

			if (imeiExists) {
				return left(new CustomError(409, ["O IMEI já existe"]));
			}
		}

		if (data.serialNumber) {
			const serialNumberExists =
				await this.devicesRepository.findBySerialNumber(
					data.storeId,
					data.serialNumber
				);

			if (serialNumberExists) {
				return left(new CustomError(409, ["Número de série já existe"]));
			}
		}

		if (data.macAddressNetwork) {
			const macAddressExists = await this.devicesRepository.findByMacAddress(
				data.storeId,
				data.macAddressNetwork
			);

			if (macAddressExists) {
				return left(new CustomError(409, ["Endereço MAC já existe"]));
			}
		}

		const device = {
			storeId: data.storeId,
			id: data.id,
			deviceName: data.deviceName,
			deviceTypeId: data.typeDeviceId,
			createdAt: adjustTimezone(new Date()),
			imei: data.imei,
			serialNumber: data.serialNumber,
			networkMacAddress: data.macAddressNetwork,
			brand: data.brand,
			model: data.model,
			operatingSystem: data.operatingSystem,
			osVersion: data.osVersion,
			memory: data.memory,
			processor: data.processor,
			hardDiskSerial: data.hardDiskSerial,
			hardDiskTotal: data.hardDiskTotal,
			hardDiskFree: data.hardDiskFree,
			ipAddress: data.ipAddress,
			connectionType: data.connectionType,
			updatedAt: null,
			lastAccess: null,
			active: true,
		};

		for (const key in device) {
			if (device[key] === undefined) {
				device[key] = null;
			}
		}

		const newDevice = Device.create({
			id: data.id,
			storeId: data.storeId,
			deviceTypeId: data.typeDeviceId,
			deviceName: data.deviceName,
			createdAt: adjustTimezone(new Date()),
			updatedAt: null,
			serialNumber: data.serialNumber ?? "",
			brand: data.brand ?? null,
			model: data.model ?? null,
			operatingSystem: data.operatingSystem ?? null,
			osVersion: data.osVersion ?? null,
			memory: data.memory ?? null,
			processor: data.processor ?? null,
			networkMacAddress: data.macAddressNetwork ?? null,
			hardDiskSerial: data.hardDiskSerial ?? null,
			hardDiskTotal: data.hardDiskTotal ?? null,
			hardDiskFree: data.hardDiskFree ?? null,
			ipAddress: data.ipAddress ?? null,
			imei: data.imei ?? null,
			connectionType: data.connectionType ?? null,
			lastAccess: null,
			active: true,
			alias: "",
			nebulaCode: "",
		});

		await this.devicesRepository.create(newDevice);

		return right(null);
	}
}
