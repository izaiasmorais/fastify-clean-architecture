import { prisma } from "../../database/prisma/prisma";

export async function validateOrderType(
	orderTypeId: string
): Promise<string | null> {
	const orderType = await prisma.tipoPedido.findUnique({
		where: {
			Id: orderTypeId,
		},
	});

	if (!orderType) return "O tipo de pedido é inválido";

	return null;
}
