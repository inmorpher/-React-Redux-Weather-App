import { getDailyScaleCoords } from './daily.temp.scale';

describe('getDailyScaleCoords', () => {
	test('should return 0 when the value equals the minTemp', () => {
		const lineWidth = 100;
		const minTemp = 0;
		const maxTemp = 30;
		const value = 0;

		const result = getDailyScaleCoords(lineWidth, minTemp, maxTemp, value);

		expect(result).toBe(0);
	});

	test('should return the lineWidth value when the value equals the maxTemp', () => {
		const lineWidth = 100;
		const minTemp = 0;
		const maxTemp = 30;
		const value = 30;

		const result = getDailyScaleCoords(lineWidth, minTemp, maxTemp, value);

		expect(result).toBe(lineWidth);
	});

	test('should return a value greater than the lineWidth when the value is greater than the maxTemp', () => {
		const lineWidth = 100;
		const minTemp = 0;
		const maxTemp = 30;
		const value = 35;

		const result = getDailyScaleCoords(lineWidth, minTemp, maxTemp, value);

		expect(result).toBeGreaterThan(lineWidth);
	});

	test('should return a negative value when the value is less than the minTemp', () => {
		const lineWidth = 100;
		const minTemp = 0;
		const maxTemp = 30;
		const value = -5;

		const result = getDailyScaleCoords(lineWidth, minTemp, maxTemp, value);

		expect(result).toBeLessThan(0);
	});

	test('should return the correct coordinate when the value is between the minTemp and maxTemp', () => {
		const lineWidth = 100;
		const minTemp = 0;
		const maxTemp = 30;
		const value = 15;

		const expectedCoordinate = 50;

		const result = getDailyScaleCoords(lineWidth, minTemp, maxTemp, value);

		expect(result).toBe(expectedCoordinate);
	});

	test('should return NaN when either lineWidth, minTemp, or maxTemp is not a number', () => {
		// Test case: lineWidth is not a number
		expect(getDailyScaleCoords(NaN, 0, 30, 15)).toBeNaN();

		// Test case: minTemp is not a number
		expect(getDailyScaleCoords(100, NaN, 30, 15)).toBeNaN();

		// Test case: maxTemp is not a number
		expect(getDailyScaleCoords(100, 0, NaN, 15)).toBeNaN();
	});

	test('should return 0 when the lineWidth is 0', () => {
		const lineWidth = 0;
		const minTemp = 0;
		const maxTemp = 30;
		const value = 15;

		const result = getDailyScaleCoords(lineWidth, minTemp, maxTemp, value);

		expect(result).toBe(0);
	});

	test('should return 0 when minTemp equals maxTemp', () => {
		const lineWidth = 100;
		const minTemp = 10;
		const maxTemp = 10;
		const value = 15;

		const result = getDailyScaleCoords(lineWidth, minTemp, maxTemp, value);

		expect(result).toBe(0);
	});

	test('should return the correct coordinate when the lineWidth is a large number', () => {
		const lineWidth = 1000000;
		const minTemp = 0;
		const maxTemp = 30;
		const value = 15;

		const expectedCoordinate = 500000;

		const result = getDailyScaleCoords(lineWidth, minTemp, maxTemp, value);

		expect(result).toBe(expectedCoordinate);
	});

	test('should return the correct coordinate when minTemp and maxTemp are negative values', () => {
		const lineWidth = 100;
		const minTemp = -10;
		const maxTemp = -5;
		const value = -7;

		const expectedCoordinate = 60;

		const result = getDailyScaleCoords(lineWidth, minTemp, maxTemp, value);

		expect(result).toBe(expectedCoordinate);
	});
});
