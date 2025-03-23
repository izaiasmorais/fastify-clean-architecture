import "fastify";

declare module "fastify" {
	export interface FastifyRequest {
		getCurrentStoreId(): Promise<string>;
	}
}
