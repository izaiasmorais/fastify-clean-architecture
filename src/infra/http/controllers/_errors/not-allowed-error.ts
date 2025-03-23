import type { FastifyReply } from "fastify";

export class ForbiddenError extends Error {
	public statusCode: number;

	constructor(message?: string) {
		super(message ?? "Forbidden");
		this.name = "ForbiddenError";
		this.statusCode = 403;
	}

	public handle(reply: FastifyReply): void {
		reply.status(this.statusCode).send({
			success: false,
			errors: [this.message],
			data: null,
		});
	}
}
