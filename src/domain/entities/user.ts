import { Entity } from "../../core/entities/entity";

export enum UserRole {
	ADMIN = "ADMIN",
	COMPANY = "COMPANY",
	CONSULTANT = "CONSULTANT",
	CITY = "CITY",
}

export interface UserProps {
	id: string;
	name: string;
	email: string;
	phone: string;
	document: string;
	password: string;
	role: UserRole;
	createdAt: Date;
	updatedAt: Date | null;
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

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(props: UserProps) {
		const user = new User(props);

		return user;
	}
}
