import { Entity } from "../../core/entities/entity";

export interface DeviceTypeProps {
	id: string;
	code: string;
	description: string;
	isActive: number;
}

export class DeviceType extends Entity<DeviceTypeProps> {
	get id() {
		return this.props.id;
	}

	get code() {
		return this.props.code;
	}

	get description() {
		return this.props.description;
	}

	get isActive() {
		return this.props.isActive;
	}

	static create(props: DeviceTypeProps) {
		const deviceType = new DeviceType(props);
		return deviceType;
	}
}
