import { Entity } from "../../core/entities/entity";

export type UserRole = "COMPANY" | "CONSULTANT" | "CITY";

export interface UserProps {
	id: string;
	name: string;
	email: string;
	phone: number;
	document: number;
	password: string;
	role: UserRole;
}

export class User extends Entity<UserProps> {
	get id() {
		return this.props.id;
	}

	get name() {
		return this.props.name;
	}

	get email() {
		return this.props.email;
	}

	get phone() {
		return this.props.phone;
	}

	get document() {
		return this.props.document;
	}

	get password() {
		return this.props.password;
	}

	get role() {
		return this.props.role;
	}

	static create(props: UserProps) {
		const user = new User(props);
		return user;
	}
}
