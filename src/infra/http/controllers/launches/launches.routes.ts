import type { FastifyInstance } from "fastify";
import { createLaunch } from "./create-launch.controller";
import { getLaunchTypes } from "./get-launch-types.controller";

export async function launchesRoutes(app: FastifyInstance) {
	app.register(createLaunch);
	app.register(getLaunchTypes);
}
