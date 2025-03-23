import { Entity } from "../../core/entities/entity";

export interface OrderProps {
	id: string;
	storeId: string;
	userId: string | null;
	orderTypeId: string;
	addressId: string | null;
	storePaymentMethodId: string | null;
	deliveryAreaId: string | null;
	orderReviewId: string | null;
	bankTellerId: string | null;
	managerId: string | null;
	operatorId: string | null;
	deviceId: string | null;
	cardId: string | null;
	orderNumber: number;
	createdAt: Date;
	updatedAt: Date | null;
	deliveryType: number | null;
	deliveryTime: number | null;
	status: number;
	deliveryFee: number | null;
	serviceFee: number | null;
	changeAmount: number | null;
	discount: number | null;
	totalAmount: number;
	paid: number | null;
	cancellationReason: string | null;
	pixPenseBankHash: string | null;
	alias: string | null;
	canceledAt: Date | null;
	readyAt: Date | null;
	completedAt: Date | null;
	delivered: boolean;
	deliveredAt: Date | null;
	observation: string | null;
	materaReference: string | null;
	expiredAt: Date | null;
	pointsEarned: number | null;
}

export class Order extends Entity<OrderProps> {
	get id() {
		return this.props.id;
	}

	get storeId() {
		return this.props.storeId;
	}

	get userId() {
		return this.props.userId;
	}

	get orderTypeId() {
		return this.props.orderTypeId;
	}

	get addressId() {
		return this.props.addressId;
	}

	get storePaymentMethodId() {
		return this.props.storePaymentMethodId;
	}

	get deliveryAreaId() {
		return this.props.deliveryAreaId;
	}

	get orderReviewId() {
		return this.props.orderReviewId;
	}

	get bankTellerId() {
		return this.props.bankTellerId;
	}

	get managerId() {
		return this.props.managerId;
	}

	get operatorId() {
		return this.props.operatorId;
	}

	get deviceId() {
		return this.props.deviceId;
	}

	get cardId() {
		return this.props.cardId;
	}

	get orderNumber() {
		return this.props.orderNumber;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get deliveryType() {
		return this.props.deliveryType;
	}

	get deliveryTime() {
		return this.props.deliveryTime;
	}

	get status() {
		return this.props.status;
	}

	get deliveryFee() {
		return this.props.deliveryFee;
	}

	get serviceFee() {
		return this.props.serviceFee;
	}

	get changeAmount() {
		return this.props.changeAmount;
	}

	get discount() {
		return this.props.discount;
	}

	get totalAmount() {
		return this.props.totalAmount;
	}

	get paid() {
		return this.props.paid;
	}

	get cancellationReason() {
		return this.props.cancellationReason;
	}

	get pixPenseBankHash() {
		return this.props.pixPenseBankHash;
	}

	get alias() {
		return this.props.alias;
	}

	get canceledAt() {
		return this.props.canceledAt;
	}

	get readyAt() {
		return this.props.readyAt;
	}

	get completedAt() {
		return this.props.completedAt;
	}

	get delivered() {
		return this.props.delivered;
	}

	get deliveredAt() {
		return this.props.deliveredAt;
	}

	get observation() {
		return this.props.observation;
	}

	get materaReference() {
		return this.props.materaReference;
	}

	get expiredAt() {
		return this.props.expiredAt;
	}

	get pointsEarned() {
		return this.props.pointsEarned;
	}

	static create(props: OrderProps) {
		const order = new Order(props);

		return order;
	}
}
