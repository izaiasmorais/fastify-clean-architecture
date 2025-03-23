import { collaboratorSchema } from "../schemas/collaborator";

interface CollaboratorInput {
	Id: string;
	CriadoEm: Date;
	Ativo: boolean;
	Nome: string;
	Usuario: string | null;
	Celular: string | null;
	Cpf: string | null;
	DataNascimento: Date | null;
	TipoColaborador?: {
		Id: string;
		Descricao: string;
		Codigo: number;
	};
}

export function collaboratorToHttp(input: CollaboratorInput) {
	const transformed = {
		id: input.Id,
		createdAt: new Date(input.CriadoEm),
		active: input.Ativo,
		name: input.Nome,
		username: input.Usuario,
		phone: input.Celular,
		cpf: input.Cpf,
		birthDate: input.DataNascimento ? new Date(input.DataNascimento) : null,
		collaboratorType: input.TipoColaborador
			? {
					id: input.TipoColaborador.Id,
					description: input.TipoColaborador.Descricao,
					code: input.TipoColaborador.Codigo,
			  }
			: undefined,
	};

	return collaboratorSchema.parse(transformed);
}
