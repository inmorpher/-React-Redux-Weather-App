import { z } from 'zod';
import { useGetDailyWeatherForDay } from '../../../../context/WeatherData.context';

import { useSelectedDayIndex } from '../../../../hooks/useDaily';
import SpanText from '../../../UI/Global/SpanText';
import Wrapper from '../../../UI/Global/Wrapper';
import StaticWeatherIcon from '../../../UI/StaticWeatherIcon';

/**
 * WeatherCondition component displays the weather condition for a specific day.
 * It shows the weather icon, condition text, and max/min temperatures.
 *
 * @param {Object} props - The component props.
 * @param {IDailyForecastForDay} props.data - The daily forecast data.
 * @param {Object} props.data.tempMax - The maximum temperature data.
 * @param {Object} props.data.tempMin - The minimum temperature data.
 * @param {string} props.data.weatherCondition - The weather condition text.
 * @param {string} props.data.weatherIcon - The weather icon identifier.
 * @returns {JSX.Element} The rendered WeatherCondition component.
 */

const WeatherDataSchema = z.object({
	tempMax: z.object({
		value: z.string().or(z.number()).optional(),
		units: z.string().optional(),
	}),
	tempMin: z.object({
		value: z.string().or(z.number()).optional(),
		units: z.string().optional(),
	}),
	weatherCondition: z.string().optional(),
	weatherIcon: z.string().optional(),
});
const WeatherCondition = () => {
	const selectedDayIndex = useSelectedDayIndex();
	const forecastForDay = useGetDailyWeatherForDay(selectedDayIndex);

	const parsedForecast = WeatherDataSchema.safeParse(forecastForDay);
	const validForecast = parsedForecast.success ? parsedForecast.data : null;

	return (
		<WeatherCondition.Wrapper className='flex w-full justify-around'>
			<WeatherCondition.Wrapper className='flex items-center'>
				<WeatherCondition.Icon
					icon={validForecast?.weatherIcon || ''}
					className='mr-2'
					size='medium'
				/>
				<WeatherCondition.Text
					className='text-base font-thin leading-4'
					aria-label='weather condition description'
				>
					{validForecast?.weatherCondition || 'N/A'}
				</WeatherCondition.Text>
			</WeatherCondition.Wrapper>
			<WeatherCondition.Wrapper className='flex gap-2'>
				<WeatherCondition.Text
					className='relative before:absolute before:left-[-5px] before:h-full before:w-1 before:bg-up-arrow-btn before:bg-center before:bg-no-repeat'
					aria-label='maximum temperature value'
				>
					{validForecast?.tempMax.value || 'N/A'}
					{validForecast?.tempMax.value && validForecast.tempMax.units}
				</WeatherCondition.Text>
				<WeatherCondition.Text
					className='relative before:absolute before:left-[-5px] before:h-full before:w-1 before:bg-down-arrow-btn before:bg-center before:bg-no-repeat'
					aria-label='minimum temperature value'
				>
					{validForecast?.tempMin.value || 'N/A'}
					{validForecast?.tempMin.value && validForecast.tempMin.units}
				</WeatherCondition.Text>
			</WeatherCondition.Wrapper>
		</WeatherCondition.Wrapper>
	);
};
WeatherCondition.Wrapper = Wrapper;
WeatherCondition.Text = SpanText;
WeatherCondition.Icon = StaticWeatherIcon;

export default WeatherCondition;
