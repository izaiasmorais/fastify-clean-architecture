export const defaultSuccessResponse = (data?: unknown) => {
	return {
		success: true as const,
		errors: null,
		data: data,
	};
};

export const defaultErrorResponse = (error: string) => {
	return {
		success: false as const,
		errors: [error],
		data: null,
	};
};
