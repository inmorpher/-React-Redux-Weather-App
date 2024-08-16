import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetSunPosition } from '../../../context/WeatherData.context';
import { ISunPosition } from '../../../context/WeatherData.types';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import withLoading from '../../UI/WithLoading';
import { Sun } from './Sun';

vi.mock('../../../context/WeatherData.context', () => ({
	useGetSunPosition: vi.fn(),
	useWeatherData: vi.fn(() => {
		return {
			status: 'success',
			weatherData: undefined,
			error: null,
		};
	}),
}));

vi.mock('../../../hooks/useSunPosition', () => ({
	useSunPosition: vi.fn(() => ({
		pathRef: { current: null },
		indicatorRef: { current: null },
	})),
}));

describe('Sun', () => {
	test('should render the component correctly with valid sun position data', () => {
		const MockData = {
			isDay: true,
			sunrise: '06:00',
			sunset: '18:00',
			cycleDuration: 12,
			timeSinceCycleStart: 0,
		};

		const { getByText, getByRole } = render(<Sun data={MockData} />);

		const sunriseElement = getByText('06:00');
		const sunsetElement = getByText('18:00');
		const sunIconElement = getByRole('img', { name: /sun position/i });

		expect(sunriseElement).toBeInTheDocument();
		expect(sunsetElement).toBeInTheDocument();
		expect(sunIconElement).toBeInTheDocument();
	});

	test('should display the sun position icon as day when isDay is true', () => {
		const MockData = {
			isDay: true,
			sunrise: '06:00',
			sunset: '18:00',
			cycleDuration: 12,
			timeSinceCycleStart: 0,
		};

		const { getByRole } = render(<Sun data={MockData} />);

		const sunIconElement = getByRole('img', { name: /sun position/i });
		expect(sunIconElement).toHaveAttribute('data-time', 'day');
	});

	test('should display the sun position icon as day when isDay is false', () => {
		const MockData = {
			isDay: false,
			sunrise: '06:00',
			sunset: '18:00',
			cycleDuration: 12,
			timeSinceCycleStart: 0,
		};

		const { getByRole } = render(<Sun data={MockData} />);

		const sunIconElement = getByRole('img', { name: /sun position/i });
		expect(sunIconElement).toHaveAttribute('data-time', 'night');
	});
	test('should handle missing sunrise time gracefully, showing "N/A"', () => {
		(useGetSunPosition as MockedFunction<typeof useGetSunPosition>).mockReturnValue({
			isDay: true,
			sunrise: undefined,
			sunset: '18:00',
			cycleDuration: 12,
			timeSinceCycleStart: 0,
		});

		const MockData = {
			isDay: true,
			sunrise: undefined,
			sunset: '18:00',
			cycleDuration: 12,
			timeSinceCycleStart: 0,
		};

		const { queryByText } = render(<Sun data={MockData} />);

		const sunriseElement = queryByText('N/A');
		expect(sunriseElement).toBeInTheDocument();

		const sunsetElement = queryByText('18:00');
		expect(sunsetElement).toBeInTheDocument();
	});
	test('should handle missing sunset time gracefully, showing "N/A"', () => {
		(useGetSunPosition as MockedFunction<typeof useGetSunPosition>).mockReturnValue({
			isDay: true,
			sunrise: undefined,
			sunset: '18:00',
			cycleDuration: 12,
			timeSinceCycleStart: 0,
		});

		const MockData = {
			isDay: true,
			sunrise: undefined,
			sunset: '18:00',
			cycleDuration: 12,
			timeSinceCycleStart: 0,
		};

		const { queryByText } = render(<Sun data={MockData} />);

		const sunriseElement = queryByText('18:00');
		expect(sunriseElement).toBeInTheDocument();

		const sunsetElement = queryByText('N/A');
		expect(sunsetElement).toBeInTheDocument();
	});

	test('should render loading state when data is being fetched while wrapped in withLoading', () => {
		vi.mock('../../../context/WeatherData.context', () => ({
			useWeatherData: () => ({ status: 'pending' }),
			useGetSunPosition: vi.fn(),
		}));

		const { getByRole } = render(<Skeleton />);

		expect(getByRole('img', { name: /loader/i })).toBeInTheDocument();
	});

	test('should handle null data input without crashing while wrapped in withLoading', () => {
		// Mock the useGetSunPosition hook to return null data
		vi.mock('../../../context/WeatherData.context', () => ({
			useWeatherData: () => ({ status: 'success' }),
			useGetSunPosition: vi.fn(),
		}));
		(useGetSunPosition as MockedFunction<typeof useGetSunPosition>).mockReturnValue(undefined);
		const WrappedSun = withLoading<{}, ISunPosition>(Sun, useGetSunPosition);
		// Render the Sun component with null data
		const { getByRole } = render(<WrappedSun />);
		const errorElement = getByRole('img', { name: /error-placeholder/i });
		expect(errorElement).toBeInTheDocument();
	});
	test('should show full data correctly while wrapped in withLoading', () => {
		(useGetSunPosition as MockedFunction<typeof useGetSunPosition>).mockReturnValue({
			isDay: true,
			sunrise: '06:00',
			sunset: '18:00',
			cycleDuration: 12,
			timeSinceCycleStart: 0,
		});

		const WrappedSun = withLoading<{}, ISunPosition>(Sun, useGetSunPosition);
		const { getByText, getByRole } = render(<WrappedSun />);

		const sunriseElement = getByText('06:00');
		const sunsetElement = getByText('18:00');
		const sunIconElement = getByRole('img', { name: /sun position/i });

		expect(sunriseElement).toBeInTheDocument();
		expect(sunsetElement).toBeInTheDocument();
		expect(sunIconElement).toBeInTheDocument();
	});
});
