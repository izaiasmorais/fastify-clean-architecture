import { Entity } from "../../core/entities/entity";

export interface StoreProps {
	id: string;
	name: string | null;
	nebulaCode: string | null;
	accessKey: string | null;
	backgroundImage: string | null;
	logoImage: string | null;
	phone: string | null;
	parameterId: string;
	createdAt: Date;
	updatedAt: Date | null;
	cnpj: string | null;
	merchantId: string | null;
	merchantPassword: string | null;
	minimumTime: number;
	isClosed: boolean;
	lastRequest: Date | null;
	isActive: boolean;
	synchronizedAt: Date | null;
	facebook: string | null;
	instagram: string | null;
	segment: string | null;
	softwareHouseId: number | null;
	licenseExpiration: Date | null;
	pdvFlowVersion: string | null;
	email: string | null;
	alias: string | null;
	pdvFlowDbVersion: string | null;
	scheduledPauseStart: Date | null;
	scheduledPauseEnd: Date | null;
}

export class Store extends Entity<StoreProps> {
	get id() {
		return this.props.id;
	}

	get name() {
		return this.props.name;
	}

	get nebulaCode() {
		return this.props.nebulaCode;
	}

	get accessKey() {
		return this.props.accessKey;
	}

	get backgroundImage() {
		return this.props.backgroundImage;
	}

	get logoImage() {
		return this.props.logoImage;
	}

	get phone() {
		return this.props.phone;
	}

	get parameterId() {
		return this.props.parameterId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get cnpj() {
		return this.props.cnpj;
	}

	get merchantId() {
		return this.props.merchantId;
	}

	get merchantPassword() {
		return this.props.merchantPassword;
	}

	get minimumTime() {
		return this.props.minimumTime;
	}

	get isClosed() {
		return this.props.isClosed;
	}

	get lastRequest() {
		return this.props.lastRequest;
	}

	get isActive() {
		return this.props.isActive;
	}

	get synchronizedAt() {
		return this.props.synchronizedAt;
	}

	get facebook() {
		return this.props.facebook;
	}

	get instagram() {
		return this.props.instagram;
	}

	get segment() {
		return this.props.segment;
	}

	get softwareHouseId() {
		return this.props.softwareHouseId;
	}

	get licenseExpiration() {
		return this.props.licenseExpiration;
	}

	get pdvFlowVersion() {
		return this.props.pdvFlowVersion;
	}

	get email() {
		return this.props.email;
	}

	get alias() {
		return this.props.alias;
	}

	get pdvFlowDbVersion() {
		return this.props.pdvFlowDbVersion;
	}

	get scheduledPauseStart() {
		return this.props.scheduledPauseStart;
	}

	get scheduledPauseEnd() {
		return this.props.scheduledPauseEnd;
	}

	static create(props: StoreProps) {
		const store = new Store(props);
		return store;
	}
}
