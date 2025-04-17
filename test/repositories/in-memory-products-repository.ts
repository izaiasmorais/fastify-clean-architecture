import { ProductsRepository } from "../../src/domain/repositories/products-repository";
import { Product } from "../../src/domain/entities/product";

export class InMemoryProductsRepository implements ProductsRepository {
	public products: Product[] = [];

	async create(product: Product): Promise<void> {
		this.products.push(product);
	}

	async findByCode(code: string): Promise<Product | null> {
		const product = this.products.find((product) => product.code === code);

		if (!product) {
			return null;
		}

		return product;
	}

	async findById(id: string): Promise<Product | null> {
		const product = this.products.find((product) => product.id === id);

		if (!product) {
			return null;
		}

		return product;
	}

	async findMany(): Promise<Product[]> {
		return this.products;
	}
}
