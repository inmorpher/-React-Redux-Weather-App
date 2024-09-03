import { getWindDirection } from './wind.direction';

describe('getWindDirection', () => {
	test('should return "N" for a windValue of 0 and type "short"', () => {
		const windValue = 0;
		const type = 'short';
		const result = getWindDirection(windValue, type);

		expect(result).toBe('N');
	});

	test('should return "North" for a windValue of 0 and type "full"', () => {
		const windValue = 0;
		const type = 'full';
		const result = getWindDirection(windValue, type);

		expect(result).toBe('North');
	});

	test('should return "SE" for a windValue of 135 and type "short"', () => {
		const windValue = 135;
		const type = 'short';
		const result = getWindDirection(windValue, type);

		expect(result).toBe('SE');
	});

	test('should return "South-east" for a windValue of 135 and type "full"', () => {
		const windValue = 135;
		const type = 'full';
		const result = getWindDirection(windValue, type);

		expect(result).toBe('South-east');
	});

	test('should return "W" for a windValue of 270 and type "short"', () => {
		const windValue = 270;
		const type = 'short';
		const result = getWindDirection(windValue, type);

		expect(result).toBe('W');
	});

	test('should return "West" for a windValue of 270 and type "full"', () => {
		const windValue = 270;
		const type = 'full';
		const result = getWindDirection(windValue, type);

		expect(result).toBe('West');
	});

	test('should return "NW" for a windValue of 315 and type "short"', () => {
		const windValue = 315;
		const type = 'short';
		const result = getWindDirection(windValue, type);

		expect(result).toBe('NW');
	});

	test('should return "North-west" for a windValue of 315 and type "full"', () => {
		const windValue = 315;
		const type = 'full';
		const result = getWindDirection(windValue, type);

		expect(result).toBe('North-west');
	});

	test('should handle negative windValues and wrap around correctly', () => {
		const windValue = -45;
		const type = 'short';
		const result = getWindDirection(windValue, type);

		expect(result).toBe('NW');
	});

	test('should handle windValues greater than 360 and wrap around correctly', () => {
		const windValue = 400;
		const type = 'full';
		const result = getWindDirection(windValue, type);

		expect(result).toBe('North');

		const windValue2 = 765;
		const type2 = 'short';
		const result2 = getWindDirection(windValue2, type2);

		expect(result2).toBe('NE');
	});
});
