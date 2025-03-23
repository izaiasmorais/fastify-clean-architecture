import { Entity } from "../../core/entities/entity";

export interface StorePaymentMethodProps {
	id: string;
	storeId: string;
	paymentMethodId: string;
	status: number;
	appDelivery: boolean;
	pdvFlow: boolean;
	selfServiceKiosk: boolean;
	pdvMobile: boolean;
	createdAt: Date;
	updatedAt: Date | null;
	pixCounterPenseBankToken: string | null;
	pixPenseBankTransactionPercentage: number | null;
	pixPenseBankTimeLife: number | null;
	serviceFee: number | null;
}

export class StorePaymentMethod extends Entity<StorePaymentMethodProps> {
	get id() {
		return this.props.id;
	}

	get storeId() {
		return this.props.storeId;
	}

	get paymentMethodId() {
		return this.props.paymentMethodId;
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

	get pixCounterPenseBankToken() {
		return this.props.pixCounterPenseBankToken;
	}

	get pixPenseBankTransactionPercentage() {
		return this.props.pixPenseBankTransactionPercentage;
	}

	get pixPenseBankTimeLife() {
		return this.props.pixPenseBankTimeLife;
	}

	get serviceFee() {
		return this.props.serviceFee;
	}

	get appDelivery() {
		return this.props.appDelivery;
	}

	get pdvFlow() {
		return this.props.pdvFlow;
	}

	get selfServiceKiosk() {
		return this.props.selfServiceKiosk;
	}

	get pdvMobile() {
		return this.props.pdvMobile;
	}

	static create(props: StorePaymentMethodProps) {
		const storePaymentMethod = new StorePaymentMethod(props);

		return storePaymentMethod;
	}
}
