import type { FastifyInstance } from "fastify";
import { getPizzaSizes } from "./get-pizza-sizes.controller";

export async function pizzaSizesRoutes(app: FastifyInstance) {
	app.register(getPizzaSizes);
}
