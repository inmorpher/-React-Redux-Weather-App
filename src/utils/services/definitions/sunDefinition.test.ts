import { sunDefinition } from './sunDefinition';

describe('sunDefinition', () => {
	test('should return correct values when the current time is during the day', () => {
		const sunRise = 21600; // 6:00 AM (6 * 3600 seconds)
		const sunSet = 72000; // 8:00 PM (20 * 3600 seconds)
		const dt = 43200; // 12:00 PM (12 * 3600 seconds)

		const result = sunDefinition(sunRise, sunSet, dt);

		expect(result.cycleDuration).toBe(50400); // 14 hours (50400 seconds)
		expect(result.timeSinceCycleStart).toBe(21600); // 6 hours (21600 seconds)
		expect(result.isDay).toBe(true);
	});

	test('should return correct values when the current time is during the night', () => {
		const sunRise = 21600; // 6:00 AM (6 * 3600 seconds)
		const sunSet = 72000; // 8:00 PM (20 * 3600 seconds)
		const dt = 79200; // 10:00 PM (22 * 3600 seconds)

		const result = sunDefinition(sunRise, sunSet, dt);

		expect(result.cycleDuration).toBe(36000); // 10 hours (18000 seconds)
		expect(result.timeSinceCycleStart).toBe(7200); // 2 hours (7200 seconds)
		expect(result.isDay).toBe(false);
	});

	test('should handle cases when the current time is exactly at sunrise or sunset', () => {
		const sunRise = 21600; // 6:00 AM (6 * 3600 seconds)
		const sunSet = 72000; // 8:00 PM (20 * 3600 seconds)

		// At sunrise
		let result = sunDefinition(sunRise, sunSet, sunRise);
		expect(result.cycleDuration).toBe(50400); // 14 hours (50400 seconds)
		expect(result.timeSinceCycleStart).toBe(0); // 0 seconds
		expect(result.isDay).toBe(true);

		// At sunset
		result = sunDefinition(sunRise, sunSet, sunSet);
		expect(result.cycleDuration).toBe(50400); // 14 hours (50400 seconds)
		expect(result.timeSinceCycleStart).toBe(50400); // 14 hours (50400 seconds)
		expect(result.isDay).toBe(true);
	});

	test('should handle cases when the current time is before sunrise or after sunset on the same day', () => {
		const sunRise = 21600; // 6:00 AM (6 * 3600 seconds)
		const sunSet = 72000; // 8:00 PM (20 * 3600 seconds)
		const dtBeforeSunrise = 18000; // 5:00 AM (5 * 3600 seconds)
		const dtAfterSunset = 75600; // 9:00 PM (21 * 3600 seconds)

		// Before sunrise
		let result = sunDefinition(sunRise, sunSet, dtBeforeSunrise);
		expect(result.cycleDuration).toBe(36000); // 18 hours (64800 seconds)
		expect(result.timeSinceCycleStart).toBe(32400); // 1 hour (3600 seconds)
		expect(result.isDay).toBe(false);

		// After sunset
		result = sunDefinition(sunRise, sunSet, dtAfterSunset);
		expect(result.cycleDuration).toBe(36000); // 5 hours (18000 seconds)
		expect(result.timeSinceCycleStart).toBe(3600); // 1 hour (3600 seconds)
		expect(result.isDay).toBe(false);
	});

	test('should handle cases when the sunrise and sunset timestamps are equal', () => {
		const sunRise = 43200; // 12:00 PM (12 * 3600 seconds)
		const sunSet = 43200; // 12:00 PM (12 * 3600 seconds)
		const dt = 43200; // 12:00 PM (12 * 3600 seconds)

		const result = sunDefinition(sunRise, sunSet, dt);

		expect(result.cycleDuration).toBe(0);
		expect(result.timeSinceCycleStart).toBe(0);
		expect(result.isDay).toBe(true);
	});

	test('should handle cases when the current time is equal to the sunrise or sunset timestamps', () => {
		const sunRise = 21600; // 6:00 AM (6 * 3600 seconds)
		const sunSet = 72000; // 8:00 PM (20 * 3600 seconds)

		// At sunrise
		let result = sunDefinition(sunRise, sunSet, sunRise);
		expect(result.cycleDuration).toBe(50400); // 14 hours (50400 seconds)
		expect(result.timeSinceCycleStart).toBe(0); // 0 seconds
		expect(result.isDay).toBe(true);

		// At sunset
		result = sunDefinition(sunRise, sunSet, sunSet);
		expect(result.cycleDuration).toBe(50400); // 14 hours (50400 seconds)
		expect(result.timeSinceCycleStart).toBe(50400); // 14 hours (50400 seconds)
		expect(result.isDay).toBe(true);
	});
});
