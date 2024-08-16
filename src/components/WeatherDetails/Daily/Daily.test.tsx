import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import {
	useGetDailyCalendar,
	useGetDailyForecast,
	useGetDailyForecastDetails,
	useGetDailyScale,
	useGetDailyWeatherForDay,
} from '../../../context/WeatherData.context';
import { IDailyForecast } from '../../../context/WeatherData.types';
import { Daily } from './Daily';
import Calendar from './DailyComponents/DailyCalendar';

vi.mock('../../../context/WeatherData.context', () => ({
	useGetDailyForecast: vi.fn(),
	useWeatherData: vi.fn(() => ({
		status: 'success',
		weatherData: undefined,
		error: null,
	})),
	useGetDailyCalendar: vi.fn(),
	useGetDailyWeatherForDay: vi.fn(),
	useGetDailyScale: vi.fn(),
	useGetDailyForecastDetails: vi.fn(),
	useDailyCalendar: vi.fn(),
}));

vi.mock('../../../hooks/useDailyContext', () => ({
	useDailyContext: vi.fn(() => ({
		containerRef: { current: null },
		dailyDetailsRef: { current: null },
		dailyListRef: { current: null },
		dailyState: {
			isOpen: false,
		},
	})),
}));

describe('Daily', () => {
	test('should render the Daily component with valid dailyValues and colors', () => {
		const mockDailyData = {
			daily: [
				{
					dt: 1633035600,
					sunrise: 1633057200,
					sunset: 1633099200,
					moonrise: 1633082400,
					moonset: 1633125600,
					moon_phase: 0.5,
					summary: 'Clear sky',
					temp: {
						day: 25,
						min: 15,
						max: 25,
						night: 17,
						eve: 20,
						morn: 15,
					},
					feels_like: {
						day: 25,
						night: 17,
						eve: 20,
						morn: 15,
					},
					pressure: 1015,
					humidity: 50,
					dew_point: 10,
					wind_speed: 3.6,
					wind_deg: 200,
					wind_gust: 5.1,
					weather: [
						{
							id: 800,
							main: 'Clear',
							description: 'clear sky',
							icon: '01d',
						},
					],
					clouds: 0,
					pop: 0,
					rain: 0,
					snow: 0,
					uvi: 5,
				},
			],
			dailyValues: [
				{
					dayMinTemp: { value: 15, units: 'C' },
					dayMaxTemp: { value: 25, units: 'C' },
					weekDay: 'Monday',
					dayWeatherIcon: 'icon-monday',
					dailyTempCoords: [
						{ x1: 0, x2: 10 },
						{ x1: 10, x2: 20 },
					],
				},
				{
					dayMinTemp: { value: 17, units: 'C' },
					dayMaxTemp: { value: 27, units: 'C' },
					weekDay: 'Tuesday',
					dayWeatherIcon: 'icon-tuesday',
					dailyTempCoords: [
						{ x1: 0, x2: 10 },
						{ x1: 10, x2: 20 },
					],
				},
			],
			colors: [
				{
					min: 273.15,
					max: 288.14,
					level: 'cold',
					color: '#007aa5',
				},
				{
					min: 288.15,
					max: 293.14,
					level: 'moderate',
					color: '#30CC14',
				},
				{
					min: 293.15,
					max: 298.14,
					level: 'slightly warm',
					color: '#ffff31',
				},
				{
					min: 298.15,
					max: 303.14,
					level: 'warm',
					color: '#EA7211',
				},
			],
		};

		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			mockDailyData
		);
		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockResolvedValue([
			{ dayOfMonth: 'Mon', fullDateString: 'Mon, 01 Feb 2021' },
			{ dayOfMonth: 'Tue', fullDateString: 'Tue, 02 Feb 20' },
		]);

		(useGetDailyWeatherForDay as MockedFunction<typeof useGetDailyWeatherForDay>).mockResolvedValue(
			{
				tempMin: { value: 15, units: 'C' },
				tempMax: { value: 25, units: 'C' },
				weatherIcon: 'icon-monday',
				weatherCondition: 'Clear sky',
			}
		);

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue({
			temperatureCurve: { mainCurve: '' },
			temperatureScale: [{ value: 273, pY: 100, units: 'C' }],
			scaleDescriptions: [{ x: 0, y: 100, value: 'Cold' }],
			expandedTemperatureData: [{ value: 278, units: 'C' }],
			interactiveHoverArea: { x: 1, width: 10, height: 100 },
		});

		(
			useGetDailyForecastDetails as MockedFunction<typeof useGetDailyForecastDetails>
		).mockResolvedValue({
			uvi: 1,
			humidity: 50,
			wind: {
				direction: 'N',
				speed: { value: 3.6, units: 'm/s' },
				gust: { value: 5.1, units: 'm/s' },
			},
			pressure: 1015,
			precipitation: { pop: 0, rain: 0, snow: 0 },
			clouds: 0,
			summary: 'Clear sky',
		});

		const { getByText, getByRole } = render(<Daily data={mockDailyData} />);

		const mondayElement = getByText('Today');
		const tuesdayElement = getByText('Tuesday');
		const colorElement = getByRole('list');

		expect(mondayElement).toBeInTheDocument();
		expect(tuesdayElement).toBeInTheDocument();
		expect(colorElement).toBeInTheDocument();
	});

	test('should render the Daily component with no dailyValues and colors', () => {
		const mockDailyData = {
			dailyValues: [],
			colors: [],
		};

		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			mockDailyData as unknown as IDailyForecast
		);

		const { getByRole } = render(<Daily data={mockDailyData as unknown as IDailyForecast} />);

		const colorElement = getByRole('list');
		expect(colorElement).toBeInTheDocument();
	});

	test('should render the Daily component with empty dailyValues array', () => {
		const mockDailyData = {
			dailyValues: [],
			colors: [
				{
					min: 273.15,
					max: 288.14,
					level: 'cold',
					color: '#007aa5',
				},
			],
		};

		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			mockDailyData as unknown as IDailyForecast
		);

		const { getByRole } = render(<Daily data={mockDailyData as unknown as IDailyForecast} />);

		const colorElement = getByRole('list');
		expect(colorElement).toBeInTheDocument();
	});

	test('should render the Daily component with empty colors array', () => {
		const mockDailyData = {
			dailyValues: [
				{
					dayMinTemp: { value: 15, units: 'C' },
					dayMaxTemp: { value: 25, units: 'C' },
					weekDay: 'Monday',
					dayWeatherIcon: 'icon-monday',
					dailyTempCoords: [
						{ x1: 0, x2: 10 },
						{ x1: 10, x2: 20 },
					],
				},
			],
			colors: [],
		};

		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			mockDailyData as unknown as IDailyForecast
		);

		const { getByRole } = render(<Daily data={mockDailyData as unknown as IDailyForecast} />);

		const colorElement = getByRole('list');
		expect(colorElement).toBeInTheDocument();
	});

	test('should handle the case when dailyValues contains null values', () => {
		const mockDailyData = {
			dailyValues: [null, null],
			colors: [
				{
					min: 273.15,
					max: 288.14,
					level: 'cold',
					color: '#007aa5',
				},
			],
		};

		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			mockDailyData as unknown as IDailyForecast
		);

		const { getByRole } = render(<Daily data={mockDailyData as unknown as IDailyForecast} />);

		const colorElement = getByRole('list');
		expect(colorElement).toBeInTheDocument();
	});

	test('should handle the case when colors contains null values', () => {
		const mockDailyData = {
			dailyValues: [
				{
					dayMinTemp: { value: 15, units: 'C' },
					dayMaxTemp: { value: 25, units: 'C' },
					weekDay: 'Monday',
					dayWeatherIcon: 'icon-monday',
					dailyTempCoords: [
						{ x1: 0, x2: 10 },
						{ x1: 10, x2: 20 },
					],
				},
			],
			colors: [null, null],
		};

		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			mockDailyData as unknown as IDailyForecast
		);

		const { getByRole } = render(<Daily data={mockDailyData as unknown as IDailyForecast} />);

		const colorElement = getByRole('list');
		expect(colorElement).toBeInTheDocument();
	});

	test('should render the Daily component when useDailyContext returns null refs', () => {
		vi.mock('../../../hooks/useDailyContext', () => ({
			useDailyContext: vi.fn(() => ({
				containerRef: null,
				dailyDetailsRef: null,
				dailyListRef: null,
				dailyState: {
					isOpen: false,
				},
			})),
		}));

		const mockDailyData = {
			dailyValues: [
				{
					dayMinTemp: { value: 15, units: 'C' },
					dayMaxTemp: { value: 25, units: 'C' },
					weekDay: 'Monday',
					dayWeatherIcon: 'icon-monday',
					dailyTempCoords: [
						{ x1: 0, x2: 10 },
						{ x1: 10, x2: 20 },
					],
				},
			],
			colors: [
				{
					min: 273.15,
					max: 288.14,
					level: 'cold',
					color: '#007aa5',
				},
			],
		};

		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			mockDailyData as unknown as IDailyForecast
		);

		const { getByRole } = render(<Daily data={mockDailyData as unknown as IDailyForecast} />);

		const colorElement = getByRole('list');
		expect(colorElement).toBeInTheDocument();
	});

	test('should render the Daily component when useDailyContext returns undefined refs', () => {
		vi.mock('../../../hooks/useDailyContext', () => ({
			useDailyContext: vi.fn(() => ({
				containerRef: undefined,
				dailyDetailsRef: undefined,
				dailyListRef: undefined,
				dailyState: {
					isOpen: false,
				},
			})),
		}));

		const mockDailyData = {
			dailyValues: [
				{
					dayMinTemp: { value: 15, units: 'C' },
					dayMaxTemp: { value: 25, units: 'C' },
					weekDay: 'Monday',
					dayWeatherIcon: 'icon-monday',
					dailyTempCoords: [
						{ x1: 0, x2: 10 },
						{ x1: 10, x2: 20 },
					],
				},
			],
			colors: [
				{
					min: 273.15,
					max: 288.14,
					level: 'cold',
					color: '#007aa5',
				},
			],
		};

		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			mockDailyData as unknown as IDailyForecast
		);

		const { getByRole } = render(<Daily data={mockDailyData as unknown as IDailyForecast} />);

		const colorElement = getByRole('list');
		expect(colorElement).toBeInTheDocument();
	});

	test('should log an error when dailyValues is missing in the data prop', () => {
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		const mockDailyData = {
			colors: [
				{
					min: 273.15,
					max: 288.14,
					level: 'cold',
					color: '#007aa5',
				},
			],
		};

		render(<Daily data={mockDailyData as unknown as IDailyForecast} />);

		expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('dailyValues is missing'));
		consoleErrorSpy.mockRestore();
	});

	test('should render the Daily component with additional unexpected properties in the data prop', () => {
		const mockDailyData = {
			dailyValues: [
				{
					dayMinTemp: { value: 15, units: 'C' },
					dayMaxTemp: { value: 25, units: 'C' },
					weekDay: 'Monday',
					dayWeatherIcon: 'icon-monday',
					dailyTempCoords: [
						{ x1: 0, x2: 10 },
						{ x1: 10, x2: 20 },
					],
				},
			],
			colors: [
				{
					min: 273.15,
					max: 288.14,
					level: 'cold',
					color: '#007aa5',
				},
			],
			unexpectedProp: 'unexpectedValue',
		};

		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			mockDailyData as unknown as IDailyForecast
		);

		const { getByRole } = render(<Daily data={mockDailyData as unknown as IDailyForecast} />);

		const colorElement = getByRole('list');
		expect(colorElement).toBeInTheDocument();
	});
	test('should not render calendar when calendar is empty or undefined', () => {
		const mockDailyData = {
			dailyValues: [],
			colors: [],
		};

		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			mockDailyData as unknown as IDailyForecast
		);

		const { getByTestId } = render(<Calendar />);

		const calendarElement = getByTestId('daily-calendar-list');

		expect(calendarElement).toBeEmptyDOMElement();
	});

	test('should handle calendar render when calendar is Array but length is 0', () => {
		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			[] as unknown as IDailyForecast
		);

		const { getByTestId } = render(<Calendar />);

		const calendarElement = getByTestId('daily-calendar-list');

		expect(calendarElement).toBeEmptyDOMElement();
	});
	test('should render calendar when calendar is available', () => {
		const mockDailyData = {
			daily: [
				{
					dt: 1633035600,
					sunrise: 1633057200,
					sunset: 1633099200,
					moonrise: 1633082400,
					moonset: 1633125600,
					moon_phase: 0.5,
					summary: 'Clear sky',
					temp: {
						day: 25,
						min: 15,
						max: 25,
						night: 17,
						eve: 20,
						morn: 15,
					},
					feels_like: {
						day: 25,
						night: 17,
						eve: 20,
						morn: 15,
					},
					pressure: 1015,
					humidity: 50,
					dew_point: 10,
					wind_speed: 3.6,
					wind_deg: 200,
					wind_gust: 5.1,
					weather: [
						{
							id: 800,
							main: 'Clear',
							description: 'clear sky',
							icon: '01d',
						},
					],
					clouds: 0,
					pop: 0,
					rain: 0,
					snow: 0,
					uvi: 5,
				},
			],
			dailyValues: [
				{
					dayMinTemp: { value: 15, units: 'C' },
					dayMaxTemp: { value: 25, units: 'C' },
					weekDay: 'Monday',
					dayWeatherIcon: 'icon-monday',
					dailyTempCoords: [
						{ x1: 0, x2: 10 },
						{ x1: 10, x2: 20 },
					],
				},
				{
					dayMinTemp: { value: 17, units: 'C' },
					dayMaxTemp: { value: 27, units: 'C' },
					weekDay: 'Tuesday',
					dayWeatherIcon: 'icon-tuesday',
					dailyTempCoords: [
						{ x1: 0, x2: 10 },
						{ x1: 10, x2: 20 },
					],
				},
			],
			colors: [
				{
					min: 273.15,
					max: 288.14,
					level: 'cold',
					color: '#007aa5',
				},
				{
					min: 288.15,
					max: 293.14,
					level: 'moderate',
					color: '#30CC14',
				},
				{
					min: 293.15,
					max: 298.14,
					level: 'slightly warm',
					color: '#ffff31',
				},
				{
					min: 298.15,
					max: 303.14,
					level: 'warm',
					color: '#EA7211',
				},
			],
		};

		(useGetDailyForecast as MockedFunction<typeof useGetDailyForecast>).mockResolvedValue(
			mockDailyData
		);
		const { getByTestId } = render(<Calendar />);
		const calendarElement = getByTestId('daily-calendar-list');
		expect(calendarElement).toBeInTheDocument();
	});
});
