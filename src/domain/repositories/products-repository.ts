import { Product } from "../entities/product";

export interface ProductsRepository {
	create(product: Product): Promise<void>;
	findByCode(code: string): Promise<Product | null>;
	findById(id: string): Promise<Product | null>;
}
