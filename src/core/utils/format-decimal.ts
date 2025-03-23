import { Prisma } from "@prisma/client";

export function formatDecimal(value: number): Prisma.Decimal {
	return new Prisma.Decimal(value);
}
