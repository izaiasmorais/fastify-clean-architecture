import { Entity } from "../../core/entities/entity";

export interface LaunchProps {
	storeId: string;
	id: string;
	value: number;
	launchTypeId: string;
	paymentMethodId: string;
	createdAt: Date;
	materaTransactionId?: string | null;
	deviceId?: string | null;
	bankTellerId?: string | null;
	operatorId?: string | null;
	orderId?: string | null;
	destinationLaunchId?: string | null;
	originLaunchId?: string | null;
	transferredById?: string | null;
	transferredAt?: Date | null;
	discountValue?: number | null;
	discountPercentage?: number | null;
	description?: string | null;
	pixHash?: string | null;
	pixAlias?: string | null;
}

export class Launch extends Entity<LaunchProps> {
	get storeId() {
		return this.props.storeId;
	}

	get id() {
		return this.props.id;
	}

	get value() {
		return this.props.value;
	}

	get launchTypeId() {
		return this.props.launchTypeId;
	}

	get paymentMethodId() {
		return this.props.paymentMethodId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get materaTransactionId() {
		return this.props.materaTransactionId;
	}

	get deviceId() {
		return this.props.deviceId;
	}

	get bankTellerId() {
		return this.props.bankTellerId;
	}

	get operatorId() {
		return this.props.operatorId;
	}

	get orderId() {
		return this.props.orderId;
	}

	get destinationLaunchId() {
		return this.props.destinationLaunchId;
	}

	get originLaunchId() {
		return this.props.originLaunchId;
	}

	get transferredById() {
		return this.props.transferredById;
	}

	get transferredAt() {
		return this.props.transferredAt;
	}

	get discountValue() {
		return this.props.discountValue;
	}

	get discountPercentage() {
		return this.props.discountPercentage;
	}

	get description() {
		return this.props.description;
	}

	get pixHash() {
		return this.props.pixHash;
	}

	get pixAlias() {
		return this.props.pixAlias;
	}

	static create(props: LaunchProps) {
		const launch = new Launch(props);

		return launch;
	}
}
