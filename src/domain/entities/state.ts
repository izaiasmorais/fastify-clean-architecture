import { Entity } from "../../core/entities/entity";
import type { City } from "./city";

export interface StateProps {
	id: string;
	ibgeCode: number;
	description: string;
	cities: City[];
}

export class State extends Entity<StateProps> {
	get id() {
		return this.props.id;
	}

	get ibgeCode() {
		return this.props.ibgeCode;
	}

	get description() {
		return this.props.description;
	}

	get cities() {
		return this.props.cities;
	}

	static create(props: StateProps) {
		const state = new State(props);
		return state;
	}
}
