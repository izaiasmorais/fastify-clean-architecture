import { Entity } from "../../core/entities/entity";

export interface GroupProps {
	id: string;
	storeId: string;
	name: string | null;
	isPizza: boolean;
	status: boolean;
	createdAt: Date;
	updatedAt: Date | null;
	pdvCode: string | null;
}

export class Group extends Entity<GroupProps> {
	get id() {
		return this.props.id;
	}

	get storeId() {
		return this.props.storeId;
	}

	get name() {
		return this.props.name;
	}

	get isPizza() {
		return this.props.isPizza;
	}

	get status() {
		return this.props.status;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get pdvCode() {
		return this.props.pdvCode;
	}

	static create(props: GroupProps) {
		const group = new Group(props);
		return group;
	}
}
