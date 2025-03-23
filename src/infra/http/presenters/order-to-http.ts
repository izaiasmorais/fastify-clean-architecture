import { Decimal } from "@prisma/client/runtime/library";
import { getStatusObject } from "../../../core/utils/get-status-object";

interface PaymentMethod {
	Nome: string | null;
	TipoFormaPagamento: number;
	Codigo: number;
}

interface StorePaymentMethod {
	Id: string;
	FormasPagamento: PaymentMethod;
}

interface OrderDevice {
	NomeDispositivo: string;
	Alias: string | null;
	IPAddress: string | null;
	NumeroSerie: string | null;
}

interface OrderType {
	Id: string;
	Descricao: string;
	Codigo: number;
}

interface SubItem {
	Id: string;
	PedidoItemId: string;
	ComplementoId: string | null;
	BordaMassaPizzaId: null | string;
	SaborPizzaId: null | string;
	Quantidade: number;
	Preco: number;
	CriadoEm: Date;
	AlteradoEm: null | Date;
	SubTotal: number | null;
}

interface OrderItem {
	Id: string;
	ProdutoId: string | null;
	PedidoId: string | null;
	Preco: number;
	Quantidade: number;
	SubTotal: number;
	TamanhoPizzaId: null | string;
	Observacao: null | string;
	CriadoEm: Date;
	AlteradoEm: null | Date;
	CategoriaId: null | string;
	PedidoItemId: null | string;
	PedidoSubItens: SubItem[];
}

interface Order {
	Id: string;
	CriadoEm: Date;
	Status: number;
	NumPedido: number;
	MotivoCancelamento: string | null;
	Pago: number | null;
	ValorTroco: Decimal | null;
	TaxaServico: Decimal | null;
	ValorTotal: Decimal | null;
	HashPixPenseBank: null | string;
	Alias: string | null;
	DispositivoLoja: OrderDevice | null;
	TipoPedido: OrderType | null;
	RestauranteFormaPagamento: StorePaymentMethod | null;
	PedidoItens: OrderItem[];
}

export function orderToHttp(order: Order) {
	return {
		id: order.Id,
		createdAt: order.CriadoEm,
		paid: order.Pago,
		orderNumber: order.NumPedido,
		exchangeValue: order.ValorTroco,
		serviceFee: order.TaxaServico,
		totalValue: order.ValorTotal,
		pixHashPenseBank: order.HashPixPenseBank,
		alias: order.Alias,
		orderStatus: getStatusObject(order.Status),
		cancellationReason: order.MotivoCancelamento,
		device: order.DispositivoLoja && {
			deviceName: order.DispositivoLoja.NomeDispositivo,
			alias: order.DispositivoLoja.Alias,
			ipAddress: order.DispositivoLoja.IPAddress,
			serialNumber: order.DispositivoLoja.NumeroSerie,
		},
		orderType: order.TipoPedido && {
			id: order.TipoPedido.Id,
			description: order.TipoPedido.Descricao,
			code: order.TipoPedido.Codigo,
		},
		storePaymentMethod: order.RestauranteFormaPagamento && {
			id: order.RestauranteFormaPagamento.Id,
			description: order.RestauranteFormaPagamento.FormasPagamento.Nome,
			code: order.RestauranteFormaPagamento.FormasPagamento.Codigo,
			paymentType:
				order.RestauranteFormaPagamento.FormasPagamento.TipoFormaPagamento,
		},
		orderItems: order.PedidoItens.map((item) => ({
			id: item.Id,
			productId: item.ProdutoId,
			orderId: item.PedidoId,
			price: item.Preco,
			quantity: item.Quantidade,
			subTotal: item.SubTotal,
			pizzaSizeId: item.TamanhoPizzaId,
			observation: item.Observacao,
			createdAt: item.CriadoEm,
			updatedAt: item.AlteradoEm,
			categoryId: item.CategoriaId,
			orderItemId: item.PedidoItemId,
			orderSubItems: item.PedidoSubItens.map((subItem) => ({
				id: subItem.Id,
				orderItemId: subItem.PedidoItemId,
				complementId: subItem.ComplementoId,
				pizzaDoughEdgeId: subItem.BordaMassaPizzaId,
				pizzaFlavorId: subItem.SaborPizzaId,
				quantity: subItem.Quantidade,
				price: subItem.Preco,
				createdAt: subItem.CriadoEm,
				updatedAt: subItem.AlteradoEm,
				subTotal: subItem.SubTotal,
			})),
		})),
	};
}
