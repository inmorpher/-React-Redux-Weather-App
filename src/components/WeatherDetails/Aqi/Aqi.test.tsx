import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetAqi, useWeatherData } from '../../../context/WeatherData.context';
import { ScaleReturn } from '../../../utils/services/definitions/svgScale.definition';
import withLoading from '../../UI/WithLoading';
import { Aqi } from './Aqi';

vi.mock('../../../context/WeatherData.context', () => ({
	useGetAqi: vi.fn(),
	useWeatherData: vi.fn(() => {
		return {
			status: 'success',
			weatherData: undefined,
			error: null,
		};
	}),
}));

describe('Aqi', () => {
	test('should render the AQI index with correct data', () => {
		const mockAqiData: ScaleReturn = {
			values: { value: 2, level: 'Moderate', color: '#ffcc00' },
			colors: ['#ffcc00', '#ffff00', '#ff9900'],
		};

		const { getByText, getByRole } = render(<Aqi data={mockAqiData} />);

		const valueElement = getByText('2');
		const levelElement = getByText('Moderate');
		const svgElement = getByRole('img', { name: /Air Quality Index/i });

		expect(valueElement).toBeInTheDocument();
		expect(levelElement).toBeInTheDocument();
		expect(svgElement).toBeInTheDocument();
	});

	test('should handle and display AQI data with a value of zero', () => {
		const mockAqiData: ScaleReturn = {
			values: { value: 0, level: 'Good', color: '#00e400' },
			colors: ['#00e400', '#ffff00', '#ff9900'],
		};

		const { getByText, getByRole } = render(<Aqi data={mockAqiData} />);

		const valueElement = getByText('0');
		const levelElement = getByText('Good');
		const svgElement = getByRole('img', { name: /Air Quality Index/i });

		expect(valueElement).toBeInTheDocument();
		expect(levelElement).toBeInTheDocument();
		expect(svgElement).toBeInTheDocument();
	});

	test('should handle and display AQI data with a negative value', () => {
		const mockAqiData: ScaleReturn = {
			values: { value: -5, level: 'Invalid', color: '#ff0000' },
			colors: ['#ff0000', '#ffff00', '#ff9900'],
		};

		const { getByText, getByRole } = render(<Aqi data={mockAqiData} />);

		const valueElement = getByText('-5');
		const levelElement = getByText('Invalid');
		const svgElement = getByRole('img', { name: /Air Quality Index/i });

		expect(valueElement).toBeInTheDocument();
		expect(levelElement).toBeInTheDocument();
		expect(svgElement).toBeInTheDocument();
	});

	test('should handle and display AQI data with a very high value', () => {
		const mockAqiData: ScaleReturn = {
			values: { value: 500, level: 'Hazardous', color: '#7e0023' },
			colors: ['#7e0023', '#ffff00', '#ff9900'],
		};

		const { getByText, getByRole } = render(<Aqi data={mockAqiData} />);

		const valueElement = getByText('500');
		const levelElement = getByText('Hazardous');
		const svgElement = getByRole('img', { name: /Air Quality Index/i });

		expect(valueElement).toBeInTheDocument();
		expect(levelElement).toBeInTheDocument();
		expect(svgElement).toBeInTheDocument();
	});

	test('should handle correct render when AQI data is not available', () => {
		const mockAqiData = undefined;
		const { getByText, queryByText, getByRole } = render(
			<Aqi data={mockAqiData as unknown as ScaleReturn} />
		);

		const valueElement = getByText('N/A');
		const levelElement = queryByText('Level');
		const svgElement = getByRole('img', { name: /Air Quality Index/i }) as HTMLElement | null;

		expect(valueElement).toBeInTheDocument();
		expect(levelElement).toBeNull();
		expect(svgElement).not.toBeNull();
	});

	test('should handle correct render when AQI data is invalid', () => {
		const mockAqiData = {
			values: {},
			colors: [],
		};
		const { getByText, queryByText, getByRole } = render(<Aqi data={mockAqiData} />);

		const valueElement = getByText('N/A');
		const levelElement = queryByText('Level');
		const svgElement = getByRole('img', { name: /Air Quality Index/i }) as HTMLElement | null;

		expect(valueElement).toBeInTheDocument();
		expect(levelElement).toBeNull();
		expect(svgElement).not.toBeNull();
	});

	test('should render correctly when AQI data is available and passed through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'success',
			weatherData: undefined,
			error: null,
		});
		(useGetAqi as MockedFunction<typeof useGetAqi>).mockReturnValue({
			values: { value: 5, level: 'high', color: '#7e0023' },
			colors: ['#7e0023', '#ffff00', '#ff9900'],
		});

		const WrappedAQI = withLoading(Aqi, useGetAqi);
		const { getByText, getByRole } = render(<WrappedAQI />);

		const valueElement = getByText('5');
		const levelElement = getByText('high');
		const svgElement = getByRole('img', { name: /Air Quality Index/i });

		expect(valueElement).toBeInTheDocument();
		expect(levelElement).toBeInTheDocument();
		expect(svgElement).toBeInTheDocument();
	});

	test('should render correctly when loading element while fetching through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'pending',
			weatherData: undefined,
			error: null,
		});
		(useGetAqi as MockedFunction<typeof useGetAqi>).mockReturnValue({});

		const WrappedAQI = withLoading(Aqi, useGetAqi);
		const { getByRole } = render(<WrappedAQI />);

		const loadingElement = getByRole('img', { name: /loader/i });

		expect(loadingElement).toBeInTheDocument();
	});

	test('should render correctly when status is error through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'error',
			weatherData: undefined,
			error: null,
		});
		(useGetAqi as MockedFunction<typeof useGetAqi>).mockReturnValue({});

		const WrappedAQI = withLoading(Aqi, useGetAqi);
		const { getByRole } = render(<WrappedAQI />);

		const errorElement = getByRole('img', { name: /error-placeholder/i });

		expect(errorElement).toBeInTheDocument();
	});
});
