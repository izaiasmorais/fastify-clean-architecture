import type { ProductResponse } from "../../../../domain/repositories/products-repository";
import type { ProductsRepository } from "../../../../domain/repositories/products-repository";
import { PrismaProductMapper } from "../mappers/prisma-product-mapper";
import { prisma } from "../prisma";

export class PrismaProductsRepository implements ProductsRepository {
	async findMany(
		storeId: string,
		pageSize: number,
		currentPage?: number,
		isActive?: boolean,
		firstCreatedAt?: Date,
		lastCreatedAt?: Date,
		firstUpdatedAt?: Date,
		lastUpdatedAt?: Date
	): Promise<ProductResponse[] | null> {
		const skip = (currentPage ?? 1 - 1) * pageSize;
		const take = pageSize;

		const products = await prisma.produtos.findMany({
			skip,
			take,
			where: {
				RestauranteId: storeId,
				Status: isActive,
				CriadoEm: {
					gte: firstCreatedAt,
					lte: lastCreatedAt,
				},
				AlteradoEm: {
					gte: firstUpdatedAt,
					lte: lastUpdatedAt,
				},
			},
			include: {
				CategoriaProdutos: true,
			},
		});

		if (!products || products.length === 0) {
			return null;
		}

		const productResponses: ProductResponse[] = products.map((product) => {
			const domainProduct = PrismaProductMapper.toDomain(product);
			return {
				id: domainProduct.id,
				name: domainProduct.name,
				description: domainProduct.description,
				type: domainProduct.type,
				image: domainProduct.image,
				storeId: domainProduct.storeId,
				price: domainProduct.price,
				status: domainProduct.status,
				createdAt: domainProduct.createdAt,
				updatedAt: domainProduct.updatedAt,
				synchronizedAt: domainProduct.synchronizedAt,
				isBetiquim: domainProduct.isBetiquim,
				hungerSize: domainProduct.hungerSize,
				externalCode: domainProduct.externalCode,
				viewPriceOnline: domainProduct.viewPriceOnline,
				pdvPrice: domainProduct.pdvPrice,
				groups: product.CategoriaProdutos.map((category) => ({
					id: category.Id,
					groupId: category.CategoriaId,
					isActive: category.Ativo,
				})),
			};
		});

		return productResponses;
	}
}
