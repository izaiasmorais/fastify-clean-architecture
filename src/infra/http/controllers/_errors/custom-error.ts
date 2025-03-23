export class CustomError extends Error {
	public statusCode: number;
	public errors: string[];

	constructor(statusCode: number, message: string[] | string) {
		super(...message);
		this.name = "CustomError";
		this.statusCode = statusCode;
		this.errors = Array.isArray(message) ? message : [message];
	}
}
