import { RegisterStoreRequestBody } from "../schemas/store";
import { adjustTimezone } from "../../../core/utils/adjust-timezone";
import { generateMerchantId } from "../../../core/utils/generate-merchant-id";
import { generateMerchantPassword } from "../../../core/utils/generate-merchant-password";
import { getMd5Hash } from "../../../core/utils/get-md5-hash";
import { removeSpecialCharacter } from "../../../core/utils/remove-special-charactere";
import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { FastifyReply } from "fastify";
import { env } from "process";
import { formatStoreResponse } from "./format-store-response";
import { v4 as uuidv4 } from "uuid";

interface CnpjIsNotRegisteredParams {
	prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
	registerStoreBody: RegisterStoreRequestBody;
	softwareHouseId: number;
	reply: FastifyReply;
}

export async function cpnjIsNotRegistered({
	registerStoreBody,
	prisma,
	softwareHouseId,
	reply,
}: CnpjIsNotRegisteredParams) {
	const parameters = await prisma.parametros.create({
		data: {
			Id: uuidv4(),
			AvaliacaoObrigatoria: true,
			ChaveMaps: null,
			Cor: null,
			CriadoEm: adjustTimezone(new Date()),
			DistanciaLimite: 0,
			PedidoViaWhasApp: false,
			PedidoMin: 0,
			QtdMaxSabores: 2,
			SincronizadorAtivo: 1,
			StatusDelivery: true,
			TaxaServico: 0,
			TelefoneRecebimento: registerStoreBody.phone,
			UsaMaiorValorSabor: true,
			AuthComplete: false,
			AutomaticApproval: true,
			ConsumirLocal: 1,
			Delivery: 1,
			RetiradaLocal: 1,
		},
	});

	const storeId = uuidv4();

	const store = await prisma.restaurantes.create({
		data: {
			Id: storeId,
			CNPJ: registerStoreBody.cnpj,
			CriadoEm: adjustTimezone(new Date()),
			Nome: registerStoreBody.name,
			Parametro_Id: parameters.Id,
			Telefone: registerStoreBody.phone,
			MerchantId: generateMerchantId(storeId),
			MerchantPwd: generateMerchantPassword(
				registerStoreBody.name,
				registerStoreBody.cnpj
			),
			ImagemFundo: null,
			ImagemLogo: null,
			Fechado: true,
			Email: registerStoreBody.email,
			UltimaRequest: null,
			Ativo: true,
			SincronizadoEm: null,
			Facebook: null,
			Instagram: null,
			Segmento: "Outros",
			SoftwareHouse_Id: softwareHouseId,
			VencimentoLicensa: null,
			VersaoPDVFlow: null,
			VersaoDBPDVFlow: null,
			Alias: registerStoreBody.alias,
			InicioPausaProgramada: null,
			FimPausaProgramada: null,
		},
	});

	await prisma.enderecos.create({
		data: {
			Id: uuidv4(),
			Bairro: registerStoreBody.address.neighborhood,
			Rua: registerStoreBody.address.street,
			Numero: registerStoreBody.address.number,
			Complemento: registerStoreBody.address.complement,
			Cidade: registerStoreBody.address.city,
			Estado: registerStoreBody.address.state,
			CEP: registerStoreBody.address.zipCode,
			RestauranteId: store.Id,
			Latitude: registerStoreBody.address.latitude,
			Longitude: registerStoreBody.address.longitude,
			UsuarioId: null,
			CriadoEm: adjustTimezone(new Date()),
			AlteradoEm: null,
			Ativo: true,
			Padrao: true,
			Referencia: null,
		},
	});

	const paymentMethods = await prisma.formasPagamento.findMany({
		select: {
			Id: true,
			TipoFormaPagamento: true,
		},
	});

	paymentMethods.map((paymentMethod) => {
		if (paymentMethod.TipoFormaPagamento === 5) {
			prisma.restauranteFormaPagamento.create({
				data: {
					Id: uuidv4(),
					FormaPagamentoId: paymentMethod.Id,
					RestauranteId: store.Id,
					Status: 0,
					CriadoEm: adjustTimezone(new Date()),
					TokenPixBalcaoPenseBank: null,
					PercentTransactionPixPenseBank: null,
					TimeLifePixPenseBank: null,
					TaxaServico: 0,
				},
			});
		} else {
			prisma.restauranteFormaPagamento.create({
				data: {
					Id: uuidv4(),
					FormaPagamentoId: paymentMethod.Id,
					RestauranteId: store.Id,
					Status: 1,
					CriadoEm: adjustTimezone(new Date()),
					TokenPixBalcaoPenseBank: null,
					PercentTransactionPixPenseBank: null,
					TimeLifePixPenseBank: null,
					TaxaServico: 0,
				},
			});
		}
	});

	const user = await prisma.usuarios.findFirst({
		where: {
			Email: registerStoreBody.email,
		},
	});

	if (user) {
		await prisma.restaurantesUsuarios.create({
			data: {
				Id: uuidv4(),
				UsuarioId: user.Id,
				RestauranteId: store.Id,
				CriadoEm: adjustTimezone(new Date()),
				AlteradoEm: null,
			},
		});
	}

	if (!user) {
		const user = await prisma.usuarios.create({
			data: {
				Id: uuidv4(),
				Email: registerStoreBody.email,
				Senha: getMd5Hash("102030"),
				Telefone: registerStoreBody.phone,
				Nome: registerStoreBody.name,
				Imagem: null,
				CPF: null,
				CriadoEm: adjustTimezone(new Date()),
				Origem: 0,
				AlteradoEm: null,
				RecuperaSenha: null,
				ExpiraRecuraSenha: null,
				RegistroGeral: null,
				Nacionalidade: null,
				DataNascimento: null,
				ESuporte: false,
			},
		});

		await prisma.restaurantesUsuarios.create({
			data: {
				Id: uuidv4(),
				UsuarioId: user.Id,
				RestauranteId: store.Id,
				CriadoEm: adjustTimezone(new Date()),
				AlteradoEm: null,
			},
		});
	}

	if (softwareHouseId === 2) {
		const port = await prisma.servidorWhatsAppLoja.aggregate({
			_max: {
				Porta: true,
			},
		});

		await prisma.servidorWhatsAppLoja.create({
			data: {
				LojaId: store.Id,
				CriadoEm: adjustTimezone(new Date()),
				IPServidor: env.ENV_URL_WHATSAPP ?? "",
				NomeImagem: env.ENV_NOME_IMAGEM ?? "",
				Porta: (port._max.Porta || 34999) + 1,
				NomeContainer: `${removeSpecialCharacter(
					registerStoreBody.cnpj
				)}-${removeSpecialCharacter(registerStoreBody.name)}${
					env.ENV_LOCAL_WHATSAPP
				}`,
				Ativo: true,
				ContainerCriado: false,
				NumeroConectado: null,
				StatusContainer: "A",
			},
		});
	}

	const response = await formatStoreResponse(store.Id);

	return reply.status(201).send(response);
}
