import { Prisma } from "@prisma/client";

export interface OrderItem
	extends Prisma.PedidoItensGetPayload<{
		select: {
			Id: true;
			PedidoItemId: true;
			ProdutoId: true;
			TamanhoPizzaId: true;
			Quantidade: true;
			Preco: true;
			SubTotal: true;
			Observacao: true;

			CriadoEm: true;
			AlteradoEm: true;

			PedidoSubItens: {
				select: {
					Id: true;
					PedidoItemId: true;
					ComplementoId: true; // PrdocutId
					Quantidade: true;
					Preco: true;
					SubTotal: true;
					CriadoEm: true;
					AlteradoEm: true;
				};
			};
		};
	}> {}

export interface OrderItemComplement
	extends Prisma.PedidoSubItensGetPayload<{
		select: {
			Id: true;
			PedidoItemId: true;
			ComplementoId: true; // PrdocutId
			Quantidade: true;
			Preco: true;
			SubTotal: true;
			CriadoEm: true;
			AlteradoEm: true;
		};
	}> {}

export interface Order
	extends Prisma.PedidosGetPayload<{
		select: {
			RestauranteId: true;
			Id: true;
			Status: true;
			DispositivoId: true;
			CriadoEm: true;
			ValorTroco: true;
			OperadorId: true;
			GerenteId: true;
			AlteradoEm: true;
			CaixaId: true;
			ValorTotal: true;
			Pago: true;
			TaxaServico: true;
			HashPixPenseBank: true;
			Alias: true;
			TipoPedidoId: true;
			RestauranteFormaPagamentoId: true;
			PedidoItens: {
				select: {
					Id: true;
					PedidoItemId: true;
					ProdutoId: true;
					TamanhoPizzaId: true;
					Quantidade: true;
					Preco: true;
					SubTotal: true;
					Observacao: true;
					CriadoEm: true;
					AlteradoEm: true;
					PedidoSubItens: {
						select: {
							Id: true;
							PedidoItemId: true;
							ComplementoId: true;
							Quantidade: true;
							Preco: true;
							SubTotal: true;
							CriadoEm: true;
							AlteradoEm: true;
						};
					};
				};
			};
		};
	}> {}
