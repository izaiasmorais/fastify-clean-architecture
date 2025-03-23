import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { CustomError } from "./controllers/_errors/custom-error";

type FastifiErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifiErrorHandler = async (error, _, reply) => {
	console.log(error);

	if (error instanceof ZodError) {
		return reply.status(400).send({
			success: false,
			errors: [...error.errors[0].message],
			data: null,
		});
	}

	if (error.name === "PrismaClientKnownRequestError") {
		return reply.status(400).send({
			success: false,
			errors: ["Bad Request"],
			data: null,
		});
	}

	if (error instanceof CustomError) {
		return reply.status(error.statusCode).send({
			success: false,
			errors: error.errors,
			data: null,
		});
	}

	if (error instanceof Error && "statusCode" in error) {
		const statusCode = (error as any).statusCode || 500;
		return reply.status(statusCode).send({
			success: false,
			errors: [error.message || "An error occurred"],
			data: null,
		});
	}

	reply.status(500).send({
		success: false,
		errors: ["Internal Server Error"],
		data: null,
	});
};
