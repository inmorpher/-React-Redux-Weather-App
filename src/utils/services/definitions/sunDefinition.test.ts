import { describe, expect, it } from 'vitest';
import { sunDefinition } from './sunDefinition';
// Обновите путь к файлу

describe('sunDefinition', () => {
	it('should correctly identify daytime and calculate range and value', () => {
		const sunRise = 21600; // 6:00 AM
		const sunSet = 64800; // 6:00 PM
		const dt = 32400; // 9:00 AM

		const result = sunDefinition(sunRise, sunSet, dt);

		expect(result).toEqual({
			range: 43200, // 12 hours
			value: 10800, // 3 hours into the day
			isDay: true,
		});
	});

	it('should correctly identify nighttime and calculate range and value', () => {
		const sunRise = 21600; // 6:00 AM
		const sunSet = 64800; // 6:00 PM
		const dt = 72000; // 8:00 PM

		const result = sunDefinition(sunRise, sunSet, dt);

		expect(result).toEqual({
			range: 43200, // 12 hours, assuming next sunrise is at 6:00 AM the next day
			value: 7200, // 2 hours into the night
			isDay: false,
		});
	});
});
