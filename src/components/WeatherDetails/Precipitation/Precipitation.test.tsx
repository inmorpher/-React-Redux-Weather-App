import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React, { useRef } from 'react';
import { MockedFunction, vi } from 'vitest';
import { MinutelyWeather } from '../../../api/weather.type';
import { useGetPrecipitationInfo, useWeatherData } from '../../../context/WeatherData.context';
import { IPrecipitationInfo } from '../../../context/WeatherData.types';
import { usePrecipitation } from '../../../hooks/usePrecipitation';
import { AxisType, CurveType, TimeLineCoords } from '../../../utils/services/curves/types';
import withLoading from '../../UI/WithLoading';
import CurveComponent from './CurveComponent';
import { Precipitation } from './Precipitation';

vi.mock('../../../context/WeatherData.context', () => ({
	useGetPrecipitationInfo: vi.fn(),
	useWeatherData: vi.fn(() => {
		return {
			status: 'success',
			weatherData: undefined,
			error: null,
		};
	}),
}));

vi.mock('../../../hooks/usePrecipitation', () => ({
	usePrecipitation: vi.fn(() => ({
		wrapperRef: useRef(null),
		curve: { mainCurve: 'M0,0 L10,10', backPathCurve: 'M0,0 L10,10' },
		gradientColors: ['#000', '#fff'],
		timeLine: [
			{ time: '12:00', value: 0, x: 1, y: 2, y2: 3 },
			{ time: '13:00', value: 10, x: 1, y: 2, y2: 3 },
			{ time: '14:00', value: 20, x: 1, y: 2, y2: 3 },
		],
		axis: [{ label: '0', value: 0 }],
		dimension: { width: 100, height: 100 },
		hasPrecipitation: true,
	})),
}));

