import { Entity } from "../../core/entities/entity";

export interface ProductProps {
	id: string;
	code: string;
	name: string;
	unitPrice: number;
	createdAt: Date;
	updatedAt: Date | null;
}

export class Product extends Entity<ProductProps> {
	get id() {
		return this.props.id;
	}

	get code() {
		return this.props.code;
	}

	get name() {
		return this.props.name;
	}

	get unitPrice() {
		return this.props.unitPrice;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(props: ProductProps) {
		const product = new Product(props);

		return product;
	}
}
