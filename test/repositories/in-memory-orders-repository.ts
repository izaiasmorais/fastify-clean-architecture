import type { Order } from "../../src/domain/entities/order";
import type { OrdersRepository } from "../../src/domain/repositories/orders-repository";

export class InMemoryOrdersRepository implements OrdersRepository {
	public orders: Order[] = [];

	async findById(storeId: string, id: string) {
		return (
			this.orders.find(
				(order) => order.storeId === storeId && order.id === id
			) || null
		);
	}
}
