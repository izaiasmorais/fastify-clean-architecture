import { Prisma, Product as PrismaProduct } from "@prisma/client";
import { Product } from "../../../../domain/entities/product";

export class PrismaProductMapper {
	static toDomain(raw: PrismaProduct): Product {
		return Product.create({
			id: raw.id,
			code: raw.code,
			name: raw.name,
			unitPrice: Number(raw.unitPrice),
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		});
	}

	static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
		return {
			id: product.id,
			code: product.code,
			name: product.name,
			unitPrice: product.unitPrice,
		};
	}
}
