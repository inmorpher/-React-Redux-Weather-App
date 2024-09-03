import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { expect, MockedFunction, vi } from 'vitest';
import { useGetPressureInfo, useWeatherData } from '../../../context/WeatherData.context';
import { IPressureDefinition } from '../../../utils/services/definitions/pressure.definition';
import withLoading from '../../UI/WithLoading';
import { Pressure } from './Pressure';

vi.mock('../../../context/WeatherData.context', () => ({
	useGetPressureInfo: vi.fn(),
	useWeatherData: vi.fn(() => {
		return {
			status: 'success',
			weatherData: undefined,
			error: null,
		};
	}),
}));

describe('Pressure', () => {
	test('should render the component correctly with valid data', () => {
		const mockPressureData: IPressureDefinition = {
			coords: [{ x1: 0.5, y1: 0.5, x2: 0.5, y2: 0.5 }],
			angle: 180,
			pressure: 1020,
		};

		const { getByText, getByRole } = render(<Pressure data={mockPressureData} />);

		const pressureValueElement = getByText('1020hpa');
		const indicatorElement = getByRole('img', { name: /pressure-icon/i });

		expect(pressureValueElement).toBeInTheDocument();
		expect(indicatorElement).toBeInTheDocument();
	});

	test('should render pressure indicator with correct coordinates and angle', () => {
		const mockPressureData: IPressureDefinition = {
			coords: [{ x1: 0.5, y1: 0.5, x2: 0.5, y2: 0.5 }],
			angle: 180,
			pressure: 1020,
		};

		const { getByTestId } = render(<Pressure data={mockPressureData} />);

		const indicatorElement = getByTestId(/pressure-indicator/i);

		expect(indicatorElement).toHaveStyle('transform: rotate(180deg)');
	});

	test('should handle missing pressure data gracefully', () => {
		const mockPressureData: IPressureDefinition = {
			coords: [{ x1: 0.5, y1: 0.5, x2: 0.5, y2: 0.5 }],
			angle: 180,
			pressure: undefined as unknown as number,
		};

		const { getByRole } = render(<Pressure data={mockPressureData} />);

		const descriptionElement = getByRole('presentation');

		expect(descriptionElement).toBeInTheDocument();
		expect(descriptionElement).toHaveTextContent('N/A');
	});

	test('should handle gracefully missing coords data', () => {
		const mockPressureData: IPressureDefinition = {
			coords: undefined as unknown as Array<{ x1: number; y1: number; x2: number; y2: number }>,
			angle: 180,
			pressure: 1020,
		};

		const { getByTestId } = render(<Pressure data={mockPressureData} />);

		const scaleElement = getByTestId('pressure-scale');
		let indicatorElement;
		try {
			indicatorElement = getByTestId('pressure-indicator');
		} catch (error) {
			indicatorElement = null;
		}

		expect(scaleElement).toBeInTheDocument();
		expect(scaleElement).toBeEmptyDOMElement();
		expect(indicatorElement).toBeFalsy();
	});

	test('should handle gracefully missing angle data', () => {
		const mockPressureData: IPressureDefinition = {
			coords: [{ x1: 0.5, y1: 0.5, x2: 0.5, y2: 0.5 }],
			angle: undefined as unknown as number,
			pressure: 1020,
		};

		const { getByLabelText } = render(<Pressure data={mockPressureData} />);

		let indicatorElement;
		try {
			indicatorElement = getByLabelText('pressure-indicator');
		} catch (error) {
			indicatorElement = null;
		}

		expect(indicatorElement).toBeFalsy();
	});

	test('should render component correctly with data provided thought withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'success',
			weatherData: undefined,
			error: null,
		});

		(useGetPressureInfo as MockedFunction<typeof useGetPressureInfo>).mockReturnValue({
			coords: [{ x1: 0.5, y1: 0.5, x2: 0.5, y2: 0.5 }],
			angle: 180,
			pressure: 1020,
		});

		const WrappedPressure = withLoading<{}, IPressureDefinition>(Pressure, useGetPressureInfo);

		const { getByText, getByRole } = render(<WrappedPressure />);

		const pressureValueElement = getByText('1020hpa');
		const indicatorElement = getByRole('img', { name: /pressure-icon/i });

		expect(pressureValueElement).toBeInTheDocument();
		expect(indicatorElement).toBeInTheDocument();
	});

	test('should render loading state thought withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'pending',
			weatherData: undefined,
			error: null,
		});

		(useGetPressureInfo as MockedFunction<typeof useGetPressureInfo>).mockReturnValue({
			coords: [{ x1: 0.5, y1: 0.5, x2: 0.5, y2: 0.5 }],
			angle: 180,
			pressure: 1020,
		});

		const WrappedPressure = withLoading<{}, IPressureDefinition>(Pressure, useGetPressureInfo);

		const { getByRole } = render(<WrappedPressure />);

		expect(getByRole('img', { name: /loader/i })).toBeInTheDocument();
	});

	test('should render error state thought wittLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'error',
			weatherData: undefined,
			error: null,
		});

		(useGetPressureInfo as MockedFunction<typeof useGetPressureInfo>).mockReturnValue({
			coords: [{ x1: 0.5, y1: 0.5, x2: 0.5, y2: 0.5 }],
			angle: 180,
			pressure: 1020,
		});

		const WrappedPressure = withLoading<{}, IPressureDefinition>(Pressure, useGetPressureInfo);

		const { getByRole } = render(<WrappedPressure />);

		expect(getByRole('img', { name: /error-placeholder/i })).toBeInTheDocument();
	});
});
