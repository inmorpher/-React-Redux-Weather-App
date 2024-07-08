import { useDaily } from '../../../../hooks/useDaily';
import { useAppSelector } from '../../../../store/hooks.type';
import { selectPopupDailyDetails } from '../../../../store/slices/weatherSlice';

const WeatherDetails = () => {
	const { dailyState } = useDaily();

	const { uvi, humidity, pressure, precipitation, clouds, summary, wind } = useAppSelector(
		selectPopupDailyDetails(dailyState.item),
	);

	return (
		<div className='flex flex-col justify-center divide-y px-5'>
			<div className='flex h-12 w-full items-center justify-between'>
				<p className='w-1/2'>
					uvi:
					<span className='block px-3 text-center'>{Math.round(uvi)}</span>
				</p>
				<p className='w-1/2'>
					humidity:
					<span className='block px-3 text-center'>{humidity}%</span>
				</p>
			</div>
			<div className='flex h-12 w-full items-center justify-between'>
				<p className='w-1/2'>
					pressure:
					<span className='block px-3 text-center'>{pressure}hpa</span>
				</p>
				<p className='w-1/2'>
					clouds:
					<span className='px-3 text-center'>{clouds}%</span>
				</p>
			</div>
			<div className='flex w-full items-center justify-between'>
				<p className='w-1/2'>
					wind:
					<span className='block px-3 text-center'>
						{wind.speed.value}
						{wind.speed.units}
					</span>
				</p>
				<p className='w-1/2'>
					wind gust:
					<span className='block px-3 text-center'>
						{wind.gust ? wind.gust.value + wind.gust.units : 'N/A'}
					</span>
				</p>
			</div>
			<div className='flex w-full items-center justify-between'>
				<p className='w-full'>
					precipitation:
					<span className='block px-3 text-center'>
						possibility: {precipitation.pop}%{'   '}
						{precipitation.rain && `rain: ${precipitation.rain}mm/h`}
						{precipitation.snow && `snow: ${precipitation.snow}mm/h`}
					</span>
				</p>
			</div>
			<div className='flex w-full items-center justify-between'>
				<p className='w-full'>
					summary:
					<span className='block h-11 w-full whitespace-break-spaces break-words'>
						{summary}
					</span>
				</p>
			</div>
		</div>
	);
};

export default WeatherDetails;
