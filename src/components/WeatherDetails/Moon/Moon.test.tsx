import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetMoonPosition, useWeatherData } from '../../../context/WeatherData.context';
import { IMoonPosition } from '../../../context/WeatherData.types';
import { useMoon } from '../../../hooks/useMoon';
import withLoading from '../../UI/WithLoading';
import { Moon } from './Moon';

vi.mock('../../../context/WeatherData.context', () => ({
	useGetMoonPosition: vi.fn(),
	useWeatherData: vi.fn(),
}));

vi.mock('../../../hooks/useMoon', () => ({
	useMoon: vi.fn(),
}));

describe('Moon', () => {
	test('should render the correct moon phase icon and description based on the provided moon data', () => {
		const mockMoonData: IMoonPosition = {
			moonPhase: 1,
			formattedMoonRise: '18:00',
			formattedMoonSet: '06:00',
		};

		(useMoon as MockedFunction<typeof useMoon>).mockReturnValue({
			description: 'Full Moon',
			moonRise: '18:00',
			moonSet: '06:00',
			moonPhase: 75 - 1 * 100,
		});

		const { getByRole, getByText } = render(<Moon data={mockMoonData} />);

		const iconElement = getByRole('img', { name: 'moon-icon' });
		const descriptionElement = getByText('Full Moon');

		expect(iconElement).toBeInTheDocument();
		expect(descriptionElement).toBeInTheDocument();
	});

	test('should display the correct moon rise and set times based on the provided moon data', () => {
		const mockMoonData: IMoonPosition = {
			moonPhase: 0,
			formattedMoonRise: '18:00',
			formattedMoonSet: '06:00',
		};

		const { getByText } = render(<Moon data={mockMoonData} />);

		const moonRiseElement = getByText('18:00');
		const moonSetElement = getByText('06:00');

		expect(moonRiseElement).toBeInTheDocument();
		expect(moonSetElement).toBeInTheDocument();
	});

	test('should handle gracefully when the moon data is not provided', () => {
		(useMoon as MockedFunction<typeof useMoon>).mockReturnValue({
			description: 'N/A',
			moonRise: 'N/A',
			moonSet: 'N/A',
			moonPhase: 0,
		});

		const { getAllByText } = render(<Moon data={undefined as unknown as IMoonPosition} />);

		const naElements = getAllByText('N/A');
		expect(naElements.length).toBeGreaterThan(0);
		naElements.forEach((element) => {
			expect(element).toBeInTheDocument();
		});
	});

	test('should handle gracefully when moonSet or moonRise is not available', () => {
		(useMoon as MockedFunction<typeof useMoon>).mockReturnValue({
			description: 'New Moon',
			moonRise: undefined as unknown as string,
			moonSet: undefined as unknown as string,
			moonPhase: 0,
		});

		const { getByRole } = render(<Moon data={undefined as unknown as IMoonPosition} />);

		const moonRiseElement = getByRole('status', { name: 'moon-rise' });
		const moonSetElement = getByRole('status', { name: 'moon-set' });
		expect(moonSetElement).toHaveTextContent('N/A');
		expect(moonRiseElement).toHaveTextContent('N/A');
	});

	test('should handle icon renders when moonPhase is not a number', () => {
		(useMoon as MockedFunction<typeof useMoon>).mockReturnValue({
			description: 'New Moon',
			moonRise: '18:00',
			moonSet: '06:00',
			moonPhase: undefined as unknown as number,
		});

		const { getByRole } = render(<Moon data={undefined as unknown as IMoonPosition} />);

		const moonIconElement = getByRole('img', { name: 'moon-icon' });
		expect(moonIconElement).toBeInTheDocument();

		const circleElement = moonIconElement.querySelector('circle[cx="0"]');
		expect(circleElement).toBeInTheDocument();
	});

	test('should handle the error state correctly when the moon description is not available or invalid', () => {
		(useMoon as MockedFunction<typeof useMoon>).mockReturnValue({
			description: undefined as unknown as string,
			moonRise: '18:00',
			moonSet: '06:00',
			moonPhase: 0,
		});

		const { getByText } = render(<Moon data={undefined as unknown as IMoonPosition} />);

		const moonDescriptionElement = getByText('N/A');
		expect(moonDescriptionElement).toBeInTheDocument();
	});

	test('should handle the loading state correctly when the moon data is being fetched withLoading', () => {
		(useGetMoonPosition as MockedFunction<typeof useGetMoonPosition>).mockReturnValue(undefined);
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			weatherData: undefined,
			status: 'pending',
			error: null,
		});
		const WrappedMoon = withLoading<{}, IMoonPosition>(Moon, useGetMoonPosition);
		const { getByRole } = render(<WrappedMoon />);

		const loaderElement = getByRole('img', { name: /loader/i });
		expect(loaderElement).toBeInTheDocument();
	});

	test('should handle the error state correctly when fetching the moon data fails thought withLoading', () => {
		(useGetMoonPosition as MockedFunction<typeof useGetMoonPosition>).mockReturnValue(undefined);
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			weatherData: undefined,
			status: 'error',
			error: new Error('Failed to fetch moon data'),
		});
		const WrappedMoon = withLoading<{}, IMoonPosition>(Moon, useGetMoonPosition);
		const { getByRole } = render(<WrappedMoon />);
		const errorElement = getByRole('img', { name: /error-placeholder/i });
		expect(errorElement).toBeInTheDocument();
	});

	test('should render a error component when the moon data is unavailable or invalid throught withLoading', () => {
		const mockMoonData: IMoonPosition = {
			moonPhase: undefined,
			formattedMoonRise: undefined,
			formattedMoonSet: undefined,
		} as unknown as IMoonPosition;

		(useGetMoonPosition as MockedFunction<typeof useGetMoonPosition>).mockReturnValue(mockMoonData);
		const WrappedMoon = withLoading<{}, IMoonPosition>(Moon, useGetMoonPosition);
		const { getByRole } = render(<WrappedMoon />);

		const errorElement = getByRole('img', { name: /error-placeholder/i });
		expect(errorElement).toBeInTheDocument();
	});

	test('should render component correctly when moon data is available withLoading', () => {
		(useGetMoonPosition as MockedFunction<typeof useGetMoonPosition>).mockReturnValue({
			moonPhase: 1,
			formattedMoonRise: '18:00',
			formattedMoonSet: '06:00',
		});
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			weatherData: undefined,
			status: 'success',
			error: null,
		});
		const WrappedMoon = withLoading<{}, IMoonPosition>(Moon, useGetMoonPosition);
		const { getByRole } = render(<WrappedMoon />);

		expect(getByRole('img', { name: 'moon-icon' })).toBeInTheDocument();
	});
});
