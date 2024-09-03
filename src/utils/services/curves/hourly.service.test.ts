import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { MetricType } from '../../../context/Metric.context';
import { MetricConverter } from '../converter/metric.converter';
import { HourlyChart } from './hourly.service';
import { HourlyWeatherData } from './types';

vi.mock('../converter/metric.converter', () => ({
	MetricConverter: {
		getTemp: vi.fn(),
	},
}));

describe('HourlyChart', () => {
	test('should initialize the chart with the correct data, timezone, and metric', () => {
		const mockData: HourlyWeatherData[] = [
			{
				dt: 1685542800,
				temp: 20,
				feels_like: 22,
				pressure: 1013,
				humidity: 65,
				dew_point: 15,
				uvi: 5,
				clouds: 20,
				visibility: 10000,
				wind_speed: 3.5,
				wind_deg: 180,
				wind_gust: 5,
				weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
				pop: 0.2,
				rain: { '1h': 0.1 },
			},
			{
				dt: 1685546400,
				temp: 22,
				feels_like: 24,
				pressure: 1012,
				humidity: 60,
				dew_point: 16,
				uvi: 6,
				clouds: 30,
				visibility: 9000,
				wind_speed: 4,
				wind_deg: 200,
				wind_gust: 6,
				weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
				pop: 0.4,
				rain: { '1h': 0.3 },
			},
		];
		const timezone = 'Europe/Berlin';
		const metric: MetricType = 'metric';

		const mockMetricConverter = vi.mocked(MetricConverter);
		mockMetricConverter.getTemp.mockReturnValueOnce({ value: 15, units: '°C' });

		const hourlyChart = new HourlyChart(mockData, timezone, metric);

		expect(hourlyChart.getTimeLine().length).toEqual(2);
		expect(hourlyChart.getWeatherDescription().length).toEqual(2);
		expect(hourlyChart.getPrecipitationRects().length).toEqual(2);
		expect(hourlyChart.getPrecipitationDescription().length).toEqual(2);
		expect(hourlyChart.getRectBottom()).toBeDefined();
	});

	test('should calculate the correct min and max values for the data', () => {
		const mockData: HourlyWeatherData[] = [
			{
				dt: 1685542800,
				temp: 15,
				feels_like: 22,
				pressure: 1013,
				humidity: 65,
				dew_point: 15,
				uvi: 5,
				clouds: 20,
				visibility: 10000,
				wind_speed: 3.5,
				wind_deg: 180,
				wind_gust: 5,
				weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
				pop: 0.2,
				rain: { '1h': 0.1 },
			},
			{
				dt: 1685546400,
				temp: 25,
				feels_like: 24,
				pressure: 1012,
				humidity: 60,
				dew_point: 16,
				uvi: 6,
				clouds: 30,
				visibility: 9000,
				wind_speed: 4,
				wind_deg: 200,
				wind_gust: 6,
				weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
				pop: 0.4,
				rain: { '1h': 0.3 },
			},
		];
		const timezone = 'Europe/Berlin';
		const metric: MetricType = 'metric';

		const hourlyChart = new HourlyChart(mockData, timezone, metric);

		expect(hourlyChart['minVal']).toBe(15);
		expect(hourlyChart['maxVal']).toBe(25);
	});

	test('should generate the correct scale based on the min and max values', () => {
		const mockData: HourlyWeatherData[] = [
			{
				dt: 1685542800,
				temp: 15,
				feels_like: 22,
				pressure: 1013,
				humidity: 65,
				dew_point: 15,
				uvi: 5,
				clouds: 20,
				visibility: 10000,
				wind_speed: 3.5,
				wind_deg: 180,
				wind_gust: 5,
				weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
				pop: 0.2,
				rain: { '1h': 0.1 },
			},
			{
				dt: 1685546400,
				temp: 25,
				feels_like: 24,
				pressure: 1012,
				humidity: 60,
				dew_point: 16,
				uvi: 6,
				clouds: 30,
				visibility: 9000,
				wind_speed: 4,
				wind_deg: 200,
				wind_gust: 6,
				weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
				pop: 0.4,
				rain: { '1h': 0.3 },
			},
		];
		const timezone = 'Europe/Berlin';
		const metric: MetricType = 'metric';

		const mockMetricConverter = vi.mocked(MetricConverter);
		mockMetricConverter.getTemp.mockReturnValueOnce({ value: 15, units: '°C' });
		mockMetricConverter.getTemp.mockReturnValueOnce({ value: 18.75, units: '°C' });
		mockMetricConverter.getTemp.mockReturnValueOnce({ value: 22.5, units: '°C' });
		mockMetricConverter.getTemp.mockReturnValueOnce({ value: 26.25, units: '°C' });
		mockMetricConverter.getTemp.mockReturnValueOnce({ value: 30, units: '°C' });

		const hourlyChart = new HourlyChart(mockData, timezone, metric);

		const scale = hourlyChart.getScale();
		expect(scale).toEqual([
			{ value: 15, units: '°C', pY: 225 },
			{ value: 18, units: '°C', pY: 187.5 },
			{ value: 24, units: '°C', pY: 150 },
			{ value: 30, units: '°C', pY: 112.5 },
			{ value: 36, units: '°C', pY: 75 },
		]);
	});

	test('should calculate the correct coordinates for the data points', () => {
		const mockData: HourlyWeatherData[] = [
			{
				dt: 1685542800,
				temp: 20,
				feels_like: 22,
				pressure: 1013,
				humidity: 65,
				dew_point: 15,
				uvi: 5,
				clouds: 20,
				visibility: 10000,
				wind_speed: 3.5,
				wind_deg: 180,
				wind_gust: 5,
				weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
				pop: 0.2,
				rain: { '1h': 0.1 },
			},
			{
				dt: 1685546400,
				temp: 25,
				feels_like: 24,
				pressure: 1012,
				humidity: 60,
				dew_point: 16,
				uvi: 6,
				clouds: 30,
				visibility: 9000,
				wind_speed: 4,
				wind_deg: 200,
				wind_gust: 6,
				weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
				pop: 0.4,
				rain: { '1h': 0.3 },
			},
		];
		const timezone = 'Europe/Berlin';
		const metric: MetricType = 'metric';

		const hourlyChart = new HourlyChart(mockData, timezone, metric);

		const expectedCoords = [
			{ x: 50, y: 225 },
			{ x: 1525, y: 75 },
		];

		expect(hourlyChart['dataCoords']).toEqual(expectedCoords);
	});

	test('should generate the correct precipitation rectangles based on the data', () => {
		const mockData: HourlyWeatherData[] = [
			{
				dt: 1685542800,
				temp: 20,
				feels_like: 22,
				pressure: 1013,
				humidity: 65,
				dew_point: 15,
				uvi: 5,
				clouds: 20,
				visibility: 10000,
				wind_speed: 3.5,
				wind_deg: 180,
				wind_gust: 5,
				weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
				pop: 0.2,
				rain: { '1h': 0.1 },
			},
			{
				dt: 1685546400,
				temp: 22,
				feels_like: 24,
				pressure: 1012,
				humidity: 60,
				dew_point: 16,
				uvi: 6,
				clouds: 30,
				visibility: 9000,
				wind_speed: 4,
				wind_deg: 200,
				wind_gust: 6,
				weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
				pop: 0.4,
				rain: { '1h': 0.3 },
			},
		];
		const timezone = 'Europe/Berlin';
		const metric: MetricType = 'metric';

		const hourlyChart = new HourlyChart(mockData, timezone, metric);

		const precipitationRects = hourlyChart.getPrecipitationRects();
		expect(precipitationRects).toHaveLength(2);
		expect(precipitationRects[0]).toEqual({
			x: 50,
			y: 234,
			width: 20,
			height: 36,
		});
		expect(precipitationRects[1]).toEqual({
			x: 1525,
			y: 198,
			width: 20,
			height: 72,
		});
	});

	test('should return the correct timeline with formatted timestamps', () => {
		const mockData: HourlyWeatherData[] = [
			{
				dt: 1685542800,
				temp: 20,
				feels_like: 22,
				pressure: 1013,
				humidity: 65,
				dew_point: 15,
				uvi: 5,
				clouds: 20,
				visibility: 10000,
				wind_speed: 3.5,
				wind_deg: 180,
				wind_gust: 5,
				weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
				pop: 0.2,
				rain: { '1h': 0.1 },
			},
			{
				dt: 1685546400,
				temp: 22,
				feels_like: 24,
				pressure: 1012,
				humidity: 60,
				dew_point: 16,
				uvi: 6,
				clouds: 30,
				visibility: 9000,
				wind_speed: 4,
				wind_deg: 200,
				wind_gust: 6,
				weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
				pop: 0.4,
				rain: { '1h': 0.3 },
			},
		];
		const timezone = 'Europe/Berlin';
		const metric: MetricType = 'metric';

		const hourlyChart = new HourlyChart(mockData, timezone, metric);

		const timeline = hourlyChart.getTimeLine();
		expect(timeline).toEqual([
			{ time: '04 PM', x: 50, y: 12 },
			{ time: '05 PM', x: 1525, y: 12 },
		]);
	});

	test('should return the correct weather descriptions for each data point', () => {
		const mockData: HourlyWeatherData[] = [
			{
				dt: 1685542800,
				temp: 20,
				feels_like: 22,
				pressure: 1013,
				humidity: 65,
				dew_point: 15,
				uvi: 5,
				clouds: 20,
				visibility: 10000,
				wind_speed: 3.5,
				wind_deg: 180,
				wind_gust: 5,
				weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
				pop: 0.2,
				rain: { '1h': 0.1 },
			},
			{
				dt: 1685546400,
				temp: 22,
				feels_like: 24,
				pressure: 1012,
				humidity: 60,
				dew_point: 16,
				uvi: 6,
				clouds: 30,
				visibility: 9000,
				wind_speed: 4,
				wind_deg: 200,
				wind_gust: 6,
				weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
				pop: 0.4,
				rain: { '1h': 0.3 },
			},
		];
		const timezone = 'Europe/Berlin';
		const metric: MetricType = 'metric';

		const hourlyChart = new HourlyChart(mockData, timezone, metric);

		const weatherDescriptions = hourlyChart.getWeatherDescription();

		expect(weatherDescriptions.length).toEqual(2);
		expect(weatherDescriptions[0].value).toEqual(['light', 'rain']);
		expect(weatherDescriptions[1].value).toEqual(['moderate', 'rain']);
	});

	test('should return the correct precipitation descriptions for each data point', () => {
		const mockData: HourlyWeatherData[] = [
			{
				dt: 1685542800,
				temp: 20,
				feels_like: 22,
				pressure: 1013,
				humidity: 65,
				dew_point: 15,
				uvi: 5,
				clouds: 20,
				visibility: 10000,
				wind_speed: 3.5,
				wind_deg: 180,
				wind_gust: 5,
				weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
				pop: 0.2,
				rain: { '1h': 0.1 },
			},
			{
				dt: 1685546400,
				temp: 22,
				feels_like: 24,
				pressure: 1012,
				humidity: 60,
				dew_point: 16,
				uvi: 6,
				clouds: 30,
				visibility: 9000,
				wind_speed: 4,
				wind_deg: 200,
				wind_gust: 6,
				weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
				pop: 0.4,
				rain: { '1h': 0.3 },
			},
		];
		const timezone = 'Europe/Berlin';
		const metric: MetricType = 'metric';

		const hourlyChart = new HourlyChart(mockData, timezone, metric);
		const precipitationDescriptions = hourlyChart.getPrecipitationDescription();

		expect(precipitationDescriptions).toEqual([
			{
				rain: 0.1,
				rainX: precipitationDescriptions[0].rainX,
				rainY: precipitationDescriptions[0].rainY,
				pop: '20%',
				popX: precipitationDescriptions[0].popX,
				popY: precipitationDescriptions[0].popY,
			},
			{
				rain: 0.3,
				rainX: precipitationDescriptions[1].rainX,
				rainY: precipitationDescriptions[1].rainY,
				pop: '40%',
				popX: precipitationDescriptions[1].popX,
				popY: precipitationDescriptions[1].popY,
			},
		]);
	});

	test('should handle data with missing or undefined values for rain and pop', () => {
		const mockData: HourlyWeatherData[] = [
			{
				dt: 1685542800,
				temp: 20,
				feels_like: 22,
				pressure: 1013,
				humidity: 65,
				dew_point: 15,
				uvi: 5,
				clouds: 20,
				visibility: 10000,
				wind_speed: 3.5,
				wind_deg: 180,
				wind_gust: 5,
				weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
				pop: 0.2,
				rain: { '1h': 0.1 },
			},
			{
				dt: 1685546400,
				temp: 22,
				feels_like: 24,
				pressure: 1012,
				humidity: 60,
				dew_point: 16,
				uvi: 6,
				clouds: 30,
				visibility: 9000,
				wind_speed: 4,
				wind_deg: 200,
				wind_gust: 6,
				weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
				pop: undefined as unknown as number,
				rain: undefined,
			},
		];
		const timezone = 'Europe/Berlin';
		const metric: MetricType = 'metric';

		const hourlyChart = new HourlyChart(mockData, timezone, metric);

		const precipitationDescriptions = hourlyChart.getPrecipitationDescription();

		expect(precipitationDescriptions[0].rain).toBe(0.1);
		expect(precipitationDescriptions[0].pop).toBe('20%');
		expect(precipitationDescriptions[1].rain).toBeUndefined();
		expect(precipitationDescriptions[1].pop).toBe('0%');
	});
});
