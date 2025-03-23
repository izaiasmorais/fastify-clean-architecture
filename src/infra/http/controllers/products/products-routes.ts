import type { FastifyInstance } from "fastify";
import { getProducts } from "./get-products.controller";

export async function productsRoutes(app: FastifyInstance) {
	app.register(getProducts);
}
