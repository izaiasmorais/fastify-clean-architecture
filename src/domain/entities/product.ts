import { Entity } from "../../core/entities/entity";

export interface ProductProps {
	id: string;
	name: string | null;
	description: string | null;
	type: string;
	image: string | null;
	storeId: string;
	price: number;
	status: boolean;
	createdAt: Date;
	updatedAt: Date | null;
	synchronizedAt: Date | null;
	isBetiquim: boolean;
	hungerSize: number;
	externalCode: string | null;
	viewPriceOnline: boolean;
	pdvPrice: number;
}

export class Product extends Entity<ProductProps> {
	get id() {
		return this.props.id;
	}

	get name() {
		return this.props.name;
	}

	get description() {
		return this.props.description;
	}

	get type() {
		return this.props.type;
	}

	get image() {
		return this.props.image;
	}

	get storeId() {
		return this.props.storeId;
	}

	get price() {
		return this.props.price;
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

	get synchronizedAt() {
		return this.props.synchronizedAt;
	}

	get isBetiquim() {
		return this.props.isBetiquim;
	}

	get hungerSize() {
		return this.props.hungerSize;
	}

	get externalCode() {
		return this.props.externalCode;
	}

	get viewPriceOnline() {
		return this.props.viewPriceOnline;
	}

	get pdvPrice() {
		return this.props.pdvPrice;
	}

	static create(props: ProductProps) {
		const product = new Product(props);
		return product;
	}
}
