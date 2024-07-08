import { useFetchState } from '../../../hooks/useFetchState';
import { selectMoonPosition } from '../../../store/slices/weatherApiSlice';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import MoonContent from './MoonContent';
import MoonIcon from './MoonIcon';

/**
 * Moon component that displays the current moon phase, description, moonrise, and moonset times.
 * It uses the `useFetchState` hook to fetch the moon position data from a weather API slice.
 *
 * The component conditionally renders:
 * - A loading state using the `Skeleton` component while the data is being fetched.
 * - Null if there's an error or no data is available after fetching.
 * - The moon phase icon, description, and moonrise/moonset times upon successful data fetching.
 */
const Moon = () => {
	const {
		status: { isError, isLoading, isSuccess },
		data,
	} = useFetchState(selectMoonPosition);

	// Display the loading state while fetching data
	if (isLoading) return <Skeleton />;

	// Return null if there's an error or no data is available
	if (!data || !isSuccess || isError) return null;

	// Destructure the necessary data for display
	const { moon_phase, moonrise, moonset, description } = data;

	// Render the moon information
	return (
		<div className='relative flex min-w-full flex-1 flex-col'>
			<div className='flex  flex-1 items-center gap-4 pb-3'>
				<Moon.Icon moon_phase={moon_phase} />
				<div className='text-center text-sm'>{description}</div>
			</div>
			<Moon.Content moonrise={moonrise} moonset={moonset} />
		</div>
	);
};

// Assigning the MoonIcon component to Moon.Icon for a structured approach
Moon.Icon = MoonIcon;
// Assigning the MoonContent component to Moon.Content for displaying detailed moon information
Moon.Content = MoonContent;

export default Moon;
