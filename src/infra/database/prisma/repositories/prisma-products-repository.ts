import { ProductsRepository } from "../../../../domain/repositories/products-repository";
import { Product } from "../../../../domain/entities/product";
import { prisma } from "../prisma";
import { PrismaProductMapper } from "../mappers/prisma-product-mapper";

export class PrismaProductsRepository implements ProductsRepository {
	async create(product: Product): Promise<void> {
		await prisma.product.create({
			data: PrismaProductMapper.toPrisma(product),
		});
	}

	async findByCode(code: string): Promise<Product | null> {
		const product = await prisma.product.findUnique({
			where: {
				code,
			},
		});

		if (!product) {
			return null;
		}

		return PrismaProductMapper.toDomain(product);
	}

	async findById(id: string): Promise<Product | null> {
		const product = await prisma.product.findUnique({
			where: {
				id,
			},
		});

		if (!product) {
			return null;
		}

		return PrismaProductMapper.toDomain(product);
	}

	async findMany(): Promise<Product[]> {
		const products = await prisma.product.findMany();

		return products.map(PrismaProductMapper.toDomain);
	}
}
