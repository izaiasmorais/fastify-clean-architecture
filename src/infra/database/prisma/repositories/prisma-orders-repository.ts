import type { Order } from "../../../../domain/entities/order";
import type { OrdersRepository } from "../../../../domain/repositories/orders-repository";
import { PrismaOrderMapper } from "../mappers/prisma-order-mapper";
import { prisma } from "../prisma";

export class PrismaOrdersRepository implements OrdersRepository {
	async findById(storeId: string, id: string): Promise<Order | null> {
		const order = await prisma.pedidos.findUnique({
			where: {
				Id: id,
				RestauranteId: storeId,
			},
		});

		if (!order) {
			return null;
		}

		return PrismaOrderMapper.toDomain(order);
	}
}
