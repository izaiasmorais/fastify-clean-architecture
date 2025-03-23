import type { BankTeller } from "../../src/domain/entities/bank-teller";
import type { BankTellersRepository } from "../../src/domain/repositories/bank-tellers-repository";

export class InMemoryBankTellersRepository implements BankTellersRepository {
	public bankTellers: BankTeller[] = [];

	async findById(storeId: string, id: string) {
		return (
			this.bankTellers.find(
				(bankTeller) => bankTeller.storeId === storeId && bankTeller.id === id
			) || null
		);
	}
}
