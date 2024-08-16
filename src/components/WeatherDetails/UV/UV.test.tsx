import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetUvi, useWeatherData } from '../../../context/WeatherData.context';
import { ScaleReturn, ScaleType } from '../../../utils/services/definitions/svgScale.definition';
import withLoading from '../../UI/WithLoading';
import { UV } from './UV';

vi.mock('../../../context/WeatherData.context', () => ({
	useGetUvi: vi.fn(),
	useWeatherData: vi.fn(() => {
		return {
			status: 'success',
			weatherData: undefined,
			error: null,
		};
	}),
}));

describe('UV', () => {
	test('should render the UV index with the correct data', () => {
		const mockUviData: ScaleReturn = {
			values: { value: 5, level: 'Moderate', color: '#ffcc00' },
			colors: ['#ffcc00', '#ffff00', '#ff9900'],
		};

		const { getByText, getByRole } = render(<UV data={mockUviData} />);

		const valueElement = getByText('5');
		const levelElement = getByText('Moderate');
		const svgElement = getByRole('img', { name: /UV Index/i });

		expect(valueElement).toBeInTheDocument();
		expect(levelElement).toBeInTheDocument();
		expect(svgElement).toBeInTheDocument();
	});

	test('should render the UV component with default color when values.color is undefined', () => {
		(useGetUvi as MockedFunction<typeof useGetUvi>).mockReturnValue({
			values: { value: 5, level: 'Moderate', color: undefined },
			colors: ['#ffcc00', '#ffff00', '#ff9900'],
		});

		const mockUviData = {
			values: { value: 5, level: 'Moderate', color: undefined },
			colors: ['#ffcc00', '#ffff00', '#ff9900'],
		};

		const { getByText } = render(<UV data={mockUviData} />);

		const valueElement = getByText('5');
		expect(valueElement).toBeInTheDocument();
		expect(valueElement).toHaveStyle({ color: '#ffffff' });
	});

	test('should display "0" when values.value is undefined', () => {
		const mockUviData = {
			values: { value: undefined, level: 'Moderate', color: '#ffcc00' },
			colors: ['#ffcc00', '#ffff00', '#ff9900'],
		};

		const { getByText } = render(<UV data={mockUviData} />);

		const valueElement = getByText('0');
		expect(valueElement).toBeInTheDocument();
	});
	test('should display "N/A" when values.level is undefined', () => {
		// (useGetUvi as MockedFunction<typeof useGetUvi>).mockReturnValue({
		// 	values: { value: 5, level: undefined, color: '#ffcc00' },
		// 	colors: ['#ffcc00', '#ffff00', '#ff9900'],
		// });

		const mockUviData = {
			values: { value: 5, level: undefined, color: '#ffcc00' },
			colors: ['#ffcc00', '#ffff00', '#ff9900'],
		};

		const { getByText } = render(<UV data={mockUviData} />);

		const levelElement = getByText('N/A');
		expect(levelElement).toBeInTheDocument();
	});
	test('should apply the correct color from values.color when it is defined', () => {
		const mockUviData: ScaleReturn = {
			values: { value: 0, level: 'Moderate', color: '#ffcc00' },
			colors: ['#ffcc00', '#ffff00', '#ff9900'],
		};

		const { getByText } = render(<UV data={mockUviData} />);

		const valueElement = getByText('0');
		expect(valueElement).toBeInTheDocument();
		expect(valueElement).toHaveStyle({ color: '#ffcc00' });
	});

	test('should render the SvgScale component with the correct data and type', () => {
		const mockUviData: ScaleReturn = {
			values: { value: 5, level: 'Moderate', color: '#ffcc00' },
			colors: ['#ffcc00', '#ffff00', '#ff9900'],
		};

		const { getByRole } = render(<UV data={mockUviData} />);

		const svgScaleElement = getByRole('img', { name: /UV Index/i });
		expect(svgScaleElement).toBeInTheDocument();
		expect(svgScaleElement).toHaveAttribute('data-type', ScaleType.uvi);
	});

	test('should handle the case where values and colors are both undefined', () => {
		(useGetUvi as MockedFunction<typeof useGetUvi>).mockReturnValue({
			values: undefined,
			colors: undefined,
		});

		const mockUviData = {
			values: undefined,
			colors: undefined,
		};

		const { getByText } = render(<UV data={mockUviData} />);

		const valueElement = getByText('N/A');
		const levelElement = getByText('0');

		expect(valueElement).toBeInTheDocument();
		expect(levelElement).toBeInTheDocument();
	});

	test('should render component with valid data passed through withLoading', () => {
		(useGetUvi as MockedFunction<typeof useGetUvi>).mockReturnValue({
			values: { value: 5, level: 'Moderate', color: '#ffcc00' },
			colors: ['#ffcc00', '#ffff00', '#ff9900'],
		});

		const WrappedUV = withLoading<{}, ScaleReturn>(UV, useGetUvi);

		const { getByText, getByRole } = render(<WrappedUV />);

		const valueElement = getByText('5');
		const levelElement = getByText('Moderate');
		const svgElement = getByRole('img', { name: /UV Index/i });

		expect(valueElement).toBeInTheDocument();
		expect(levelElement).toBeInTheDocument();
		expect(svgElement).toBeInTheDocument();
	});

	test('should render the loading state when the data is being fetched through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'pending',
			weatherData: undefined,
			error: null,
		});

		const WrappedUV = withLoading<{}, ScaleReturn>(UV, useGetUvi);
		const { getByRole } = render(<WrappedUV />);

		expect(getByRole('img', { name: /loader/i })).toBeInTheDocument();
	});

	test('should render the error component when status is error   through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'error',
			weatherData: undefined,
			error: null,
		});

		const WrappedUV = withLoading<{}, ScaleReturn>(UV, useGetUvi);
		const { getByRole } = render(<WrappedUV />);

		expect(getByRole('img', { name: /error-placeholder/i })).toBeInTheDocument();
	});

	test('should render the component when status is success but data undefined  through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'success',
			weatherData: undefined,
			error: null,
		});
		(useGetUvi as MockedFunction<typeof useGetUvi>).mockReturnValue(undefined);
		const WrappedUV = withLoading<{}, ScaleReturn>(UV, useGetUvi);
		const { getByRole } = render(<WrappedUV />);

		expect(getByRole('img', { name: /error-placeholder/i })).toBeInTheDocument();
	});
});
