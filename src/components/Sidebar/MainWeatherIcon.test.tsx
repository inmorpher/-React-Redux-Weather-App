import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetWeatherIconInfo } from '../../context/WeatherData.context';
import MainWeatherIcon from './MainWeatherIcon';

vi.mock('../../context/WeatherData.context', () => ({
	useGetWeatherIconInfo: vi.fn(),
}));

describe('MainWeatherIcon', () => {
	test('should render the correct icon component for a valid icon code', async () => {
		const mockIcon = {
			iconCode: '01',
			timeOfDay: 'day' as const,
		};

		(useGetWeatherIconInfo as MockedFunction<typeof useGetWeatherIconInfo>).mockReturnValue(
			mockIcon
		);

		const { getByTestId, findByRole } = render(<MainWeatherIcon />);

		const iconContainer = getByTestId('dynamic icon');
		expect(iconContainer).toBeInTheDocument();

		const clearCloudyIcon = await findByRole('img', { name: /Sun Icon/i });
		expect(clearCloudyIcon).toBeInTheDocument();
	});

	test('should render the default icon component when the icon code is invalid', () => {
		(useGetWeatherIconInfo as MockedFunction<typeof useGetWeatherIconInfo>).mockReturnValue({
			iconCode: '99',
			timeOfDay: 'day',
		});

		const { getByTestId, queryByRole } = render(<MainWeatherIcon />);

		const iconContainer = getByTestId('dynamic icon');
		expect(iconContainer).toBeInTheDocument();

		const defaultIcon = queryByRole('img');
		expect(defaultIcon).toBeNull();

		const defaultText = getByTestId('dynamic icon');
		expect(defaultText.textContent).toBe('N/A');
	});

	test('should render the default icon component when the icon code is missing or undefined', () => {
		(useGetWeatherIconInfo as MockedFunction<typeof useGetWeatherIconInfo>).mockReturnValue({
			iconCode: undefined as unknown as string,
			timeOfDay: 'day',
		});

		const { getByTestId, queryByRole } = render(<MainWeatherIcon />);

		const iconContainer = getByTestId('dynamic icon');
		expect(iconContainer).toBeInTheDocument();

		const defaultIcon = queryByRole('img');
		expect(defaultIcon).toBeNull();

		const defaultText = getByTestId('dynamic icon');
		expect(defaultText.textContent).toBe('N/A');
	});

	test('should render the appropriate icon component based on the time of day', () => {
		const daytimeIcon = {
			iconCode: '01',
			timeOfDay: 'day' as const,
		};

		const nighttimeIcon = {
			iconCode: '01',
			timeOfDay: 'night' as const,
		};

		// Mocking for daytime icon
		(useGetWeatherIconInfo as MockedFunction<typeof useGetWeatherIconInfo>).mockReturnValue(
			daytimeIcon
		);

		const { getByTestId, findByRole, rerender } = render(<MainWeatherIcon />);

		const iconContainer = getByTestId('dynamic icon');
		expect(iconContainer).toBeInTheDocument();

		const clearCloudyDayIcon = findByRole('img', { name: /Sun Icon/i });
		expect(clearCloudyDayIcon).resolves.toBeInTheDocument();

		// Mocking for nighttime icon
		(useGetWeatherIconInfo as MockedFunction<typeof useGetWeatherIconInfo>).mockReturnValue(
			nighttimeIcon
		);

		rerender(<MainWeatherIcon />);

		const clearCloudyNightIcon = findByRole('img', { name: /Moon Icon/i });
		expect(clearCloudyNightIcon).resolves.toBeInTheDocument();
	});
});
