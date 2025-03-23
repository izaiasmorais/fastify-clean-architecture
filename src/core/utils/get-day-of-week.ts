export function getDayOfWeek(dayNumber: number): string {
	const days = [
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira",
		"Quinta-feira",
		"Sexta-feira",
		"Sábado",
	];

	return days[dayNumber] || "Dia inválido";
}
