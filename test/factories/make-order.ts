import { PrismaOrderMapper } from "../../src/infra/database/prisma/mappers/prisma-order-mapper";
import { prisma } from "../../src/infra/database/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import { Order, OrderProps } from "../../src/domain/entities/order";

export function makeOrder(override: Partial<OrderProps> = {}) {
	const order = Order.create({
		id: uuidv4(),
		storeId: uuidv4(),
		userId: null,
		orderTypeId: uuidv4(),
		addressId: null,
		storePaymentMethodId: null,
		deliveryAreaId: null,
		orderReviewId: null,
		bankTellerId: null,
		managerId: null,
		operatorId: null,
		deviceId: null,
		cardId: null,
		orderNumber: 1,
		createdAt: new Date(),
		updatedAt: null,
		deliveryType: null,
		deliveryTime: null,
		status: 0,
		deliveryFee: null,
		serviceFee: null,
		changeAmount: null,
		discount: null,
		totalAmount: 0,
		paid: null,
		cancellationReason: null,
		pixPenseBankHash: null,
		alias: null,
		canceledAt: null,
		readyAt: null,
		completedAt: null,
		delivered: false,
		deliveredAt: null,
		observation: null,
		materaReference: null,
		expiredAt: null,
		pointsEarned: null,
		...override,
	});

	return order;
}

export class OrderFactory {
	async makePrismaOrder(data: Partial<OrderProps> = {}): Promise<Order> {
		const order = makeOrder(data);

		await prisma.pedidos.create({
			data: PrismaOrderMapper.toPrisma(order),
		});

		return order;
	}
}
