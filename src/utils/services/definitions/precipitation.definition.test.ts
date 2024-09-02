import { getPrecipitationColors } from './precipitation.definition';

describe('getPrecipitationColors', () => {
	test('should return an empty array when the input value is less than 0', () => {
		const input = -1;
		const result = getPrecipitationColors(input);
		expect(result).toHaveLength(0);
	});

	test('should return the correct precipitation range and color for a value of 0', () => {
		const value = 0;
		const result = getPrecipitationColors(value);
		expect(result).toHaveLength(1);
		expect(result).toContainEqual({ min: 0, max: 0, color: '#caf0f8' });
	});

	test('should return the correct precipitation range and color for a value within the second range (e.g., 1.5)', () => {
		const value = 1.5;
		const result = getPrecipitationColors(value);
		expect(result).toHaveLength(2);
		expect(result).toContainEqual({ min: 0.01, max: 2.5, color: '#90e0ef' });
	});

	test('should return an empty array when the input value is NaN', () => {
		const value = NaN;
		const result = getPrecipitationColors(value);
		expect(result).toHaveLength(0);
	});

	test('should return an empty array when the input value is Infinity', () => {
		const value = Infinity;
		const result = getPrecipitationColors(value);
		expect(result).toHaveLength(0);
	});

	test('should return an empty array when the input value is -Infinity', () => {
		const value = -Infinity;
		const result = getPrecipitationColors(value);
		expect(result).toHaveLength(0);
	});
});
