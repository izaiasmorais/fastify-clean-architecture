import { generateUUID } from "../../src/core/utils/generate-uuid";
import { Product, ProductProps } from "../../src/domain/entities/product";

export function makeProduct(override: Partial<ProductProps> = {}) {
	const product = Product.create({
		id: "1",
		code: "PROD-001",
		name: "Test Product",
		unitPrice: 100,
		createdAt: new Date(),
		updatedAt: null,
		...override,
	});

	return product;
}
