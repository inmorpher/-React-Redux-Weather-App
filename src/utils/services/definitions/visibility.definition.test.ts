import { getVisibilityValue } from './visibility.definition';

describe('getVisibilityValue', () => {
	test('should return "dense fog" for range and "0m" for distance when the input value is 0', () => {
		const result = getVisibilityValue(0);

		expect(result.range).toBe('dense fog');
		expect(result.distance).toBe('0m');
	});

	test('should return "clear" for range and "10.0km" for distance when the input value is 10000', () => {
		const result = getVisibilityValue(10000);

		expect(result.range).toBe('clear');
		expect(result.distance).toBe('10km');
	});

	test('should return "dense fog" for range and "49m" for distance when the input value is 49', () => {
		const result = getVisibilityValue(49);

		expect(result.range).toBe('dense fog');
		expect(result.distance).toBe('49m');
	});

	test('should return "clear" for range and a correctly formatted distance when the input value is outside the defined ranges', () => {
		const result = getVisibilityValue(20000);

		expect(result.range).toBe('clear');
		expect(result.distance).toBe('20km');
	});

	test('should return "light haze" for range and "4000m" for distance when the input value is 4000', () => {
		const result = getVisibilityValue(4000);

		expect(result.range).toBe('light haze');
		expect(result.distance).toBe('4km');
	});

	test('should return "thick fog" for range and "199m" for distance when the input value is 199', () => {
		const result = getVisibilityValue(199);

		expect(result.range).toBe('thick fog');
		expect(result.distance).toBe('199m');
	});

	test('should return "moderate fog" for range and "499m" for distance when the input value is 499', () => {
		const result = getVisibilityValue(499);

		expect(result.range).toBe('moderate fog');
		expect(result.distance).toBe('499m');
	});

	test('should return "haze" for range and "4km" for distance when the input value is 3999', () => {
		const result = getVisibilityValue(3999);

		expect(result.range).toBe('haze');
		expect(result.distance).toBe('4km');
	});
});
