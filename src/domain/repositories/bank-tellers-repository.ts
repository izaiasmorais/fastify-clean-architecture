import type { BankTeller } from "../entities/bank-teller";

export interface BankTellersRepository {
	findById(storeId: string, id: string): Promise<BankTeller | null>;
}
