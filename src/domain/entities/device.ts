import { Entity } from "../../core/entities/entity";
import { DeviceType } from "./device-type";

export interface DeviceProps {
	id: string;
	storeId: string;
	deviceTypeId: string;
	active: boolean;
	serialNumber: string;
	createdAt: Date;
	deviceName: string;
	alias: string | null;
	nebulaCode: string | null;
	updatedAt: Date | null;
	brand: string | null;
	model: string | null;
	operatingSystem: string | null;
	osVersion: string | null;
	memory: string | null;
	processor: string | null;
	networkMacAddress: string | null;
	hardDiskSerial: string | null;
	hardDiskTotal: string | null;
	hardDiskFree: string | null;
	ipAddress: string | null;
	imei: string | null;
	connectionType: string | null;
	lastAccess: Date | null;
	deviceType?: DeviceType;
}

export class Device extends Entity<DeviceProps> {
	get id() {
		return this.props.id;
	}

	get storeId() {
		return this.props.storeId;
	}

	get deviceTypeId() {
		return this.props.deviceTypeId;
	}

	get alias() {
		return this.props.alias;
	}

	get nebulaCode() {
		return this.props.nebulaCode;
	}

	get deviceName() {
		return this.props.deviceName;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get serialNumber() {
		return this.props.serialNumber;
	}

	get brand() {
		return this.props.brand;
	}

	get model() {
		return this.props.model;
	}

	get operatingSystem() {
		return this.props.operatingSystem;
	}

	get osVersion() {
		return this.props.osVersion;
	}

	get memory() {
		return this.props.memory;
	}

	get processor() {
		return this.props.processor;
	}

	get networkMacAddress() {
		return this.props.networkMacAddress;
	}

	get hardDiskSerial() {
		return this.props.hardDiskSerial;
	}

	get hardDiskTotal() {
		return this.props.hardDiskTotal;
	}

	get hardDiskFree() {
		return this.props.hardDiskFree;
	}

	get ipAddress() {
		return this.props.ipAddress;
	}

	get imei() {
		return this.props.imei;
	}

	get connectionType() {
		return this.props.connectionType;
	}

	get lastAccess() {
		return this.props.lastAccess;
	}

	get active() {
		return this.props.active;
	}

	get deviceType() {
		return this.props.deviceType;
	}

	set updatedAt(value: Date | null) {
		this.props.updatedAt = value;
	}

	set deviceName(value: string) {
		this.props.deviceName = value;
	}

	set alias(value: string | null) {
		this.props.alias = value;
	}

	set brand(value: string | null) {
		this.props.brand = value;
	}

	set model(value: string | null) {
		this.props.model = value;
	}

	set operatingSystem(value: string | null) {
		this.props.operatingSystem = value;
	}

	set osVersion(value: string | null) {
		this.props.osVersion = value;
	}

	set memory(value: string | null) {
		this.props.memory = value;
	}

	set processor(value: string | null) {
		this.props.processor = value;
	}

	set hardDiskSerial(value: string | null) {
		this.props.hardDiskSerial = value;
	}

	set hardDiskTotal(value: string | null) {
		this.props.hardDiskTotal = value;
	}

	set hardDiskFree(value: string | null) {
		this.props.hardDiskFree = value;
	}

	set ipAddress(value: string | null) {
		this.props.ipAddress = value;
	}

	set connectionType(value: string | null) {
		this.props.connectionType = value;
	}

	static create(props: DeviceProps) {
		const device = new Device(props);

		return device;
	}
}
