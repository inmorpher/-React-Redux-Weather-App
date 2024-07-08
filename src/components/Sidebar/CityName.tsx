import { memo } from 'react';
import { useCityName } from '../../hooks/useCityName';
import Button from '../UI/Button';
import Skeleton from '../UI/SkeletonLoader/Skeleton';

/**
 * CityName component displays the name of a city and its associated time.
 * It uses the `useCityName` hook to manage its state, including loading,
 * error, and success states. If the data is loading, a skeleton loader is shown.
 * If there's an error or the data fetching is not successful, it renders nothing.
 * On success, it displays the city name, time, and an "Add" button to allow
 * users to add the city to their list.
 *
 * This component is memoized to prevent unnecessary re-renders.
 */
const CityName = memo(() => {
	const {
		status: { isError, isLoading, isSuccess }, // Destructures state to manage UI based on loading, error, and success states.
		nameString, // The name of the city.
		time, // The current time in the city.
		onAddCityHandler, // Function to handle adding the city to a list.
	} = useCityName();

	// Renders nothing if there's an error or if the data fetching hasn't been successful.
	if (isError || !isSuccess) return null;

	// Renders a skeleton loader if the data is still loading.
	if (isLoading) return <Skeleton />;

	// Renders the city name, time, and an "Add" button on successful data fetching.
	return (
		<div className='flex w-1/2 items-center'>
			<Button
				size='medium'
				variant='add'
				onClick={onAddCityHandler}
				aria-label='Add city to your list'
			/>
			<div className='flex max-w-full flex-col overflow-hidden whitespace-nowrap'>
				<p className='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium leading-3 sm:text-xl'>
					{nameString}
				</p>
				<p className='text-[0.6rem] font-light underline'>{time}</p>
			</div>
		</div>
	);
});

export default CityName;
