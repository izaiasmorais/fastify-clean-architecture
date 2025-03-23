import dayjs from "dayjs";

export const adjustTimezone = (date: Date | string): Date => {
	const timezoneOffset = Number(process.env.ENV_FUSO_HORARIO ?? "0");

	if (isNaN(timezoneOffset)) {
		throw new Error("ENV_FUSO_HORARIO deve ser um número válido.");
	}

	const adjustedDate = dayjs(date).add(timezoneOffset, "hour");

	return adjustedDate.toDate();
};
