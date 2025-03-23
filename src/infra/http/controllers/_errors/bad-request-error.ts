export class BadRequestError extends Error {
	public statusCode: number;

	constructor(message?: string) {
		super(message ?? "Bad Request");
		this.name = "BadRequestError";
		this.statusCode = 400;
	}
}
