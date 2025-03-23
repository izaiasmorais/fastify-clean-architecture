import type { FastifyReply } from "fastify";

export class UnauthorizedError extends Error {
	public statusCode: number;

	constructor(message?: string) {
		super(message ?? "Unauthorized");
		this.name = "UnauthorizedError";
		this.statusCode = 401;
	}

	public handle(reply: FastifyReply): void {
		reply.status(this.statusCode).send({
			success: false,
			errors: [this.message],
			data: null,
		});
	}
}
