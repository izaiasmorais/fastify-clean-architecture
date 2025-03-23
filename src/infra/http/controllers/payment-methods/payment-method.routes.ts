import type { FastifyInstance } from "fastify";
import { getPaymentMethods } from "./get-payment-methods.controller";

export async function paymentMethodsRoutes(app: FastifyInstance) {
	app.register(getPaymentMethods);
}
