import { Prisma } from "@prisma/client";

export interface Restaurant
	extends Prisma.RestaurantesGetPayload<{
		include: {
			Enderecos: true;
			SoftwareHouse: true;
		};
	}> {}
