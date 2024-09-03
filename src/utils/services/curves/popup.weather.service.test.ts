import { MetricType } from '../../../context/Metric.context';
import { MetricConverter, MetricReturnType } from '../converter/metric.converter';
import { PopupWeatherScaleService } from './popup.weather.service';
import { PopupWeatherScale, ScaleCoords } from './types';

describe('popup weather service', () => {
	test('should initialize the chart with the correct data, metric, and day number', () => {
		const mockData: Array<PopupWeatherScale> = [
			{ eve: 26, night: 22, day: 28, morn: 24, nextNight: 20 },
			{ eve: 24, night: 20, day: 26, morn: 22, nextNight: 18 },
		];
		const mockMetric: MetricType = 'metric';
		const mockDayNumber = 1;

		const popupWeatherScaleService = new PopupWeatherScaleService(
			mockData,
			mockMetric,
			mockDayNumber
		);

		// Test public methods

		expect(popupWeatherScaleService.getScale()).toBeDefined();
		expect(popupWeatherScaleService.getExpandedValues()).toBeDefined();
		expect(popupWeatherScaleService.getHoverRect()).toBeDefined();

		// Optional: Test return types or specific properties of the returned objects

		expect(Array.isArray(popupWeatherScaleService.getScale())).toBe(true);
		expect(Array.isArray(popupWeatherScaleService.getExpandedValues())).toBe(true);
		expect(typeof popupWeatherScaleService.getHoverRect()).toBe('object');
	});

	test('should calculate the correct minimum and maximum values for the scale', () => {
		const mockData: Array<PopupWeatherScale> = [
			{ eve: 26, night: 22, day: 28, morn: 24, nextNight: 20 },
			{ eve: 24, night: 20, day: 26, morn: 22, nextNight: 18 },
		];
		const mockMetric: MetricType = 'metric';
		const mockDayNumber = 1;

		const popupWeatherScaleService = new PopupWeatherScaleService(
			mockData,
			mockMetric,
			mockDayNumber
		);

		const minVal = MetricConverter.getTemp(18, mockMetric).value - 5;
		const maxVal = MetricConverter.getTemp(28, mockMetric).value + 5;

		expect(popupWeatherScaleService['minVal']).toEqual(minVal);
		expect(popupWeatherScaleService['maxVal']).toEqual(maxVal);
	});

	test('should generate the correct scale coordinates based on the minimum and maximum values', () => {
		const mockData: Array<PopupWeatherScale> = [
			{ eve: 299.15, night: 295.15, day: 301.15, morn: 297.15, nextNight: 293.15 },
			{ eve: 297.15, night: 293.15, day: 299.15, morn: 295.15, nextNight: 291.15 },
		];
		const mockMetric: MetricType = 'metric';
		const mockDayNumber = 1;

		const popupWeatherScaleService = new PopupWeatherScaleService(
			mockData,
			mockMetric,
			mockDayNumber
		);

		const expectedScaleCoords: Array<ScaleCoords> = [
			{ value: 13, units: '°', pX: 10, pY: 140 },
			{ value: 18, units: '°', pX: 10, pY: 117.5 },
			{ value: 23, units: '°', pX: 10, pY: 95 },
			{ value: 28, units: '°', pX: 10, pY: 72.5 },
			{ value: 33, units: '°', pX: 10, pY: 50 },
		];

		const actualScaleCoords = popupWeatherScaleService.getScale();

		expect(actualScaleCoords).toEqual(expectedScaleCoords);
	});

	test('should expand the day values correctly, including edge cases', () => {
		const mockData: Array<PopupWeatherScale> = [
			{ eve: 299.15, night: 295.15, day: 301.15, morn: 297.15, nextNight: 293.15 },
			{ eve: 297.15, night: 293.15, day: 299.15, morn: 295.15, nextNight: 291.15 },
		];
		const mockMetric: MetricType = 'metric';
		const mockDayNumber = 1;

		const popupWeatherScaleService = new PopupWeatherScaleService(
			mockData,
			mockMetric,
			mockDayNumber
		);

		const expectedExpandedValues: MetricReturnType[] = [
			{ value: 24, units: '°C' },
			{ value: 24, units: '°C' },
			{ value: 23, units: '°C' },
			{ value: 22, units: '°C' },
			{ value: 22, units: '°C' },
			{ value: 21, units: '°C' },
			{ value: 20, units: '°C' },
			{ value: 20, units: '°C' },
			{ value: 21, units: '°C' },
			{ value: 22, units: '°C' },
			{ value: 24, units: '°C' },
			{ value: 25, units: '°C' },
			{ value: 26, units: '°C' },
			{ value: 26, units: '°C' },
			{ value: 25, units: '°C' },
			{ value: 24, units: '°C' },
			{ value: 24, units: '°C' },
			{ value: 23, units: '°C' },
			{ value: 22, units: '°C' },
			{ value: 22, units: '°C' },
			{ value: 21, units: '°C' },
			{ value: 20, units: '°C' },
			{ value: 20, units: '°C' },
			{ value: 19, units: '°C' },
			{ value: 18, units: '°C' },
		];
		const actualExpandedValues = popupWeatherScaleService.getExpandedValues();

		expect(actualExpandedValues).toEqual(expectedExpandedValues);
	});

	test('should expand the day values correctly, including edge cases', () => {
		const mockData: Array<PopupWeatherScale> = [
			{ eve: 299.15, night: 295.15, day: 301.15, morn: 297.15, nextNight: 293.15 },
			{ eve: 297.15, night: 293.15, day: 299.15, morn: 295.15, nextNight: 291.15 },
		];
		const mockMetric: MetricType = 'metric';
		const mockDayNumber = 1;

		const popupWeatherScaleService = new PopupWeatherScaleService(
			mockData,
			mockMetric,
			mockDayNumber
		);

		const expectedExpandedValues: MetricReturnType[] = [
			{ value: 24, units: '°C' },
			{ value: 24, units: '°C' },
			{ value: 23, units: '°C' },
			{ value: 22, units: '°C' },
			{ value: 22, units: '°C' },
			{ value: 21, units: '°C' },
			{ value: 20, units: '°C' },
			{ value: 20, units: '°C' },
			{ value: 21, units: '°C' },
			{ value: 22, units: '°C' },
			{ value: 24, units: '°C' },
			{ value: 25, units: '°C' },
			{ value: 26, units: '°C' },
			{ value: 26, units: '°C' },
			{ value: 25, units: '°C' },
			{ value: 24, units: '°C' },
			{ value: 24, units: '°C' },
			{ value: 23, units: '°C' },
			{ value: 22, units: '°C' },
			{ value: 22, units: '°C' },
			{ value: 21, units: '°C' },
			{ value: 20, units: '°C' },
			{ value: 20, units: '°C' },
			{ value: 19, units: '°C' },
			{ value: 18, units: '°C' },
		];

		const actualExpandedValues = popupWeatherScaleService.getExpandedValues();

		expect(actualExpandedValues).toEqual(expectedExpandedValues);
	});

	test('should calculate the correct data coordinates based on the expanded data and chart dimensions', () => {
		const mockData: Array<PopupWeatherScale> = [
			{ eve: 299.15, night: 295.15, day: 301.15, morn: 297.15, nextNight: 293.15 },
			{ eve: 297.15, night: 293.15, day: 299.15, morn: 295.15, nextNight: 291.15 },
		];
		const mockMetric: MetricType = 'metric';
		const mockDayNumber = 1;

		const popupWeatherScaleService = new PopupWeatherScaleService(
			mockData,
			mockMetric,
			mockDayNumber
		);

		const expectedDataCoords = [
			{ x: 30, y: 90.5, value: 299.15 },
			{ x: 40.8, y: 90.5, value: 295.15 },
			{ x: 51.6, y: 94.1, value: 301.15 },
			{ x: 62.400000000000006, y: 97.7, value: 297.15 },
			{ x: 73.2, y: 101.3, value: 293.15 },
			{ x: 84, y: 104.9, value: 297.15 },
			{ x: 94.80000000000001, y: 108.5, value: 293.15 },
			{ x: 105.60000000000001, y: 108.5, value: 299.15 },
			{ x: 116.4, y: 103.1, value: 295.15 },
			{ x: 127.2, y: 97.7, value: 291.15 },
			{ x: 138, y: 92.3, value: undefined },
			{ x: 148.8, y: 86.9, value: undefined },
			{ x: 159.60000000000002, y: 81.5, value: undefined },
			{ x: 170.4, y: 81.5, value: undefined },
			{ x: 181.20000000000002, y: 85.1, value: undefined },
			{ x: 192, y: 88.7, value: undefined },
			{ x: 202.8, y: 92.3, value: undefined },
			{ x: 213.60000000000002, y: 95.9, value: undefined },
			{ x: 224.4, y: 99.5, value: undefined },
			{ x: 235.20000000000002, y: 99.5, value: undefined },
			{ x: 246, y: 103.1, value: undefined },
			{ x: 256.8, y: 106.7, value: undefined },
			{ x: 267.6, y: 110.3, value: undefined },
			{ x: 278.4, y: 113.9, value: undefined },
			{ x: 289.20000000000005, y: 117.5, value: undefined },
		];

		expect(popupWeatherScaleService['dataCoords']).toEqual(expectedDataCoords);
	});

	test('should handle edge cases where the minimum and maximum values are the same', () => {
		const mockData: Array<PopupWeatherScale> = [
			{ eve: 300, night: 300, day: 300, morn: 300, nextNight: 300 },
			{ eve: 300, night: 300, day: 300, morn: 300, nextNight: 300 },
		];
		const mockMetric: MetricType = 'metric';
		const mockDayNumber = 1;

		const popupWeatherScaleService = new PopupWeatherScaleService(
			mockData,
			mockMetric,
			mockDayNumber
		);

		expect(popupWeatherScaleService['minVal']).toEqual(22); // Assuming minVal is 5 less than the minimum value
		expect(popupWeatherScaleService['maxVal']).toEqual(32); // Assuming maxVal is 5 more than the maximum value

		const expectedScale: Array<ScaleCoords> = [
			{ value: 22, units: '°', pX: 10, pY: 140 },
			{ value: 25, units: '°', pX: 10, pY: 117.5 },
			{ value: 27, units: '°', pX: 10, pY: 95 },
			{ value: 30, units: '°', pX: 10, pY: 72.5 },
			{ value: 32, units: '°', pX: 10, pY: 50 },
		];

		const actualScale = popupWeatherScaleService.getScale();
		expect(actualScale).toEqual(expectedScale);

		const expectedExpandedValues: MetricReturnType[] = [
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
			{ value: 27, units: '°C' },
		];

		const actualExpandedValues = popupWeatherScaleService.getExpandedValues();
		expect(actualExpandedValues).toEqual(expectedExpandedValues);
	});

	test('should generate the correct time descriptions based on the data coordinates', () => {
		const mockData: Array<PopupWeatherScale> = [
			{ eve: 299.15, night: 295.15, day: 301.15, morn: 297.15, nextNight: 293.15 },
			{ eve: 297.15, night: 293.15, day: 299.15, morn: 295.15, nextNight: 291.15 },
		];
		const mockMetric: MetricType = 'metric';
		const mockDayNumber = 1;

		const popupWeatherScaleService = new PopupWeatherScaleService(
			mockData,
			mockMetric,
			mockDayNumber
		);

		const expectedDescriptions = [
			{ x: 30, y: 150, value: '00' },
			{ x: 94.80000000000001, y: 150, value: '06' },
			{ x: 159.60000000000002, y: 150, value: '12' },
			{ x: 224.4, y: 150, value: '18' },
			{ x: 289.20000000000005, y: 150, value: '00' },
		];

		const actualDescriptions = popupWeatherScaleService.getDescription();

		expect(actualDescriptions).toEqual(expectedDescriptions);
	});

	test('should throw an error when getTimeLine() is called', () => {
		const mockData: Array<PopupWeatherScale> = [
			{ eve: 299.15, night: 295.15, day: 301.15, morn: 297.15, nextNight: 293.15 },
			{ eve: 297.15, night: 293.15, day: 299.15, morn: 295.15, nextNight: 291.15 },
		];
		const mockMetric: MetricType = 'metric';
		const mockDayNumber = 1;

		const popupWeatherScaleService = new PopupWeatherScaleService(
			mockData,
			mockMetric,
			mockDayNumber
		);

		expect(() => popupWeatherScaleService.getTimeLine()).toThrow('Method not implemented.');
	});
});
