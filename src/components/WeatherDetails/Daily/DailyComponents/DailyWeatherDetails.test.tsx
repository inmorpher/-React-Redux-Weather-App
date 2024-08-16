import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetDailyForecastDetails } from '../../../../context/WeatherData.context';
import { useSelectedDayIndex } from '../../../../hooks/useDaily';
import DailyWeatherDetails from './DailyWeatherDetails';

vi.mock('../../../../context/WeatherData.context', () => ({
	useGetDailyForecastDetails: vi.fn(),
}));

vi.mock('../../../../hooks/useDaily', () => ({
	useSelectedDayIndex: vi.fn(),
}));

describe('DailyWeatherDetails', () => {
	test('should render "N/A" for missing or undefined weather data fields', () => {
		const mockData = {
			uvi: undefined,
			humidity: undefined,
			precipitation: {
				pop: 0,
				rain: undefined,
				snow: undefined,
			},
			wind: {
				gust: undefined,
				speed: {
					value: undefined,
					units: 'm/s',
				},
				direction: '',
			},
			pressure: undefined,
			clouds: undefined,
			summary: undefined,
		};

		(
			useGetDailyForecastDetails as MockedFunction<typeof useGetDailyForecastDetails>
		).mockReturnValue(mockData as unknown as ReturnType<typeof useGetDailyForecastDetails>);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { getByTestId } = render(<DailyWeatherDetails />);

		expect(getByTestId('daily-uvi')).toHaveTextContent('N/A');
		expect(getByTestId('daily-humidity')).toHaveTextContent('N/A');
		expect(getByTestId('daily-pressure')).toHaveTextContent('N/A');
		expect(getByTestId('daily-clouds')).toHaveTextContent('N/A');
		expect(getByTestId('daily-wind')).toHaveTextContent('N/A');
		expect(getByTestId('daily-wind-gust')).toHaveTextContent('N/A');
		expect(getByTestId('daily-precipitation')).toHaveTextContent('N/A');
		expect(getByTestId('daily-summary')).toHaveTextContent('No summary available');
	});

	test('should display correct units for wind speed and wind gust', () => {
		const mockData = {
			uvi: 5,
			humidity: 70,
			precipitation: {
				pop: 30,
				rain: 2.5,
				snow: undefined,
			},
			wind: {
				gust: {
					value: 15,
					units: 'm/s',
				},
				speed: {
					value: 8,
					units: 'km/h',
				},
				direction: 'NW',
			},
			pressure: 1010,
			clouds: 75,
			summary: 'Partly cloudy with a chance of rain',
		};

		(
			useGetDailyForecastDetails as MockedFunction<typeof useGetDailyForecastDetails>
		).mockReturnValue(mockData as unknown as ReturnType<typeof useGetDailyForecastDetails>);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { getByText } = render(<DailyWeatherDetails />);

		expect(getByText('8km/h')).toBeInTheDocument();
		expect(getByText('15m/s')).toBeInTheDocument();
	});

	test('should handle zero values for numerical weather data fields', () => {
		const mockData = {
			uvi: 0,
			humidity: 0,
			precipitation: {
				pop: 0,
				rain: 0,
				snow: 0,
			},
			wind: {
				gust: {
					value: 0,
					units: 'm/s',
				},
				speed: {
					value: 0,
					units: 'km/h',
				},
				direction: 'N',
			},
			pressure: 0,
			clouds: 0,
			summary: 'Clear skies',
		};

		(
			useGetDailyForecastDetails as MockedFunction<typeof useGetDailyForecastDetails>
		).mockReturnValue(mockData as unknown as ReturnType<typeof useGetDailyForecastDetails>);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { getByTestId } = render(<DailyWeatherDetails />);

		expect(getByTestId('daily-uvi')).toHaveTextContent('0');
		expect(getByTestId('daily-humidity')).toHaveTextContent('0');
		expect(getByTestId('daily-pressure')).toHaveTextContent('0');
		expect(getByTestId('daily-clouds')).toHaveTextContent('0');
		expect(getByTestId('daily-wind')).toHaveTextContent('0');
		expect(getByTestId('daily-wind-gust')).toHaveTextContent('0');
		expect(getByTestId('daily-precipitation')).toHaveTextContent('0');
		expect(getByTestId('daily-summary')).toHaveTextContent('Clear skies');
	});
});
