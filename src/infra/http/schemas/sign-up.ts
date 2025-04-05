import { z } from "zod";

export const signUpRequestBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phone: z.number().refine(
		(val) => {
			const length = val.toString().length;
			return length === 10 || length === 11;
		},
		{
			message: "Telefone inválido",
		}
	),
	password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
	role: z.enum(["COMPANY", "CONSULTANT", "CITY"]),
	document: z.number().refine(
		(val) => {
			const length = val.toString().length;
			return length === 11 || length === 14;
		},
		{ message: "Documento Inválido" }
	),
});
