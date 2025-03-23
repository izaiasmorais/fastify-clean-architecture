import type { FastifyInstance } from "fastify";
import { closeBankTeller } from "./close-bank-teller";
import { getBankTellerById } from "./get-bank-teller-by-id";
import { openBankTeller } from "./open-bank-teller";

export async function bankTellersRoutes(app: FastifyInstance) {
	app.register(openBankTeller);
	app.register(getBankTellerById);
	app.register(closeBankTeller);
}
