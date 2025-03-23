export class ConflictError extends Error {
	public statusCode: number;

	constructor(message?: string) {
		super(message ?? "Conflict");
		this.name = "ConflictError";
		this.statusCode = 409;
	}
}
