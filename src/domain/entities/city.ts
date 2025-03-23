import { Entity } from "../../core/entities/entity";

export interface CityProps {
	id: string;
	stateId: string;
	ibgeCode: number;
	description: string;
}

export class City extends Entity<CityProps> {
	get id() {
		return this.props.id;
	}

	get stateId() {
		return this.props.stateId;
	}

	get ibgeCode() {
		return this.props.ibgeCode;
	}

	get description() {
		return this.props.description;
	}

	static create(props: CityProps) {
		const city = new City(props);
		return city;
	}
}
