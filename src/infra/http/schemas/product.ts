import { z } from "zod";

export const createProductRequestBodySchema = z.object({
	code: z.string().min(10, "O código deve ter no mínimo 10 caracteres"),
	name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	unitPrice: z.coerce.number().min(1, "O preço unitário deve ser maior que 0"),
});
