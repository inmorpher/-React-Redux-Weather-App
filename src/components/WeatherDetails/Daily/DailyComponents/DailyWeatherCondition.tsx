import { useGetDailyWeatherForDay } from '../../../../context/WeatherData.context';
import { IDailyForecastForDay } from '../../../../context/WeatherData.types';
import { useSelectedDayIndex } from '../../../../hooks/useDaily';
import SpanText from '../../../UI/Global/SpanText';
import Wrapper from '../../../UI/Global/Wrapper';
import StaticWeatherIcon from '../../../UI/StaticWeatherIcon';
import withLoading from '../../../UI/WithLoading';

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
export const WeatherCondition = ({
	data: { tempMax, tempMin, weatherCondition, weatherIcon },
}: {
	data: IDailyForecastForDay;
}) => {
	return (
		<WeatherCondition.Wrapper className='flex w-full justify-around'>
			<WeatherCondition.Wrapper className='flex items-center'>
				<WeatherCondition.Icon icon={weatherIcon} className='mr-2' size='medium' />
				<WeatherCondition.Text className='text-base font-thin leading-4'>
					{weatherCondition}
				</WeatherCondition.Text>
			</WeatherCondition.Wrapper>
			<WeatherCondition.Wrapper className='flex gap-2'>
				<WeatherCondition.Text className='relative before:absolute before:left-[-5px] before:h-full before:w-1 before:bg-up-arrow-btn before:bg-center before:bg-no-repeat'>
					{tempMax.value}
					{tempMax.units}
				</WeatherCondition.Text>
				<WeatherCondition.Text className='relative before:absolute before:left-[-5px] before:h-full before:w-1 before:bg-down-arrow-btn before:bg-center before:bg-no-repeat'>
					{tempMin.value}
					{tempMin.units}
				</WeatherCondition.Text>
			</WeatherCondition.Wrapper>
		</WeatherCondition.Wrapper>
	);
};

WeatherCondition.Wrapper = Wrapper;
WeatherCondition.Text = SpanText;
WeatherCondition.Icon = StaticWeatherIcon;

export default withLoading<{}, IDailyForecastForDay>(WeatherCondition, () =>
	useGetDailyWeatherForDay(useSelectedDayIndex())
);
