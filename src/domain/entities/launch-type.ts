import { Entity } from "../../core/entities/entity";

export interface LaunchTypeProps {
	id: string;
	code: number;
	description: string;
}

export class LaunchType extends Entity<LaunchTypeProps> {
	get id() {
		return this.props.id;
	}

	get code() {
		return this.props.code;
	}

	get description() {
		return this.props.description;
	}

	static create(props: LaunchTypeProps) {
		const launchType = new LaunchType(props);

		return launchType;
	}
}
