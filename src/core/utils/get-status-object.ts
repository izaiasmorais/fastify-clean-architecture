export function getStatusObject(value: number): string {
	const statusMap: { [key: number]: string } = {
		0: "CRIADO",
		1: "INTEGRADO",
		2: "PRODUZINDO",
		3: "ENVIADO",
		4: "ENTREGUE",
		5: "CANCELADO",
		6: "PRONTO",
		7: "AGUARDANDO PAGAMENTO",
		8: "PAGAMENTO NÃO CONCLUÍDO",
	};

	const description = statusMap[value];
	if (description === undefined) {
		throw new Error("Valor inválido");
	}

	return description;
}
