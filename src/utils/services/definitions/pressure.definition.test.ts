import { pressureDefinition } from './pressure.definition';

describe('pressureDefinition', () => {
	test('pressureDefinition should return an object with pressure, angle, and coords properties', () => {
		const pressureValue = 1000;
		const result = pressureDefinition(pressureValue);

		expect(result).toHaveProperty('pressure', pressureValue);
		expect(result).toHaveProperty('angle');
		expect(result).toHaveProperty('coords');
		expect(Array.isArray(result.coords)).toBe(true);
		expect(result.coords.length).toBe(30); // Default number of lines

		// Check if the coords array contains objects with x1, y1, x2, y2 properties
		result.coords.forEach((coord) => {
			expect(coord).toHaveProperty('x1');
			expect(coord).toHaveProperty('y1');
			expect(coord).toHaveProperty('x2');
			expect(coord).toHaveProperty('y2');
		});
	});

	test('should generate the correct number of coordinates based on the lines parameter', () => {
		const linesCount = 50;
		const result = pressureDefinition(1000, linesCount);

		expect(result.coords.length).toBe(linesCount);
	});

	test('pressureDefinition should return coords array with objects containing x1, y1, x2, y2 properties', () => {
		const pressure = 1000;
		const result = pressureDefinition(pressure);

		result.coords.forEach((coord) => {
			expect(coord).toHaveProperty('x1');
			expect(coord).toHaveProperty('y1');
			expect(coord).toHaveProperty('x2');
			expect(coord).toHaveProperty('y2');
		});
	});
});
