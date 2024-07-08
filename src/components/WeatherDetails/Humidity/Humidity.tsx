import { useFetchState } from '../../../hooks/useFetchState';
import { selectHumidity } from '../../../store/slices/weatherApiSlice';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import HumidityIcon from './HumidityIcon';

/**
 * Humidity component that displays the current humidity and dew point.
 * It fetches the humidity data using the `useFetchState` hook and displays
 * a loading skeleton while the data is being fetched.
 *
 * @component
 * @returns {JSX.Element | null} The rendered component or null if there is an error or no data.
 */
const Humidity = () => {
	const {
		status: { isLoading, isError, isSuccess },
		data,
	} = useFetchState(selectHumidity);

	// Return null if there is an error or the data fetching was not successful

	// Display a loading skeleton while the data is being fetched
	if (isLoading) {
		return <Skeleton />;
	}
	if (isError || !isSuccess || !data) return null;

	const { humidity, dew_point } = data;

	return (
		<div className='relative flex flex-1 flex-col'>
			<div className='flex flex-1 items-end gap-4 px-3'>
				<Humidity.Icon />

				<span className='text-[2.5rem] leading-[2.5rem]'>{humidity + '%'}</span>
			</div>
			<div className='flex flex-1 flex-col justify-end text-center text-sm'>
				{dew_point && (
					<span>
						dew point: {dew_point.value}
						{dew_point.units}
					</span>
				)}
			</div>
		</div>
	);
};

// Assign the HumidityIcon component to the Humidity component's Icon property
Humidity.Icon = HumidityIcon;

export default Humidity;
