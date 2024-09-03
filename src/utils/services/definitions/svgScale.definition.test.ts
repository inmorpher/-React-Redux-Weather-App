import { describe } from 'vitest';
import { getSvgScale, ScaleType } from './svgScale.definition';

describe('getSvgScale', () => {
	test('should return the correct colors and values for the AQI scale type with a valid value within the defined range', () => {
		const validAqiValue = 3;
		const expectedColors = ['#0080FF', '#00FF00', '#FFFF00', '#FFA500', '#E70F12'];
		const expectedValues = {
			value: validAqiValue,
			level: 'moderate',
			color: '#FFFF00',
		};

		const result = getSvgScale(ScaleType.aqi, validAqiValue);

		expect(result.colors).toEqual(expectedColors);
		expect(result.values).toEqual(expectedValues);
	});

	test('should return the correct colors and values for the UVI scale type with a valid value within the defined range', () => {
		const validUviValue = 7;
		const expectedColors = [
			'#3FD125',
			'#30CC14',
			'#B9CB13',
			'#EAC811',
			'#EA9911',
			'#EA7211',
			'#E84E13',
			'#E70F12',
			'#D80D10',
			'#EB0D65',
			'#EA0C93',
			'#F00A90',
		];
		const expectedValues = {
			value: validUviValue,
			level: 'high',
			color: '#E70F12',
		};

		const result = getSvgScale(ScaleType.uvi, validUviValue);

		expect(result.colors).toEqual(expectedColors);
		expect(result.values).toEqual(expectedValues);
	});
});
