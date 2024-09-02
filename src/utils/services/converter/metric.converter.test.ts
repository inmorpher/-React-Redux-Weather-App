import { describe } from 'vitest';
import { MetricConverter, MetricValue } from './metric.converter';

describe('MetricConverter', () => {
	test('should convert a valid temperature value from Kelvin to Celsius with short units', () => {
		const value = 300;
		const metric = 'metric';
		const units = 'short';
		const expected = { value: 27, units: '°' };

		const result = MetricConverter.getTemp(value, metric, units);

		expect(result).toEqual(expected);
	});

	test('should convert a valid temperature value from Kelvin to Fahrenheit with "full" units', () => {
		const value = 300;
		const metric = 'imperial';
		const units = 'full';
		const expected = { value: 80, units: '°F' };

		const result = MetricConverter.getTemp(value, metric, units);

		expect(result).toEqual(expected);
	});

	test('should throw an error when the input value for temperature conversion is not a number', () => {
		const invalidValue = 'abc';
		const metric = 'metric';

		expect(() => MetricConverter.getTemp(invalidValue as unknown as number, metric)).toThrow(
			'Value error: Expected a number but received string. Please use NUMBER.'
		);
	});

	test('should convert a valid temperature value from Kelvin to Celsius with no units', () => {
		const value = 300;
		const metric = 'metric';
		const units = 'none';
		const expected = { value: 27, units: '' };

		const result = MetricConverter.getTemp(value, metric, units);

		expect(result).toEqual(expected);
	});

	test('should convert a valid temperature value from Kelvin to Fahrenheit with no units', () => {
		const value = 300;
		const metric = 'imperial';
		const units = 'none';
		const expected = { value: 80, units: '' };

		const result = MetricConverter.getTemp(value, metric, units);

		expect(result).toEqual(expected);
	});

	test('should convert a valid temperature value from Kelvin to Celsius with "none" units', () => {
		const value = 300;
		const metric = 'metric';
		const units = 'none';
		const expected = { value: 27, units: '' };

		const result = MetricConverter.getTemp(value, metric, units);

		expect(result).toEqual(expected);
	});

	test('should convert a valid temperature value from Kelvin to Fahrenheit with "none" units', () => {
		const value = 300;
		const metric = 'imperial';
		const units = 'none';
		const expected = { value: 80, units: '' };

		const result = MetricConverter.getTemp(value, metric, units);

		expect(result).toEqual(expected);
	});

	test('should throw an error when the metric parameter is invalid', () => {
		const invalidMetric = 'invalid';
		const value = 300;

		expect(() => MetricConverter.getTemp(value, invalidMetric as MetricValue)).toThrow(
			'Metric type error: "invalid" is not a valid metric. Please use "metric" or "imperial".'
		);
		expect(() => MetricConverter.getSpeed(value, invalidMetric as MetricValue)).toThrow(
			'Metric type error: "invalid" is not a valid metric. Please use "metric" or "imperial".'
		);
	});

	test('should convert an array of temperature values from Kelvin to Celsius with "full" units', () => {
		const values = [300, 280, 310];
		const metric = 'metric';
		const units = 'full';
		const expected = [
			{ value: 27, units: '°C' },
			{ value: 7, units: '°C' },
			{ value: 37, units: '°C' },
		];

		const result = MetricConverter.getTemps(values, metric, units);

		expect(result).toEqual(expected);
	});

	test('should convert an array of temperature values from Kelvin to Fahrenheit with "short" units', () => {
		const values = [300, 280, 310];
		const metric = 'imperial';
		const units = 'short';
		const expected = [
			{ value: 80, units: '°' },
			{ value: 44, units: '°' },
			{ value: 98, units: '°' },
		];

		const result = MetricConverter.getTemps(values, metric, units);

		expect(result).toEqual(expected);
	});

	test('should convert an array of temperature values from Kelvin to Celsius with "none" units', () => {
		const values = [300, 280, 310];
		const metric = 'metric';
		const units = 'none';
		const expected = [
			{ value: 27, units: '' },
			{ value: 7, units: '' },
			{ value: 37, units: '' },
		];

		const result = MetricConverter.getTemps(values, metric, units);

		expect(result).toEqual(expected);
	});

	test('should convert an array of temperature values from Kelvin to Fahrenheit with "none" units', () => {
		const values = [300, 280, 310];
		const metric = 'imperial';
		const units = 'none';
		const expected = [
			{ value: 80, units: '' },
			{ value: 44, units: '' },
			{ value: 98, units: '' },
		];

		const result = MetricConverter.getTemps(values, metric, units);

		expect(result).toEqual(expected);
	});

	test('should convert a valid speed value from m/s to mph with units', () => {
		const value = 10;
		const metric = 'imperial';
		const units = true;
		const expected = { value: 22.4, units: 'mph' };

		const result = MetricConverter.getSpeed(value, metric, units);

		expect(result).toEqual(expected);
	});
	test('should throw an error when the metric parameter is invalid for speed conversion', () => {
		const invalidMetric = 'invalid';
		const value = 10;

		expect(() => MetricConverter.getSpeed(value, invalidMetric as MetricValue)).toThrow(
			'Metric type error: "invalid" is not a valid metric. Please use "metric" or "imperial".'
		);
	});

	test('should convert a valid speed value from m/s to km/h with units', () => {
		const value = 10;
		const metric = 'metric';
		const units = true;
		const expected = { value: 10, units: 'm/s' };

		const result = MetricConverter.getSpeed(value, metric, units);

		expect(result).toEqual(expected);
	});
});
