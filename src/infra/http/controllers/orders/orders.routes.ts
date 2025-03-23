import type { FastifyInstance } from "fastify";
import { createOrder } from "./create-order";
import { getOrderById } from "./get-order-by-id";
import { getOrderTypes } from "./get-order-type";
import { updateOrderStatus } from "./update-order-status";
import { cancelOrder } from "./cancel-order";

export async function ordersRoutes(app: FastifyInstance) {
	app.register(getOrderTypes);
	app.register(getOrderById);
	app.register(createOrder);
	app.register(updateOrderStatus);
	app.register(cancelOrder);
}
