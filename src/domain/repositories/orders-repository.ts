import type { Order } from "../entities/order";

export interface OrdersRepository {
	findById(storeId: string, id: string): Promise<Order | null>;
}
