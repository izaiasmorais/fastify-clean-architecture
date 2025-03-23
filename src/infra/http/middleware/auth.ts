import { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { UnauthorizedError } from "../controllers/_errors/unathorized-error";

interface JwtVerifyResponse {
	payload: { sub: string; scope: "pdvflow" | "pdvmobile" | "toten-auto" };
	iat: number;
	exp: number;
}

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
	app.addHook("preHandler", async (request) => {
		request.getCurrentStoreId = async () => {
			try {
				const {
					payload: { sub },
				} = await request.jwtVerify<JwtVerifyResponse>();

				return sub;
			} catch {
				throw new UnauthorizedError("Invalid auth token");
			}
		};
	});
});
