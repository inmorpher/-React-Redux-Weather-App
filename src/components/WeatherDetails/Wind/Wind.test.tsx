import '@testing-library/jest-dom';
import { MockedFunction, vi } from 'vitest';
import { IWindInfo } from '../../../context/WeatherData.types';

import { render } from '@testing-library/react';
import { useGetWindInfo, useWeatherData } from '../../../context/WeatherData.context';
import withLoading from '../../UI/WithLoading';
import { Wind } from './Wind';

vi.mock('../../../context/WeatherData.context', () => ({
	useGetWindInfo: vi.fn(),
	useWeatherData: vi.fn(() => {
		return {
			status: 'success',
			weatherData: undefined,
			error: null,
		};
	}),
}));

describe('Wind', () => {
	test('should render the wind component with valid wind data', () => {
		const mockWindData: IWindInfo = {
			degree: 90,
			speed: { value: 15, units: 'km/h' },
			gust: { value: 20, units: 'km/h' },
			direction: 'E',
		};

		const { getByText, getByRole } = render(<Wind data={mockWindData} />);

		const windDirectionElement = getByRole('img', { name: /wind direction/i });
		const windSpeedElement = getByText('speed: 15km/h');
		const windGustElement = getByText('gust: 20km/h');

		expect(windDirectionElement).toBeInTheDocument();
		expect(windSpeedElement).toBeInTheDocument();
		expect(windGustElement).toBeInTheDocument();
	});
	test('should handle gracefully when wind data is not provided', () => {
		const { getByText, queryByRole } = render(<Wind data={undefined} />);

		expect(getByText('Calm condition')).toBeInTheDocument();
		// expect(queryByText('gust: 0km/h')).toBeInTheDocument();
		expect(queryByRole('img', { name: /wind direction/i })).toBeInTheDocument();
	});
	test('icon should be rotated based on wind direction', () => {
		const mockWindData: IWindInfo = {
			degree: 90,
			speed: { value: 15, units: 'km/h' },
			gust: { value: 20, units: 'km/h' },
			direction: 'E',
		};

		const { getByRole } = render(<Wind data={mockWindData} />);

		const windIconElement = getByRole('contentinfo', { name: 'direction' });

		expect(windIconElement).toHaveAttribute('transform', 'rotate(90)');
	});

	test('should not render gust information when gust speed is 0', () => {
		const mockWindData: IWindInfo = {
			degree: 90,
			speed: { value: 15, units: 'km/h' },
			gust: { value: 0, units: 'km/h' },
			direction: 'E',
		};

		const { queryByText } = render(<Wind data={mockWindData} />);

		expect(queryByText('gust: 0km/h')).toBeNull();
	});

	test('should render the wind component with valid wind data through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'success',
			weatherData: undefined,
			error: null,
		});
		(useGetWindInfo as MockedFunction<typeof useGetWindInfo>).mockReturnValue({
			degree: 90,
			speed: { value: 15, units: 'km/h' },
			gust: { value: 20, units: 'km/h' },
			direction: 'E',
		});

		const WrappedWind = withLoading<{}, IWindInfo>(Wind, useGetWindInfo);

		const { getByText, getByRole } = render(<WrappedWind />);

		const windDirectionElement = getByRole('img', { name: /wind direction/i });
		const windSpeedElement = getByText('speed: 15km/h');
		const windGustElement = getByText('gust: 20km/h');

		expect(windDirectionElement).toBeInTheDocument();
		expect(windSpeedElement).toBeInTheDocument();
		expect(windGustElement).toBeInTheDocument();
	});

	test('should handle when still fetching through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'pending',
			weatherData: undefined,
			error: null,
		});

		const WrappedWind = withLoading<{}, IWindInfo>(Wind, useGetWindInfo);

		const { getByRole } = render(<WrappedWind />);

		expect(getByRole('img', { name: /loader/i })).toBeInTheDocument();
	});

	test('should handle when error fetching through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'error',
			weatherData: undefined,
			error: null,
		});

		const WrappedWind = withLoading<{}, IWindInfo>(Wind, useGetWindInfo);

		const { getByRole } = render(<WrappedWind />);

		expect(getByRole('img', { name: /error-placeholder/i })).toBeInTheDocument();
	});
});
