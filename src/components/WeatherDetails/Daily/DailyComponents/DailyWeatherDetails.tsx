import { useDaily } from '../../../../hooks/useDaily';
import { useFetchState } from '../../../../hooks/useFetchState';
import { selectDailyPopupDetails } from '../../../../store/slices/weatherApiSlice';
import Skeleton from '../../../UI/SkeletonLoader/Skeleton';

const DailyWeatherDetails = () => {
	const { dailyState } = useDaily();

	const {
		status: { isLoading, isError, isSuccess },
		data,
	} = useFetchState(selectDailyPopupDetails, dailyState.item);

	if (isLoading) return <Skeleton />;

	if (isError || !isSuccess || !data) return null;

	const {
		uvi,
		humidity,
		precipitation,
		wind: { gust, speed },
		pressure,
		clouds,
		summary,
	} = data;

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
						{speed.value}
						{speed.units}
					</span>
				</p>
				<p className='w-1/2'>
					wind gust:
					<span className='block px-3 text-center'>{gust ? gust.value + gust.units : 'N/A'}</span>
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
					<span className='block h-11 w-full whitespace-break-spaces break-words'>{summary}</span>
				</p>
			</div>
		</div>
	);
};

export default DailyWeatherDetails;
