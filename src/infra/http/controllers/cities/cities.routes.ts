import type { FastifyInstance } from "fastify";
import { getCities } from "./get-cities.controller";

export async function citiesRoutes(app: FastifyInstance) {
	app.register(getCities);
}
