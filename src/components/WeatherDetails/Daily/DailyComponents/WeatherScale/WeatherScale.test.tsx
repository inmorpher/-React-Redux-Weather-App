import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetDailyScale } from '../../../../../context/WeatherData.context';
import { useSelectedDayIndex } from '../../../../../hooks/useDaily';
import WeatherScale from './WeatherScale';

vi.mock('../../../../../context/WeatherData.context', () => ({
	useGetDailyScale: vi.fn(),
}));

vi.mock('../../../../../hooks/useDaily', () => ({
	useSelectedDayIndex: vi.fn(),
}));

describe('WeatherScale', () => {
	// test('should handle the case when the selectedDayIndex is out of range', () => {
	// 	const mockData = {
	// 		temperatureCurve: { mainCurve: '' },
	// 		temperatureScale: [],
	// 		scaleDescriptions: [],
	// 		expandedTemperatureData: [],
	// 	} as unknown as ReturnType<typeof useGetDailyScale>;

	// 	(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(mockData);
	// 	(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(100);

	// 	const { container } = render(<WeatherScale />);

	// 	expect(container).toMatchSnapshot();
	// });

	test('should handle the case when useGetDailyScale returns undefined or null', () => {
		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(
			null as unknown as ReturnType<typeof useGetDailyScale>
		);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { container } = render(<WeatherScale />);
		expect(container.firstChild).toMatchSnapshot();

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(
			undefined as unknown as ReturnType<typeof useGetDailyScale>
		);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { container: nullContainer } = render(<WeatherScale />);
		expect(nullContainer.firstChild).toMatchSnapshot();
	});

	test('should render the correct number of scale lines and descriptions based on the temperatureScale array length', () => {
		const mockData = {
			temperatureCurve: { mainCurve: 'M10 150 C 30 120, 70 90, 100 50' },
			temperatureScale: [
				{ pY: 150, value: 0, units: '°C' },
				{ pY: 120, value: 10, units: '°C' },
				{ pY: 90, value: 20, units: '°C' },
				{ pY: 60, value: 30, units: '°C' },
			],
			scaleDescriptions: [
				{ x: 20, y: 140, value: 'Freezing' },
				{ x: 50, y: 110, value: 'Cool' },
				{ x: 80, y: 80, value: 'Warm' },
				{ x: 110, y: 50, value: 'Hot' },
			],
			expandedTemperatureData: [
				{ value: 0, units: '°C' },
				{ value: 10, units: '°C' },
				{ value: 20, units: '°C' },
				{ value: 30, units: '°C' },
			],
		} as unknown as ReturnType<typeof useGetDailyScale>;

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(mockData);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { getAllByTestId } = render(<WeatherScale />);

		const scaleLines = getAllByTestId('weather-curve-line');
		const scaleDescriptions = getAllByTestId('weather-curve-text');

		const expectedLength =
			(mockData?.temperatureScale?.length ?? 0) + (mockData?.scaleDescriptions?.length ?? 0);
		expect(scaleLines).toHaveLength(expectedLength);
		expect(scaleDescriptions).toHaveLength(expectedLength);
	});

	test('should handle the case when temperatureCurve.mainCurve is an empty string or invalid path data', () => {
		const invalidMockData = {
			temperatureCurve: { mainCurve: '' },
			temperatureScale: [],
			scaleDescriptions: [],
			expandedTemperatureData: [],
		} as unknown as ReturnType<typeof useGetDailyScale>;

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(invalidMockData);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { getByTestId, rerender } = render(<WeatherScale />);
		const curveElement = getByTestId('main-curve');

		expect(curveElement).toHaveAttribute('d', '');

		const invalidPathMockData = {
			temperatureCurve: { mainCurve: 'INVALID_PATH_DATA' },
			temperatureScale: [],
			scaleDescriptions: [],
			expandedTemperatureData: [],
		} as unknown as ReturnType<typeof useGetDailyScale>;

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(
			invalidPathMockData
		);

		rerender(<WeatherScale />);
		const invalidCurveElement = getByTestId('main-curve');

		expect(invalidCurveElement).toBeInTheDocument();
	});

	test('should handle the case when temperatureScale, scaleDescriptions, or expandedTemperatureData arrays are empty', () => {
		const emptyArraysMockData = {
			temperatureCurve: { mainCurve: 'M10 150 C 30 120, 70 90, 100 50' },
			temperatureScale: [],
			scaleDescriptions: [],
			expandedTemperatureData: [],
		} as unknown as ReturnType<typeof useGetDailyScale>;

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(
			emptyArraysMockData
		);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { queryByTestId } = render(<WeatherScale />);

		const scaleLines = queryByTestId('weather-curve-line');
		const scaleDescriptions = queryByTestId('weather-curve-text');

		expect(scaleLines).toBeNull();
		expect(scaleDescriptions).toBeNull();

		const mainCurveElement = queryByTestId('main-curve');
		expect(mainCurveElement).toBeInTheDocument();
	});

	test('should handle the case when temperatureScale, scaleDescriptions, or expandedTemperatureData arrays are empty', () => {
		const emptyArraysMockData = {
			temperatureCurve: { mainCurve: 'M10 150 C 30 120, 70 90, 100 50' },
			temperatureScale: [],
			scaleDescriptions: [],
			expandedTemperatureData: [],
		} as unknown as ReturnType<typeof useGetDailyScale>;

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(
			emptyArraysMockData
		);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { queryByTestId } = render(<WeatherScale />);

		const scaleLines = queryByTestId('weather-curve-line');
		const scaleDescriptions = queryByTestId('weather-curve-text');

		expect(scaleLines).toBeNull();
		expect(scaleDescriptions).toBeNull();

		const mainCurveElement = queryByTestId('main-curve');
		expect(mainCurveElement).toBeInTheDocument();
	});

	test('should handle the case when the units in temperatureScale or expandedTemperatureData are missing or invalid', () => {
		const missingUnitsMockData = null;

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(
			missingUnitsMockData as unknown as ReturnType<typeof useGetDailyScale>
		);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { container } = render(<WeatherScale />);

		const svgElement = container.querySelector('svg');
		expect(svgElement).toBeInTheDocument();
		expect(svgElement?.children.length).toBe(0);

		const scaleLines = container.querySelectorAll('[data-testid="weather-curve-line"]');
		const scaleDescriptions = container.querySelectorAll('[data-testid="weather-curve-text"]');

		expect(scaleLines.length).toBe(0);
		expect(scaleDescriptions.length).toBe(0);
	});
	test('should render the main curve correctly', () => {
		const mockData = {
			temperatureCurve: { mainCurve: 'M10 150 C 30 120, 70 90, 100 50' },
			temperatureScale: [],
			scaleDescriptions: [],
			expandedTemperatureData: [],
		} as unknown as ReturnType<typeof useGetDailyScale>;

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(mockData);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { getByTestId } = render(<WeatherScale />);

		const curveElement = getByTestId('main-curve');
		expect(curveElement).toHaveAttribute('d', mockData?.temperatureCurve.mainCurve);
	});
	test('should validate the data with Zod and render the component correctly', () => {
		const mockData = {
			temperatureCurve: { mainCurve: 'M10 150 C 30 120, 70 90, 100 50' },
			temperatureScale: [
				{ pY: 150, value: 0, units: '°C' },
				{ pY: 120, value: 10, units: '°C' },
				{ pY: 90, value: 20, units: '°C' },
				{ pY: 60, value: 30, units: '°C' },
			],
			scaleDescriptions: [
				{ x: 20, y: 140, value: 'Freezing' },
				{ x: 50, y: 110, value: 'Cool' },
				{ x: 80, y: 80, value: 'Warm' },
				{ x: 110, y: 50, value: 'Hot' },
			],
			expandedTemperatureData: [
				{ value: 0, units: '°C' },
				{ value: 10, units: '°C' },
				{ value: 20, units: '°C' },
				{ value: 30, units: '°C' },
			],
		};

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(
			mockData as unknown as ReturnType<typeof useGetDailyScale>
		);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { getByTestId, getAllByTestId } = render(<WeatherScale />);

		const curveElement = getByTestId('main-curve');
		expect(curveElement).toHaveAttribute('d', mockData.temperatureCurve.mainCurve);

		const scaleLines = getAllByTestId('weather-curve-line');
		const scaleDescriptions = getAllByTestId('weather-curve-text');

		expect(scaleLines).toHaveLength(
			mockData.temperatureScale.length + mockData.scaleDescriptions.length
		);
		expect(scaleDescriptions).toHaveLength(
			mockData.temperatureScale.length + mockData.scaleDescriptions.length
		);
	});

	test('should render the correct number of scale lines and descriptions based on the temperatureScale array length', () => {
		const mockData = {
			temperatureCurve: { mainCurve: 'M10 150 C 30 120, 70 90, 100 50' },
			temperatureScale: [
				{ pY: 150, value: 0, units: '°C' },
				{ pY: 120, value: 10, units: '°C' },
				{ pY: 90, value: 20, units: '°C' },
				{ pY: 60, value: 30, units: '°C' },
			],
			scaleDescriptions: [
				{ x: 20, y: 140, value: 'Freezing' },
				{ x: 50, y: 110, value: 'Cool' },
				{ x: 80, y: 80, value: 'Warm' },
				{ x: 110, y: 50, value: 'Hot' },
			],
			expandedTemperatureData: [
				{ value: 0, units: '°C' },
				{ value: 10, units: '°C' },
				{ value: 20, units: '°C' },
				{ value: 30, units: '°C' },
			],
		} as unknown as ReturnType<typeof useGetDailyScale>;

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(mockData);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { getAllByTestId } = render(<WeatherScale />);

		const scaleLines = getAllByTestId('weather-curve-line');
		const scaleDescriptions = getAllByTestId('weather-curve-text');

		const expectedLength =
			(mockData?.temperatureScale?.length ?? 0) + (mockData?.scaleDescriptions?.length ?? 0);
		expect(scaleLines).toHaveLength(expectedLength);
		expect(scaleDescriptions).toHaveLength(expectedLength);
	});

	test('should handle the case when Zod validation fails', () => {
		// Mock data that does not conform to the Zod schema
		const invalidMockData = {
			temperatureCurve: { mainCurve: 123 }, // Invalid type
			temperatureScale: [{ pY: 'invalid', value: 'invalid', units: 123 }], // Invalid types
			scaleDescriptions: [{ x: 'invalid', y: 'invalid', value: 123 }], // Invalid types
			expandedTemperatureData: [{ value: 'invalid', units: 123 }], // Invalid types
		} as unknown as ReturnType<typeof useGetDailyScale>;

		(useGetDailyScale as MockedFunction<typeof useGetDailyScale>).mockReturnValue(invalidMockData);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { container } = render(<WeatherScale />);
		const svgElement = container.querySelector('svg');
		expect(svgElement).toBeInTheDocument();
		expect(svgElement?.children.length).toBe(0);
	});
});
