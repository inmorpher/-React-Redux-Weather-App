import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetDailyWeatherForDay } from '../../../../context/WeatherData.context';
import { useSelectedDayIndex } from '../../../../hooks/useDaily';
import { MetricReturnType } from '../../../../utils/services/converter/metric.converter';
import WeatherCondition from './DailyWeatherCondition';

vi.mock('../../../../context/WeatherData.context', () => ({
	useGetDailyWeatherForDay: vi.fn(),
}));

vi.mock('../../../../hooks/useDaily', () => ({
	useSelectedDayIndex: vi.fn(),
}));

describe('WeatherCondition', () => {
	test('should render the correct weather icon for various icon codes', () => {
		const weatherIcons = {
			'01d': 'clear sky',
			'02n': 'few clouds',
			'03d': 'scattered clouds',
			'04n': 'broken clouds',
			'09d': 'shower rain',
			'10n': 'rain',
			'11d': 'thunderstorm',
			'13n': 'snow',
			'50d': 'fog',
		};

		Object.entries(weatherIcons).forEach(([mockWeatherIcon, altText]) => {
			(useGetDailyWeatherForDay as MockedFunction<typeof useGetDailyWeatherForDay>).mockReturnValue(
				{
					tempMax: { value: 25, units: '°C' },
					tempMin: { value: 15, units: '°C' },
					weatherCondition: altText,
					weatherIcon: mockWeatherIcon,
				}
			);
			(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

			const { getByRole } = render(<WeatherCondition />);
			const iconElement = getByRole('img', { name: altText });

			expect(iconElement).toHaveAttribute('src', `/icons/static/conditions/${mockWeatherIcon}.svg`);
			expect(iconElement).toHaveAttribute('alt', altText);
		});
	});

	test('should display "N/A" for tempMax and tempMin when values are missing or empty', () => {
		(useGetDailyWeatherForDay as MockedFunction<typeof useGetDailyWeatherForDay>).mockReturnValue({
			tempMax: { value: '', units: '°C' } as unknown as MetricReturnType,
			tempMin: { value: '', units: '°C' } as unknown as MetricReturnType,
			weatherCondition: 'Clear sky',
			weatherIcon: '01d',
		});
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { getByLabelText } = render(<WeatherCondition />);

		const maxTempElement = getByLabelText('maximum temperature value');
		const minTempElement = getByLabelText('minimum temperature value');

		expect(minTempElement).toHaveTextContent('N/A');
		expect(maxTempElement).toHaveTextContent('N/A');
	});

	test('should display the provided weatherCondition text for various conditions', () => {
		const weatherConditions = [
			'Clear Sky',
			'Few Clouds',
			'Scattered Clouds',
			'Broken Clouds',
			'Shower Rain',
			'Rain',
			'Thunderstorm',
			'Snow',
			'Mist',
		];

		weatherConditions.forEach((condition) => {
			(useGetDailyWeatherForDay as MockedFunction<typeof useGetDailyWeatherForDay>).mockReturnValue(
				{
					tempMax: { value: 25, units: '°C' },
					tempMin: { value: 15, units: '°C' },
					weatherCondition: condition,
					weatherIcon: '03d',
				}
			);
			(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

			const { getByText } = render(<WeatherCondition />);
			const weatherConditionText = getByText(condition);

			expect(weatherConditionText).toBeInTheDocument();
		});
	});

	test('should render the correct temperature units based on the provided data', () => {
		const tempUnits = ['°C', '°F', 'K'];

		tempUnits.forEach((unit) => {
			(useGetDailyWeatherForDay as MockedFunction<typeof useGetDailyWeatherForDay>).mockReturnValue(
				{
					tempMax: { value: 25, units: unit },
					tempMin: { value: 15, units: unit },
					weatherCondition: 'Clear Sky',
					weatherIcon: '01d',
				}
			);
			(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

			const { getByText } = render(<WeatherCondition />);
			const maxTempText = getByText(`25${unit}`);
			const minTempText = getByText(`15${unit}`);

			expect(maxTempText).toBeInTheDocument();
			expect(minTempText).toBeInTheDocument();
		});
	});

	test('should not render any weather condition information when data object is empty or undefined', () => {
		(useGetDailyWeatherForDay as MockedFunction<typeof useGetDailyWeatherForDay>).mockReturnValue(
			undefined
		);
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { queryByRole, getByLabelText } = render(<WeatherCondition />);

		const iconElement = queryByRole('img');
		const weatherConditionText = getByLabelText('weather condition description').textContent;
		const maxTempText = getByLabelText('maximum temperature value').textContent;
		const minTempText = getByLabelText('minimum temperature value').textContent;

		expect(iconElement).not.toBeInTheDocument();
		expect(weatherConditionText).toBe('N/A');
		expect(maxTempText).toBe('N/A');
		expect(minTempText).toBe('N/A');
	});

	test('should render the appropriate up and down arrow icons for tempMax and tempMin values', () => {
		(useGetDailyWeatherForDay as MockedFunction<typeof useGetDailyWeatherForDay>).mockReturnValue({
			tempMax: { value: 25, units: '°C' },
			tempMin: { value: 15, units: '°C' },
			weatherCondition: 'Clear Sky',
			weatherIcon: '01d',
		});
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { container } = render(<WeatherCondition />);

		const maxTempWithUpArrow = container.querySelector('.before\\:bg-up-arrow-btn');
		const minTempWithDownArrow = container.querySelector('.before\\:bg-down-arrow-btn');

		expect(maxTempWithUpArrow).toHaveTextContent('25°C');
		expect(minTempWithDownArrow).toHaveTextContent('15°C');
	});

	test('should not render any temperature values when they are set to null or undefined', () => {
		(useGetDailyWeatherForDay as MockedFunction<typeof useGetDailyWeatherForDay>).mockReturnValue({
			tempMax: { value: null, units: '°C' } as unknown as MetricReturnType,
			tempMin: { value: undefined, units: '°C' } as unknown as MetricReturnType,
			weatherCondition: 'Clear Sky',
			weatherIcon: '01d',
		});
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { getByLabelText } = render(<WeatherCondition />);

		const maxTempElement = getByLabelText('maximum temperature value');
		const minTempElement = getByLabelText('minimum temperature value');

		expect(maxTempElement).toHaveTextContent('N/A');
		expect(minTempElement).toHaveTextContent('N/A');
	});

	test('should display "N/A" for weather condition when it is an empty string', () => {
		(useGetDailyWeatherForDay as MockedFunction<typeof useGetDailyWeatherForDay>).mockReturnValue({
			tempMax: { value: 25, units: '°C' },
			tempMin: { value: 15, units: '°C' },
			weatherCondition: '',
			weatherIcon: '01d',
		});
		(useSelectedDayIndex as MockedFunction<typeof useSelectedDayIndex>).mockReturnValue(0);

		const { getByText } = render(<WeatherCondition />);
		const weatherConditionText = getByText('N/A');

		expect(weatherConditionText).toBeInTheDocument();
	});
});
