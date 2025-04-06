import { z } from "zod";

export const signUpRequestBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
	role: z.enum(["COMPANY", "CONSULTANT", "CITY"]),
	phone: z.string().refine(
		(val) => {
			const length = val.length;
			return length === 10 || length === 11;
		},
		{
			message: "Telefone inválido",
		}
	),
	document: z.string().refine(
		(val) => {
			const length = val.length;
			return length === 11 || length === 14;
		},
		{ message: "Documento Inválido" }
	),
});
