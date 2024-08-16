import { string, z } from 'zod';
import { useGetDailyForecastDetails } from '../../../../context/WeatherData.context';

import { useSelectedDayIndex } from '../../../../hooks/useDaily';
import SpanText from '../../../UI/Global/SpanText';
import Wrapper from '../../../UI/Global/Wrapper';

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

const DailyWeatherDetailsSchema = z.object({
	uvi: z.number().optional(),
	humidity: z.number().optional(),
	precipitation: z.object({
		pop: z.number(),
		rain: z.number().optional(),
		snow: z.number().optional(),
	}),
	wind: z.object({
		gust: z
			.object({
				value: z.number(),
				units: z.string(),
			})
			.optional(),
		speed: z.object({
			value: z.number(),
			units: z.string(),
		}),
		direction: z.string(),
	}),
	pressure: z.number().optional(),
	clouds: z.number().optional(),
	summary: z.string().optional(),
});
const DailyWeatherDetails = () => {
	const selectedDayIndex = useSelectedDayIndex();
	const rawWeatherDetails = useGetDailyForecastDetails(selectedDayIndex) || {};
	const parsedWeatherDetails = DailyWeatherDetailsSchema.safeParse(rawWeatherDetails);
	const { uvi, humidity, precipitation, wind, pressure, clouds, summary } =
		parsedWeatherDetails.data || {};
	return (
		<DailyWeatherDetails.Wrapper className='flex flex-col justify-center divide-y px-5'>
			<DailyWeatherDetails.Wrapper className='flex h-12 w-full items-center justify-between'>
				<DailyWeatherDetails.Text as='p' className='w-1/2'>
					uvi:
					<DailyWeatherDetails.Text className='block px-3 text-center' data-testid='daily-uvi'>
						{uvi !== undefined ? Math.round(uvi) : 'N/A'}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
				<DailyWeatherDetails.Text as='p' className='w-1/2' data-testid='daily-humidity'>
					humidity:
					<span className='block px-3 text-center'>
						{humidity !== undefined ? humidity + '%' : 'N/A'}
					</span>
				</DailyWeatherDetails.Text>
			</DailyWeatherDetails.Wrapper>
			<DailyWeatherDetails.Wrapper className='flex h-12 w-full items-center justify-between'>
				<DailyWeatherDetails.Text as='p' className='w-1/2' data-testid='daily-pressure'>
					pressure:
					<DailyWeatherDetails.Text className='block px-3 text-center'>
						{pressure !== undefined ? Math.round(pressure) + 'hpa' : 'N/A'}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
				<DailyWeatherDetails.Text as='p' className='w-1/2' data-testid='daily-clouds'>
					clouds:
					<DailyWeatherDetails.Text className='px-3 text-center'>
						{clouds !== undefined ? clouds + '%' : 'N/A'}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
			</DailyWeatherDetails.Wrapper>
			<DailyWeatherDetails.Wrapper className='flex w-full items-center justify-between'>
				<DailyWeatherDetails.Text as='p' className='w-1/2' data-testid='daily-wind'>
					wind:
					<DailyWeatherDetails.Text className='block px-3 text-center'>
						{wind?.speed?.value !== undefined ? wind?.speed.value : 'N/A'}
						{wind?.speed?.value !== undefined && wind.speed.units}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
				<DailyWeatherDetails.Text as='p' className='w-1/2' data-testid='daily-wind-gust'>
					wind gust:
					<DailyWeatherDetails.Text className='block px-3 text-center'>
						{wind?.gust ? wind.gust.value : 'N/A'}
						{wind?.gust?.value !== undefined && wind.gust.units}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
			</DailyWeatherDetails.Wrapper>
			<DailyWeatherDetails.Wrapper className='flex w-full items-center justify-between'>
				<DailyWeatherDetails.Text as='p' className='w-full' data-testid='daily-precipitation'>
					precipitation:
					<DailyWeatherDetails.Text className='block px-3 text-center'>
						possibility: {precipitation?.pop !== undefined ? precipitation.pop : 'N/A'}
						{precipitation?.rain !== undefined && `rain: ${precipitation.rain}mm/h`}
						{precipitation?.snow !== undefined && `snow: ${precipitation.snow}mm/h`}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
			</DailyWeatherDetails.Wrapper>
			<DailyWeatherDetails.Wrapper className='flex w-full items-center justify-between'>
				<DailyWeatherDetails.Text as='p' className='w-full' data-testid='daily-summary'>
					summary:
					<DailyWeatherDetails.Text className='block h-11 w-full whitespace-break-spaces break-words'>
						{typeof summary === 'string' && string.length > 0 ? summary : 'No summary available'}
					</DailyWeatherDetails.Text>
				</DailyWeatherDetails.Text>
			</DailyWeatherDetails.Wrapper>
		</DailyWeatherDetails.Wrapper>
	);
};

DailyWeatherDetails.Text = SpanText;
DailyWeatherDetails.Wrapper = Wrapper;

export default DailyWeatherDetails;
