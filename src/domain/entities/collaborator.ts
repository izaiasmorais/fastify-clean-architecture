import { Entity } from "../../core/entities/entity";
import type { CollaboratorTypeProps } from "./collaborator-type";

export interface CollaboratorProps {
	id: string;
	createdAt: Date;
	updatedAt: Date | null;
	collaboratorTypeId: string;
	storeId: string;
	username: string | null;
	password: string | null;
	name: string;
	cpf: string | null;
	birthDate: Date | null;
	phone: string | null;
	active: boolean;
	collaboratorType: CollaboratorTypeProps;
}

export class Collaborator extends Entity<CollaboratorProps> {
	get id() {
		return this.props.id;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get collaboratorTypeId() {
		return this.props.collaboratorTypeId;
	}

	get storeId() {
		return this.props.storeId;
	}

	get username() {
		return this.props.username;
	}

	get password() {
		return this.props.password;
	}

	get name() {
		return this.props.name;
	}

	get cpf() {
		return this.props.cpf;
	}

	get birthDate() {
		return this.props.birthDate;
	}

	get phone() {
		return this.props.phone;
	}

	get active() {
		return this.props.active;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get collaboratorType() {
		return this.props.collaboratorType;
	}

	static create(props: CollaboratorProps) {
		const collaborator = new Collaborator(props);

		return collaborator;
	}
}
