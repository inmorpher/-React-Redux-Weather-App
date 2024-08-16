import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetMainWeather, useWeatherData } from '../../context/WeatherData.context';
import { IMainWeather } from '../../context/WeatherData.types';
import withLoading from '../UI/WithLoading';
import { MainWeather } from './MainWeather';

vi.mock('../../context/WeatherData.context', () => ({
	useGetMainWeather: vi.fn(),
	useGetWeatherIconInfo: vi.fn(),
	useWeatherData: vi.fn(),
}));

describe('MainWeather', () => {
	test('should render the correct temperature value and units', () => {
		const mockData = {
			temperature: { value: 25, units: '°C' },
			condition: 'Sunny',
			minTemperature: { value: 20, units: '°C' },
			maxTemperature: { value: 30, units: '°C' },
			cloudCoverage: 10,
		};

		const { getByText } = render(<MainWeather data={mockData} />);

		const temperatureElement = getByText('25°C');
		expect(temperatureElement).toBeInTheDocument();
	});

	test('should render the correct minimum and maximum temperature values and units', () => {
		const mockData = {
			temperature: { value: 25, units: '°C' },
			condition: 'Sunny',
			minTemperature: { value: 20, units: '°C' },
			maxTemperature: { value: 30, units: '°C' },
			cloudCoverage: 10,
		};

		const { getByText } = render(<MainWeather data={mockData} />);

		const minTempElement = getByText(/20°C/i);
		const maxTempElement = getByText(/30°C/i);

		expect(minTempElement).toBeInTheDocument();
		expect(maxTempElement).toBeInTheDocument();
	});

	test('should render the correct condition text', () => {
		const mockData = {
			temperature: { value: 25, units: '°C' },
			condition: 'Sunny',
			minTemperature: { value: 20, units: '°C' },
			maxTemperature: { value: 30, units: '°C' },
			cloudCoverage: 10,
		};

		const { getByText } = render(<MainWeather data={mockData} />);

		const conditionElement = getByText('Sunny');
		expect(conditionElement).toBeInTheDocument();
	});

	test('should render the correct cloud coverage percentage', () => {
		const mockData = {
			temperature: { value: 25, units: '°C' },
			condition: 'Sunny',
			minTemperature: { value: 20, units: '°C' },
			maxTemperature: { value: 30, units: '°C' },
			cloudCoverage: 30,
		};

		const { getByText } = render(<MainWeather data={mockData} />);

		const cloudCoverageElement = getByText('clouds: 30%');
		expect(cloudCoverageElement).toBeInTheDocument();
	});

	test('should render the MainWeatherIcon component', () => {
		const mockData = {
			temperature: { value: 25, units: '°C' },
			condition: 'Sunny',
			minTemperature: { value: 20, units: '°C' },
			maxTemperature: { value: 30, units: '°C' },
			cloudCoverage: 10,
		};

		const { getByTestId } = render(<MainWeather data={mockData} />);

		const mainWeatherIconElement = getByTestId('dynamic icon');
		expect(mainWeatherIconElement).toBeInTheDocument();
	});

	test('should handle missing or undefined data gracefully', () => {
		(useGetMainWeather as MockedFunction<typeof useGetMainWeather>).mockReturnValue({
			temperature: undefined,
			condition: undefined,
			minTemperature: undefined,
			maxTemperature: undefined,
			cloudCoverage: undefined,
		} as unknown as IMainWeather);

		const { getByLabelText, getByTestId } = render(
			<MainWeather data={undefined as unknown as IMainWeather} />
		);

		const currentTemperatureElement = getByLabelText('main-current-temperature');
		const minMaxTemperatureElement = getByLabelText('main-min-max-temperatures');

		expect(currentTemperatureElement).toBeInTheDocument();
		expect(currentTemperatureElement).toHaveTextContent('N/A');

		expect(minMaxTemperatureElement).toBeInTheDocument();
		expect(minMaxTemperatureElement).toHaveTextContent('N/A/N/A');

		const mainWeatherIconElement = getByTestId('dynamic icon');
		expect(mainWeatherIconElement).toBeInTheDocument();
	});

	test('should handle empty or null data gracefully', () => {
		(useGetMainWeather as MockedFunction<typeof useGetMainWeather>).mockReturnValue({
			temperature: { value: null, units: null },
			condition: null,
			minTemperature: { value: null, units: null },
			maxTemperature: { value: null, units: null },
			cloudCoverage: null,
		} as unknown as IMainWeather);

		const { getByLabelText, queryByTestId } = render(
			<MainWeather data={undefined as unknown as IMainWeather} />
		);

		const currentTemperatureElement = getByLabelText('main-current-temperature');
		const minMaxTemperatureElement = getByLabelText('main-min-max-temperatures');

		expect(currentTemperatureElement).toBeInTheDocument();
		expect(currentTemperatureElement).toHaveTextContent('N/A');

		expect(minMaxTemperatureElement).toBeInTheDocument();
		expect(minMaxTemperatureElement).toHaveTextContent('N/A/N/A');

		const mainWeatherIconElement = queryByTestId('dynamic icon');
		expect(mainWeatherIconElement).toBeInTheDocument();
	});

	test('should render a loading state when data is fetching', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			weatherData: undefined,
			error: null,
			status: 'pending',
		});

		const WrappedComponent = withLoading<{}, IMainWeather>(MainWeather, useGetMainWeather);

		const { getByRole } = render(<WrappedComponent />);

		const loadingSpinner = getByRole('img', { name: 'loader' });
		expect(loadingSpinner).toBeInTheDocument();
	});

	test('should render an error state when there is an error fetching data', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			weatherData: undefined,
			error: new Error('Failed to fetch data'),
			status: 'error',
		});

		const WrappedComponent = withLoading<{}, IMainWeather>(MainWeather, useGetMainWeather);

		const { getByRole } = render(<WrappedComponent />);

		const errorElement = getByRole('img', { name: 'error-placeholder' });
		expect(errorElement).toBeInTheDocument();
	});
});
