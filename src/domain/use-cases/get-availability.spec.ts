import { InMemoryAvailabilityRepository } from "../../../test/repositories/in-memory-availability-repository";
import { makeAvailability } from "../../../test/factories/make-availability";
import { GetAvailabilityUseCase } from "./get-availability";

let inMemoryAvailabilityRepository: InMemoryAvailabilityRepository;
let sut: GetAvailabilityUseCase;

describe("Get Availability Use Case", () => {
	beforeEach(() => {
		inMemoryAvailabilityRepository = new InMemoryAvailabilityRepository();
		sut = new GetAvailabilityUseCase(inMemoryAvailabilityRepository);
	});

	it("should return all availability", async () => {
		const storeId = "833f3229-f7c4-45cd-90b7-27c63029000c";

		const availability = makeAvailability({
			id: "833f3229-f7c4-45cd-90b7-27c63024098c",
			storeId,
			start: "10:00",
			end: "22:00",
			createdAt: new Date("2021-12-21T10:57:27.236Z"),
			updatedAt: new Date("2025-01-09T15:24:36.195Z"),
			menuCategoryId: "cat-456",
			menuItemId: "item-789",
			endDay: 7,
			startDay: 1,
			startPeriod: new Date(),
			endPeriod: new Date(),
			couponId: "coupon-012",
		});

		inMemoryAvailabilityRepository.availabilities.push(availability);

		const result = await sut.execute({
			storeId,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual([
			{
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
				startWeekDay: expect.any(String),
				endWeekDay: expect.any(String),
				startPeriod: availability.startPeriod,
				endPeriod: availability.endPeriod,
				couponId: availability.couponId,
			},
		]);
	});

	it("shouldn't return availability if the dates didn't match", async () => {
		const storeId = "833f3229-f7c4-45cd-90b7-27c63029000c";

		const availability = makeAvailability({
			storeId,
			createdAt: new Date("2021-12-21T10:57:27.236Z"),
		});

		inMemoryAvailabilityRepository.availabilities.push(availability);

		const result = await sut.execute({
			storeId,
			firstCreatedAt: new Date("2021-12-21T11:57:27.236Z"),
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual(null);
	});

	it("should return empty array if no availability exist", async () => {
		const storeId = "833f3229-f7c4-45cd-90b7-27c63029000c";
		const result = await sut.execute({
			storeId,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual(null);
	});
});
