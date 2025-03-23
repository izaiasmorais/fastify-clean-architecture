import { PrismaProductMapper } from "../../src/infra/database/prisma/mappers/prisma-product-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import { Product, ProductProps } from "../../src/domain/entities/product";

export function makeProduct(override: Partial<ProductProps> = {}) {
	const product = Product.create({
		id: uuidv4(),
		name: null,
		description: null,
		type: "R",
		image: null,
		storeId: uuidv4(),
		price: 0,
		status: true,
		createdAt: new Date(),
		updatedAt: null,
		synchronizedAt: null,
		isBetiquim: false,
		hungerSize: 0,
		externalCode: null,
		viewPriceOnline: true,
		pdvPrice: 0,
		...override,
	});

	return product;
}

export class ProductFactory {
	async makePrismaProduct(data: Partial<ProductProps> = {}): Promise<Product> {
		const product = makeProduct(data);

		await prisma.produtos.create({
			data: PrismaProductMapper.toPrisma(product),
		});

		return product;
	}
}
