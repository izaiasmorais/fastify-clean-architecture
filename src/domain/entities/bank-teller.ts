import { Entity } from "../../core/entities/entity";

export interface BankTellerProps {
	id: string;
	storeId: string;
	operatorId: string;
	deviceId: string | null;
	session: number;
	offlineSession: number | null;
	createdAt: Date;
	openedAt: Date;
	closedAt: Date | null;
	openingAmount: number;
	registeredAmount: number | null;
	drawerAmount: number | null;
}

export class BankTeller extends Entity<BankTellerProps> {
	get id() {
		return this.props.id;
	}

	get storeId() {
		return this.props.storeId;
	}

	get operatorId() {
		return this.props.operatorId;
	}

	get deviceId() {
		return this.props.deviceId;
	}

	get session() {
		return this.props.session;
	}

	get offlineSession() {
		return this.props.offlineSession;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get openedAt() {
		return this.props.openedAt;
	}

	get closedAt() {
		return this.props.closedAt;
	}

	get openingAmount() {
		return this.props.openingAmount;
	}

	get registeredAmount() {
		return this.props.registeredAmount;
	}

	get drawerAmount() {
		return this.props.drawerAmount;
	}

	static create(props: BankTellerProps) {
		const bankTeller = new BankTeller(props);

		return bankTeller;
	}
}
