import type { FastifyInstance } from "fastify";
import { getAvailability } from "./get-availability.controller";

export async function availabilityRoutes(app: FastifyInstance) {
	app.register(getAvailability);
}
