import { prisma } from "../../database/prisma/prisma";

export async function validateProducts(
	productIds: string[], productNames: string[]
): Promise<{ errors: string[]; validProductIds: string[] }> {
	const errors: string[] = [];
	const validProducts = await prisma.produtos.findMany({
		where: {
			Id: {
				in: productIds,
			},
		},
		select: {
			Id: true,
		},
	});

	const validProductIds = validProducts.map((item) => item.Id);

	for (const productId of productIds) {
		if (!validProductIds.includes(productId)) {
			const productName = productNames[productIds.indexOf(productId)];
			errors.push(`O produto ${productName} não existe`);
		}
	}

	return { errors, validProductIds };
}
