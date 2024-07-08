import { useDaily } from '../../../../hooks/useDaily';
import { useFetchState } from '../../../../hooks/useFetchState';
import { selectDailyCondition } from '../../../../store/slices/weatherApiSlice';
import Skeleton from '../../../UI/SkeletonLoader/Skeleton';
import StaticWeatherIcon from '../../../UI/StaticWeatherIcon';

export const WeatherCondition = () => {
	const { dailyState } = useDaily();

	const {
		status: { isError, isLoading, isSuccess },
		data,
	} = useFetchState(selectDailyCondition, dailyState.item);

	if (isLoading || isError || !isSuccess) return <Skeleton />;

	if (!data) return null;

	const { max, min, condition, icon } = data;

	return (
		<div className='flex w-full justify-around'>
			<div className='flex items-center'>
				<StaticWeatherIcon icon={icon} className='mr-2' size='medium' />
				<span className='text-base font-thin leading-4'>{condition}</span>
			</div>
			<div className='flex gap-2'>
				<span className='relative before:absolute before:left-[-5px] before:h-full before:w-1 before:bg-up-arrow-btn before:bg-center before:bg-no-repeat'>
					{max.value}
					{max.units}
				</span>
				<span className='relative before:absolute before:left-[-5px] before:h-full before:w-1 before:bg-down-arrow-btn before:bg-center before:bg-no-repeat'>
					{min.value}
					{min.units}
				</span>
			</div>
		</div>
	);
};

export default WeatherCondition;
