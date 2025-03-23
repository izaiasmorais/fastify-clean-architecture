import { Entity } from "../../core/entities/entity";

export interface AvailabilityProps {
	id: string;
	storeId: string | null;
	start: string | null;
	end: string | null;
	createdAt: Date;
	updatedAt: Date | null;
	menuCategoryId: string | null;
	menuItemId: string | null;
	endDay: number;
	startDay: number;
	startPeriod: Date | null;
	endPeriod: Date | null;
	couponId: string | null;
}

export class Availability extends Entity<AvailabilityProps> {
	get id() {
		return this.props.id;
	}

	get storeId() {
		return this.props.storeId;
	}

	get start() {
		return this.props.start;
	}

	get end() {
		return this.props.end;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get menuCategoryId() {
		return this.props.menuCategoryId;
	}

	get menuItemId() {
		return this.props.menuItemId;
	}

	get endDay() {
		return this.props.endDay;
	}

	get startDay() {
		return this.props.startDay;
	}

	get startPeriod() {
		return this.props.startPeriod;
	}

	get endPeriod() {
		return this.props.endPeriod;
	}

	get couponId() {
		return this.props.couponId;
	}

	static create(props: AvailabilityProps) {
		const availability = new Availability(props);
		return availability;
	}
}
