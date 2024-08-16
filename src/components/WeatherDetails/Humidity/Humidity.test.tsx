import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetHumidityInfo, useWeatherData } from '../../../context/WeatherData.context';
import { IHumidityInfo } from '../../../context/WeatherData.types';
import withLoading from '../../UI/WithLoading';
import { Humidity } from './Humidity';

vi.mock('../../../context/WeatherData.context', () => ({
	useGetHumidityInfo: vi.fn(),
	useWeatherData: vi.fn(),
}));

describe('Humidity', () => {
	test('should render the humidity component with valid humidity and dew point data', () => {
		const mockHumidityInfo: IHumidityInfo = {
			humidity: 50,
			dewPoint: { value: 10, units: '°C' },
		};
		const { getByText } = render(<Humidity data={mockHumidityInfo} />);

		const humidityElement = getByText('50%');
		const dewPointElement = getByText('dew point: 10°C');

		expect(humidityElement).toBeInTheDocument();
		expect(dewPointElement).toBeInTheDocument();
	});

	test('should not render the dew point section if dew point data is missing', () => {
		const mockHumidityInfo: IHumidityInfo = {
			humidity: 50,
		};

		const { queryByText } = render(<Humidity data={mockHumidityInfo} />);

		const dewPointElement = queryByText(/dew point:/);
		expect(dewPointElement).not.toBeInTheDocument();
	});

	test('should handle rendering components when humidity is not provided ', () => {
		const mockHumidityInfo: IHumidityInfo = {
			humidity: undefined as unknown as number,
			dewPoint: { value: 10, units: '°C' },
		};

		const { queryByText } = render(<Humidity data={mockHumidityInfo} />);

		const dewPointElement = queryByText('N/A');
		expect(dewPointElement).toBeInTheDocument();
	});
	test('should render the humidity icon correctly within the component', () => {
		const mockHumidityInfo: IHumidityInfo = {
			humidity: undefined as unknown as number,
			dewPoint: { value: 10, units: '°C' },
		};

		const { getByRole } = render(<Humidity data={mockHumidityInfo} />);

		const iconElement = getByRole('humidity-icon');
		expect(iconElement).toBeInTheDocument();
	});

	test('should handle edge case where humidity is 0%', () => {
		const mockHumidityInfo: IHumidityInfo = {
			humidity: 0,
			dewPoint: { value: 10, units: '°C' },
		};

		const { getByText } = render(<Humidity data={mockHumidityInfo} />);

		const humidityElement = getByText('0%');
		expect(humidityElement).toBeInTheDocument();
	});

	test('should show a loading skeleton while fetching humidity data thought withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'pending',
			weatherData: undefined,
			error: null,
		});

		(useGetHumidityInfo as MockedFunction<typeof useGetHumidityInfo>).mockReturnValue(undefined);

		const WrappedHumidity = withLoading(Humidity, useGetHumidityInfo);
		const { getByRole } = render(<WrappedHumidity />);

		expect(getByRole('img', { name: /loader/i })).toBeInTheDocument();
	});

	test('should render the error component when status is error through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'error',
			weatherData: undefined,
			error: null,
		});

		(useGetHumidityInfo as MockedFunction<typeof useGetHumidityInfo>).mockReturnValue(undefined);

		const WrappedHumidity = withLoading(Humidity, useGetHumidityInfo);
		const { getByRole } = render(<WrappedHumidity />);

		expect(getByRole('img', { name: /error-placeholder/i })).toBeInTheDocument();
	});

	test('should render the humidity component with humidity data when status is success through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'success',
			weatherData: undefined,
			error: null,
		});

		(useGetHumidityInfo as MockedFunction<typeof useGetHumidityInfo>).mockReturnValue({
			humidity: 50,
			dewPoint: { value: 10, units: '°C' },
		});

		const WrappedHumidity = withLoading(Humidity, useGetHumidityInfo);
		const { getByText } = render(<WrappedHumidity />);

		const humidityElement = getByText('50%');
		const dewPointElement = getByText('dew point: 10°C');

		expect(humidityElement).toBeInTheDocument();
		expect(dewPointElement).toBeInTheDocument();
	});
});
