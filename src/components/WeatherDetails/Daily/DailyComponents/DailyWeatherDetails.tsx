import { useGetDailyForecastDetails } from '../../../../context/WeatherData.context';
import { IDailyForecastDetails } from '../../../../context/WeatherData.types';
import { useSelectedDayIndex } from '../../../../hooks/useDaily';
import SpanText from '../../../UI/Global/SpanText';
import Wrapper from '../../../UI/Global/Wrapper';
import withLoading from '../../../UI/WithLoading';

/**
 * Renders detailed daily weather information.
 *
 * This component displays various weather metrics including UV index, humidity,
 * pressure, cloud coverage, wind speed, precipitation, and a summary for a specific day.
 *
 * @param {Object} props - The component props.
 * @param {IDailyForecastDetails} props.data - The daily forecast details.
 * @param {number} props.data.uvi - The UV index.
 * @param {number} props.data.humidity - The humidity percentage.
 * @param {Object} props.data.precipitation - Precipitation details.
 * @param {Object} props.data.wind - Wind details.
 * @param {Object} props.data.wind.gust - Wind gust information.
 * @param {Object} props.data.wind.speed - Wind speed information.
 * @param {number} props.data.pressure - The atmospheric pressure in hPa.
 * @param {number} props.data.clouds - The cloud coverage percentage.
 * @param {string} props.data.summary - A textual summary of the day's weather.
 *
 * @returns {JSX.Element} A React component displaying detailed weather information.
 */
const DailyWeatherDetails = ({
	data: {
		uvi,
		humidity,
		precipitation,
		wind: { gust, speed },
		pressure,
		clouds,
		summary,
	},
}: {
	data: IDailyForecastDetails;
}) => {
	return (
		<DailyWeatherDetails.Wrapper className='flex flex-col justify-center divide-y px-5'>
			<DailyWeatherDetails.Wrapper className='flex h-12 w-full items-center justify-between'>
				<DailyWeatherDetails.Text as='p' className='w-1/2'>
					uvi:
					<DailyWeatherDetails.Text className='block px-3 text-center'>
						{Math.round(uvi)}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
				<DailyWeatherDetails.Text as='p' className='w-1/2'>
					humidity:
					<span className='block px-3 text-center'>{humidity}%</span>
				</DailyWeatherDetails.Text>
			</DailyWeatherDetails.Wrapper>
			<DailyWeatherDetails.Wrapper className='flex h-12 w-full items-center justify-between'>
				<DailyWeatherDetails.Text as='p' className='w-1/2'>
					pressure:
					<DailyWeatherDetails.Text className='block px-3 text-center'>
						{pressure}hpa
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
				<DailyWeatherDetails.Text as='p' className='w-1/2'>
					clouds:
					<DailyWeatherDetails.Text className='px-3 text-center'>
						{clouds}%
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
			</DailyWeatherDetails.Wrapper>
			<DailyWeatherDetails.Wrapper className='flex w-full items-center justify-between'>
				<DailyWeatherDetails.Text as='p' className='w-1/2'>
					wind:
					<DailyWeatherDetails.Text className='block px-3 text-center'>
						{speed.value}
						{speed.units}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
				<DailyWeatherDetails.Text as='p' className='w-1/2'>
					wind gust:
					<DailyWeatherDetails.Text className='block px-3 text-center'>
						{gust ? gust.value + gust.units : 'N/A'}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
			</DailyWeatherDetails.Wrapper>
			<DailyWeatherDetails.Wrapper className='flex w-full items-center justify-between'>
				<DailyWeatherDetails.Text as='p' className='w-full'>
					precipitation:
					<DailyWeatherDetails.Text className='block px-3 text-center'>
						possibility: {precipitation.pop}%{'   '}
						{precipitation.rain && `rain: ${precipitation.rain}mm/h`}
						{precipitation.snow && `snow: ${precipitation.snow}mm/h`}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
			</DailyWeatherDetails.Wrapper>
			<DailyWeatherDetails.Wrapper className='flex w-full items-center justify-between'>
				<DailyWeatherDetails.Text as='p' className='w-full'>
					summary:
					<DailyWeatherDetails.Text className='block h-11 w-full whitespace-break-spaces break-words'>
						{summary}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
			</DailyWeatherDetails.Wrapper>
		</DailyWeatherDetails.Wrapper>
	);
};

DailyWeatherDetails.Text = SpanText;
DailyWeatherDetails.Wrapper = Wrapper;

export default withLoading<{}, IDailyForecastDetails>(DailyWeatherDetails, () =>
	useGetDailyForecastDetails(useSelectedDayIndex())
);
