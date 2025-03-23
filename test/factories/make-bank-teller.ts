import { PrismaBankTellerMapper } from "../../src/infra/database/prisma/mappers/prisma-bank-teller-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import {
	BankTeller,
	BankTellerProps,
} from "../../src/domain/entities/bank-teller";

export function makeBankTeller(override: Partial<BankTellerProps> = {}) {
	const bankTeller = BankTeller.create({
		id: uuidv4(),
		storeId: uuidv4(),
		operatorId: uuidv4(),
		deviceId: uuidv4(),
		createdAt: new Date(),
		openedAt: new Date(),
		closedAt: null,
		session: 1,
		offlineSession: null,
		openingAmount: 0,
		registeredAmount: null,
		drawerAmount: null,
		...override,
	});

	return bankTeller;
}

export class BankTellerFactory {
	async makePrismaBankTeller(
		data: Partial<BankTellerProps> = {}
	): Promise<BankTeller> {
		const bankTeller = makeBankTeller(data);

		await prisma.caixa.create({
			data: PrismaBankTellerMapper.toPrisma(bankTeller),
		});

		return bankTeller;
	}
}
