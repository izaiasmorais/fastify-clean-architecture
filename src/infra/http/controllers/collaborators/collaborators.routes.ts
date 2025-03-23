import type { FastifyInstance } from "fastify";
import { getCollaboratorById } from "./get-collaborator-by-id.controller";
import { getCollaborators } from "./get-collaborators.controller";

export async function collaboratorsRoutes(app: FastifyInstance) {
	app.register(getCollaborators);
	app.register(getCollaboratorById);
}
