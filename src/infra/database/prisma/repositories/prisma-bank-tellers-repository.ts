import type { BankTeller } from "../../../../domain/entities/bank-teller";
import type { BankTellersRepository } from "../../../../domain/repositories/bank-tellers-repository";
import { PrismaBankTellerMapper } from "../mappers/prisma-bank-teller-mapper";
import { prisma } from "../prisma";

export class PrismaBankTellersRepository implements BankTellersRepository {
	async findById(storeId: string, id: string): Promise<BankTeller | null> {
		const bankTeller = await prisma.caixa.findUnique({
			where: {
				Id: id,
				RestauranteId: storeId,
			},
		});

		if (!bankTeller) {
			return null;
		}

		return PrismaBankTellerMapper.toDomain(bankTeller);
	}
}
