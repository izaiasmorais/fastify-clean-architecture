import type { FastifyInstance } from "fastify";
import { getGroups } from "./get-groups.controller";

export async function groupsRoutes(app: FastifyInstance) {
	app.register(getGroups);
}
