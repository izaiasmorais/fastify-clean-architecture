import { Entity } from "../../core/entities/entity";

export interface PizzaSizeProps {
	id: string;
	description: string | null;
	createdAt: Date;
	updatedAt: Date | null;
	productId: string;
	storeId: string;
	value: number;
	active: number | null;
	pdvPrice: number;
}

export class PizzaSize extends Entity<PizzaSizeProps> {
	get id() {
		return this.props.id;
	}

	get description() {
		return this.props.description;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get productId() {
		return this.props.productId;
	}

	get storeId() {
		return this.props.storeId;
	}

	get value() {
		return this.props.value;
	}

	get active() {
		return this.props.active;
	}

	get pdvPrice() {
		return this.props.pdvPrice;
	}

	static create(props: PizzaSizeProps) {
		const pizzaSize = new PizzaSize(props);
		return pizzaSize;
	}
}
