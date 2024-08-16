import '@testing-library/jest-dom';
import { describe } from 'vitest';
import { getTempritureScale, tempColors } from './daily.temp.definition';

describe('temp definitions', () => {
	test('should return an empty array when minValue is greater than maxValue', () => {
		const result = getTempritureScale(300, 290);
		expect(result).toEqual([]);
	});
	test('should return the correct temperature scales for a range that spans multiple scales', () => {
		const result = getTempritureScale(270, 300);
		expect(result).toEqual([
			{
				min: 0,
				max: 273.14,
				level: 'extremely cold',
				color: tempColors[0],
			},
			{
				min: 273.15,
				max: 288.14,
				level: 'cold',
				color: tempColors[1],
			},
			{
				min: 288.15,
				max: 293.14,
				level: 'moderate',
				color: tempColors[2],
			},
			{
				min: 293.15,
				max: 298.14,
				level: 'slightly warm',
				color: tempColors[3],
			},
			{
				min: 298.15,
				max: 303.14,
				level: 'warm',
				color: tempColors[4],
			},
		]);
	});
	test('should return an empty array when minValue and maxValue are both below the minimum defined range', () => {
		const result = getTempritureScale(-10, -5);
		expect(result).toEqual([]);
	});
	test('should return an empty array when minValue and maxValue are both above the maximum defined range', () => {
		const result = getTempritureScale(430, 440);
		expect(result).toEqual([]);
	});
	test('should return the correct temperature scale when minValue and maxValue are exactly on the boundary of a single scale', () => {
		const result = getTempritureScale(273.15, 288.14);
		expect(result).toEqual([
			{
				min: 273.15,
				max: 288.14,
				level: 'cold',
				color: tempColors[1],
			},
		]);
	});
	test('should return the correct temperature scales when minValue is at the boundary of one scale and maxValue is at the boundary of another', () => {
		const result = getTempritureScale(273.15, 293.14);
		expect(result).toEqual([
			{
				min: 273.15,
				max: 288.14,
				level: 'cold',
				color: tempColors[1],
			},
			{
				min: 288.15,
				max: 293.14,
				level: 'moderate',
				color: tempColors[2],
			},
		]);
	});

	test('should handle negative temperature values correctly', () => {
		const result = getTempritureScale(-20, -10);
		expect(result).toEqual([]);
	});

	test('should handle minValue equal to maxValue within a defined range', () => {
		const result = getTempritureScale(288.15, 288.15);
		expect(result).toEqual([
			{
				min: 288.15,
				max: 293.14,
				level: 'moderate',
				color: tempColors[2],
			},
		]);
	});

	test('should return the correct temperature scales when minValue is within one range and maxValue is within another', () => {
		const result = getTempritureScale(280, 295);
		expect(result).toEqual([
			{
				min: 273.15,
				max: 288.14,
				level: 'cold',
				color: tempColors[1],
			},
			{
				min: 288.15,
				max: 293.14,
				level: 'moderate',
				color: tempColors[2],
			},
			{
				min: 293.15,
				max: 298.14,
				level: 'slightly warm',
				color: tempColors[3],
			},
		]);
	});
});
