import { Entity } from "../../core/entities/entity";

export interface CollaboratorTypeProps {
	id: string;
	description: string;
	code: number;
}

export class CollaboratorType extends Entity<CollaboratorTypeProps> {
	get id() {
		return this.props.id;
	}

	get description() {
		return this.props.description;
	}

	get code() {
		return this.props.code;
	}

	static create(props: CollaboratorTypeProps) {
		const collaboratorType = new CollaboratorType(props);

		return collaboratorType;
	}
}