describe('Precipitation', () => {
	test('should render the precipitation chart when valid data is provided', () => {
		const mockPrecipitationData: IPrecipitationInfo = {
			// Mock valid precipitation data
			locationTimezone: 'America/New_York',
			hasPrecipitation: true,
			minutelyForecast: [{ dt: 1668659600, precipitation: 0.1 }],
		};

		const { getByText, getByRole, getByTestId } = render(
			<Precipitation data={mockPrecipitationData} />
		);

		const gradientElement = getByRole('definition', { name: /gradient-mask/i });
		const timeLineElement = getByText('12:00');
		const axisElement = getByText('0');
		const curveElement = getByTestId('precipitation-curve');
		const curveMainPathElement = getByTestId('main-path');
		const curveBackPathElement = getByTestId('back-path');
		const precipitationContainerElement = getByTestId('precipitation-container');

		expect(gradientElement).toBeInTheDocument();
		expect(timeLineElement).toBeInTheDocument();
		expect(axisElement).toBeInTheDocument();
		expect(curveElement).toBeInTheDocument();
		expect(curveMainPathElement).toBeInTheDocument();
		expect(curveBackPathElement).toBeInTheDocument();
		expect(precipitationContainerElement).toBeInTheDocument();
		expect(precipitationContainerElement).toHaveAttribute('viewBox', '0 0 100 100');
		expect(precipitationContainerElement).not.toHaveClass('opacity-30');
		expect(precipitationContainerElement).not.toBeEmptyDOMElement();
	});

	test('should handle gracefully when no precipitation data is provided', () => {
		(usePrecipitation as MockedFunction<typeof usePrecipitation>).mockReturnValue(
			undefined as unknown as ReturnType<typeof usePrecipitation>
		);
		const { getByText, queryByTestId } = render(
			<Precipitation data={undefined as unknown as IPrecipitationInfo} />
		);

		expect(getByText('Precipitation data unavailable')).toBeInTheDocument();
		expect(queryByTestId('precipitation-container')).toBeNull();
	});

	test('should handle if precipitation isPrecipitation is false', () => {
		const mockPrecipitationData: IPrecipitationInfo = {
			// Mock precipitation data where hasPrecipitation is false
			locationTimezone: 'America/New_York',
			hasPrecipitation: true,
			minutelyForecast: [{ dt: 1668659600, precipitation: 0.1 }],
		};

		(usePrecipitation as MockedFunction<typeof usePrecipitation>).mockReturnValue({
			wrapperRef: { current: null },
			curve: { mainCurve: 'M0,0 L10,10', backPathCurve: 'M0,0 L10,10' },
			gradientColors: [
				{ min: 0, max: 1, color: '#000' },
				{ min: 1, max: 1, color: '#fff' },
			],
			timeLine: [
				{ time: '13:00', description: 'rain', x: 2, y: 2, y2: 3 },
				{ time: '14:00', description: 'rain', x: 2, y: 2, y2: 3 },
				{ time: '15:00', description: 'rain', x: 2, y: 2, y2: 3 },
			],
			axis: [{ y: 1, length: 10, value: 2 }],
			dimension: { width: 100, height: 100 },
			hasPrecipitation: false,
			isWrapper: false,
		});

		const { getByTestId } = render(<Precipitation data={mockPrecipitationData} />);

		const precipitationContainerElement = getByTestId('precipitation-container');

		expect(precipitationContainerElement).toBeInTheDocument();
		expect(precipitationContainerElement).toHaveAttribute('viewBox', '0 0 100 100');
		expect(precipitationContainerElement).toHaveClass('opacity-30');
		expect(precipitationContainerElement).not.toBeEmptyDOMElement();
	});

	test('should handle if locationTimezone is not provided', () => {
		const mockPrecipitationData: IPrecipitationInfo = {
			// Mock precipitation data where hasPrecipitation is false
			locationTimezone: 'America/New_York',
			hasPrecipitation: true,
			minutelyForecast: [{ dt: 1668659600, precipitation: 0.1 }],
		};

		(usePrecipitation as MockedFunction<typeof usePrecipitation>).mockReturnValue({
			wrapperRef: { current: null },
			curve: { mainCurve: 'M0,0 L10,10', backPathCurve: 'M0,0 L10,10' },
			gradientColors: [
				{ min: 0, max: 1, color: '#000' },
				{ min: 1, max: 1, color: '#fff' },
			],
			timeLine: undefined as unknown as TimeLineCoords[],
			axis: [{ y: 1, length: 10, value: 2 }],
			dimension: { width: 100, height: 100 },
			hasPrecipitation: false,
			isWrapper: false,
		});

		const { getByTestId } = render(<Precipitation data={mockPrecipitationData} />);

		expect(getByTestId('vertical-time-axis')).toBeInTheDocument();
		expect(getByTestId('vertical-time-axis')).toBeEmptyDOMElement();
	});

	test('should handle when minutelyForecast is not provided', () => {
		const mockPrecipitationData: IPrecipitationInfo = {
			// Mock precipitation data where hasPrecipitation is false
			locationTimezone: 'America/New_York',
			hasPrecipitation: true,
			minutelyForecast: undefined as unknown as MinutelyWeather[],
		};

		(usePrecipitation as MockedFunction<typeof usePrecipitation>).mockReturnValue({
			wrapperRef: { current: null },
			curve: { mainCurve: 'M0,0 L10,10', backPathCurve: 'M0,0 L10,10' },
			gradientColors: [
				{ min: 0, max: 1, color: '#000' },
				{ min: 1, max: 1, color: '#fff' },
			],
			timeLine: undefined as unknown as TimeLineCoords[],
			axis: undefined as unknown as AxisType[],
			dimension: { width: 100, height: 100 },
			hasPrecipitation: false,
			isWrapper: false,
		});

		const { getByTestId } = render(<Precipitation data={mockPrecipitationData} />);

		const axisElement = getByTestId('horizontal-axis-lines');

		expect(axisElement).toBeInTheDocument();
		expect(axisElement).toBeEmptyDOMElement();
	});

	test('should handle when curve is not provided', () => {
		const mockPrecipitationData: IPrecipitationInfo = {
			// Mock precipitation data where hasPrecipitation is false
			locationTimezone: 'America/New_York',
			hasPrecipitation: true,
			minutelyForecast: [{ dt: 1668659600, precipitation: 0.1 }],
		};

		(usePrecipitation as MockedFunction<typeof usePrecipitation>).mockReturnValue({
			wrapperRef: { current: null },
			curve: undefined as unknown as CurveType,
			gradientColors: [
				{ min: 0, max: 1, color: '#000' },
				{ min: 1, max: 1, color: '#fff' },
			],
			timeLine: [
				{ time: '13:00', description: 'rain', x: 2, y: 2, y2: 3 },
				{ time: '14:00', description: 'rain', x: 2, y: 2, y2: 3 },
				{ time: '15:00', description: 'rain', x: 2, y: 2, y2: 3 },
			],
			axis: [{ y: 1, length: 10, value: 2 }],
			dimension: { width: 100, height: 100 },
			hasPrecipitation: false,
			isWrapper: true,
		});

		const { getByTestId } = render(<Precipitation data={mockPrecipitationData} />);

		const curveElement = getByTestId('precipitation-curve');

		expect(curveElement).toBeInTheDocument();
		expect(curveElement).toBeEmptyDOMElement();
	});

	test('curve component handles when mainCurve is not provided', () => {
		const { getByTestId } = render(<CurveComponent mainCurve={undefined as unknown as string} />);
		expect(getByTestId('precipitation-curve')).toBeInTheDocument();
		expect(getByTestId('precipitation-curve')).toBeEmptyDOMElement();
	});

	test('curve component handles when backPathCurve is not provided', () => {
		const { getByTestId } = render(
			<svg>
				<CurveComponent mainCurve='M0,0 L10,10' backCurve={undefined as unknown as string} />
			</svg>
		);
		expect(getByTestId('precipitation-curve')).toBeInTheDocument();
		expect(getByTestId('main-path')).toBeInTheDocument();
		expect(getByTestId('main-path')).toHaveAttribute('d', 'M0,0 L10,10');
	});

	test('curve can handle ref statement correctly', () => {
		const ref = React.createRef<SVGSVGElement>();
		const { getByTestId } = render(
			<svg ref={ref}>
				<CurveComponent mainCurve='M0,0 L10,10' backCurve='M0,10 L10,0' />
			</svg>
		);
		expect(ref.current).toBeInstanceOf(SVGSVGElement);
		expect(getByTestId('precipitation-curve')).toBeInTheDocument();
		expect(getByTestId('main-path')).toBeInTheDocument();
		expect(getByTestId('main-path')).toHaveAttribute('d', 'M0,0 L10,10');
		expect(getByTestId('back-path')).toBeInTheDocument();
		expect(getByTestId('back-path')).toHaveAttribute('d', 'M0,10 L10,0');
	});

	test('should handle empty mainCurve gracefully', () => {
		const { getByTestId } = render(<CurveComponent mainCurve='' />);

		expect(getByTestId('precipitation-curve')).toBeInTheDocument();
		expect(getByTestId('main-path')).toBeInTheDocument();
		expect(getByTestId('main-path')).toHaveAttribute('d', '0');
	});

	test('should handle correctly with valid data thought withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			weatherData: undefined,
			status: 'success',
			error: null,
		});
		(useGetPrecipitationInfo as MockedFunction<typeof useGetPrecipitationInfo>).mockReturnValue({
			locationTimezone: 'America/New_York',
			hasPrecipitation: true,
			minutelyForecast: [{ dt: 1668659600, precipitation: 0.1 }],
		});
		(usePrecipitation as MockedFunction<typeof usePrecipitation>).mockReturnValue({
			wrapperRef: { current: null },
			curve: { mainCurve: 'M0,0 L10,10', backPathCurve: 'M0,0 L10,10' },
			gradientColors: [
				{ min: 0, max: 1, color: '#000' },
				{ min: 1, max: 1, color: '#fff' },
			],
			timeLine: [
				{ time: '13:00', description: 'rain', x: 2, y: 2, y2: 3 },
				{ time: '14:00', description: 'rain', x: 2, y: 2, y2: 3 },
				{ time: '15:00', description: 'rain', x: 2, y: 2, y2: 3 },
			],
			axis: [{ y: 1, length: 10, value: 2 }],
			dimension: { width: 100, height: 100 },
			hasPrecipitation: true,
			isWrapper: true,
		});

		const WrappedPrecipitation = withLoading<{}, IPrecipitationInfo>(
			Precipitation,
			useGetPrecipitationInfo
		);
		const { getByText, getByRole, getByTestId } = render(<WrappedPrecipitation />);

		const gradientElement = getByRole('definition', { name: /gradient-mask/i });
		const timeLineElement = getByText('13:00');
		const axisElement = getByText('2');
		const curveElement = getByTestId('precipitation-curve');
		const curveMainPathElement = getByTestId('main-path');
		const curveBackPathElement = getByTestId('back-path');
		const precipitationContainerElement = getByTestId('precipitation-container');

		expect(gradientElement).toBeInTheDocument();
		expect(timeLineElement).toBeInTheDocument();
		expect(axisElement).toBeInTheDocument();
		expect(curveElement).toBeInTheDocument();
		expect(curveMainPathElement).toBeInTheDocument();
		expect(curveBackPathElement).toBeInTheDocument();
		expect(precipitationContainerElement).toBeInTheDocument();
		expect(precipitationContainerElement).toHaveAttribute('viewBox', '0 0 100 100');
		expect(precipitationContainerElement).not.toHaveClass('opacity-30');
		expect(precipitationContainerElement).not.toBeEmptyDOMElement();
	});

	test('should handle loading state withLoading component', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			weatherData: undefined,
			status: 'pending',
			error: null,
		});
		(useGetPrecipitationInfo as MockedFunction<typeof useGetPrecipitationInfo>).mockReturnValue(
			undefined
		);
		const WrappedPrecipitation = withLoading<{}, IPrecipitationInfo>(
			Precipitation,
			useGetPrecipitationInfo
		);
		const { getByRole } = render(<WrappedPrecipitation />);

		expect(getByRole('img', { name: /loader/i })).toBeInTheDocument();
	});

	test('should handle error state with error component thought withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			weatherData: undefined,
			status: 'error',
			error: null,
		});
		(useGetPrecipitationInfo as MockedFunction<typeof useGetPrecipitationInfo>).mockReturnValue(
			undefined
		);
		const WrappedPrecipitation = withLoading<{}, IPrecipitationInfo>(
			Precipitation,
			useGetPrecipitationInfo
		);
		const { getByRole } = render(<WrappedPrecipitation />);

		expect(getByRole('img', { name: /error-placeholder/i })).toBeInTheDocument();
	});
});
