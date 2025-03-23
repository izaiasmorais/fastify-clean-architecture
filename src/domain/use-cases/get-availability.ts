import { right, type Either } from "../../core/types/either";
import { getDayOfWeek } from "../../core/utils/get-day-of-week";
import type { AvailabilityProps } from "../entities/availability";
import type { AvailabilityRepository } from "../repositories/availability-repository";

interface FormattedAvailability extends AvailabilityProps {
	startWeekDay: string;
	endWeekDay: string;
}

type GetPizzaSizesRequest = {
	storeId: string;
	firstCreatedAt?: Date;
	lastCreatedAt?: Date;
	firstUpdatedAt?: Date;
	lastUpdatedAt?: Date;
};

type GetAvailabilityResponse = Either<null, FormattedAvailability[] | null>;

export class GetAvailabilityUseCase {
	constructor(
		private readonly availabilityRepository: AvailabilityRepository
	) {}

	async execute(data: GetPizzaSizesRequest): Promise<GetAvailabilityResponse> {
		const availabilities = await this.availabilityRepository.findMany(
			data.storeId,
			data.firstCreatedAt,
			data.lastCreatedAt,
			data.firstUpdatedAt,
			data.lastUpdatedAt
		);

		if (!availabilities) {
			return right(null);
		}

		const response: FormattedAvailability[] = availabilities.map(
			(availability) => ({
				id: availability.id,
				storeId: availability.storeId,
				start: availability.start,
				end: availability.end,
				createdAt: availability.createdAt,
				updatedAt: availability.updatedAt,
				menuCategoryId: availability.menuCategoryId,
				menuItemId: availability.menuItemId,
				endDay: availability.endDay,
				startDay: availability.startDay,
				startWeekDay: getDayOfWeek(availability.startDay),
				endWeekDay: getDayOfWeek(availability.endDay),
				startPeriod: availability.startPeriod,
				endPeriod: availability.endPeriod,
				couponId: availability.couponId,
			})
		);

		return right(response);
	}
}
