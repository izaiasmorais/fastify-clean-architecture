import { Product } from "../../../../domain/entities/product";
import { Produtos as PrismaProduct, Prisma } from "@prisma/client";

export class PrismaProductMapper {
	static toDomain(raw: PrismaProduct): Product {
		return Product.create({
			id: raw.Id,
			name: raw.Nome,
			description: raw.Descricao,
			type: raw.Tipo,
			image: raw.Imagem,
			storeId: raw.RestauranteId,
			price: raw.Preco.toNumber(),
			status: raw.Status,
			createdAt: raw.CriadoEm,
			updatedAt: raw.AlteradoEm,
			synchronizedAt: raw.SincronizadoEm,
			isBetiquim: raw.Betiquim,
			hungerSize: raw.TamanhoFome,
			externalCode: raw.CodigoExterno,
			viewPriceOnline: raw.ViewPriceOnline,
			pdvPrice: raw.PrecoPDV ? raw.PrecoPDV.toNumber() : 0,
		});
	}

	static toPrisma(product: Product): Prisma.ProdutosUncheckedCreateInput {
		return {
			Id: product.id,
			Nome: product.name,
			Descricao: product.description,
			Tipo: product.type,
			Imagem: product.image,
			RestauranteId: product.storeId,
			Preco: product.price,
			Status: product.status,
			CriadoEm: product.createdAt,
			AlteradoEm: product.updatedAt,
			SincronizadoEm: product.synchronizedAt,
			Betiquim: product.isBetiquim,
			TamanhoFome: product.hungerSize,
			CodigoExterno: product.externalCode,
			ViewPriceOnline: product.viewPriceOnline,
			PrecoPDV: product.pdvPrice,
		};
	}
}
