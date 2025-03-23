import { prisma } from "../../database/prisma/prisma";

export async function validatePaymentMethod(
	storeId: string,
	paymentMethodId: string
): Promise<string | null> {
	const paymentMethod = await prisma.restauranteFormaPagamento.findUnique({
		where: {
			RestauranteId: storeId,
			Id: paymentMethodId,
		},
		select: { Status: true },
	});

	if (!paymentMethod) return "O método de pagamento é inválido";
	if (paymentMethod.Status !== 1) return "O método de pagamento não está ativo";

	return null;
}
