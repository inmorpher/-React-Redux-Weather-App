import { useFetchState } from '../../hooks/useFetchState';
import { selectMainWeather } from '../../store/slices/weatherApiSlice';
import Skeleton from '../UI/SkeletonLoader/Skeleton';
import MainWeatherIcon from './MainWeatherIcon';

/**
 * MainWeather component displays the main weather information.
 * It uses the `useFetchState` hook to retrieve weather data from the store,
 * selected by `selectMainWeather`. It handles loading, error, and success states
 * to conditionally render the weather data or a loading skeleton.
 *
 * @returns {JSX.Element | null} The main weather information as a JSX element,
 * or null if there is an error or the data is not available.
 */
const MainWeather = () => {
	const {
		status: { isLoading, isError, isSuccess },
		data,
	} = useFetchState(selectMainWeather);

	// Return null if there is an error, data fetching is not successful, or data is not available.
	if (isError || !isSuccess || !data) return null;
	// Return a Skeleton loader component while the data is loading.
	if (isLoading) return <Skeleton />;

	// Destructure the necessary data for display.
	const { temp, condition, clouds, max, min } = data;
	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='flex items-center justify-end sm:gap-2'>
				<span className='text-[1.5rem] font-bold sm:text-[2rem]'>
					{temp.value}
					{temp.units}
				</span>
				<span className='hidden text-right text-sm md:inline-block'>
					{max.value}
					{max.units}/{min.value}
					{min.units}
				</span>
				<div className='hidden flex-col text-[0.6rem] lg:flex'>
					<span>{condition}</span>
					<span>clouds: {clouds}%</span>
				</div>

				<MainWeatherIcon />
			</div>
		</div>
	);
};

export default MainWeather;
