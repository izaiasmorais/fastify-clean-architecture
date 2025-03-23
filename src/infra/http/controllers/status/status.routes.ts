import type { FastifyInstance } from "fastify";
import { getStatuses } from "./get-statuses.controller";

export async function statusRoutes(app: FastifyInstance) {
	app.register(getStatuses);
}
