import { useFetchState } from '../../../hooks/useFetchState';
import { selectFeeling } from '../../../store/slices/weatherApiSlice';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import FeelingContent from './FeelingContent';
import FeelingIcon from './FeelingIcon';

/**
 * Represents the Feeling component that displays the current weather feeling.
 * It utilizes the `useFetchState` hook to fetch the weather feeling data and
 * conditionally renders different components based on the fetch status.
 *
 * @returns {JSX.Element | null} The Feeling component UI if data is available and fetch is successful,
 * a Skeleton loader during loading, or null if an error occurs or data is not available.
 */
const Feeling = () => {
	const {
		status: { isLoading, isError, isSuccess },
		data,
	} = useFetchState(selectFeeling);

	// Display a skeleton loader while the data is loading
	if (isLoading) return <Skeleton />;

	// Return null if there's an error or data is not successfully fetched
	if (!data || !isSuccess || isError) return null;

	const { temp, condition } = data;

	// Render the weather feeling UI with temperature and condition
	return (
		<div className='relative flex flex-1 flex-col'>
			<div className='flex flex-1 items-end gap-4'>
				<Feeling.Icon />
				<Feeling.Content temp={temp} />
			</div>
			<div className='flex flex-1 flex-col justify-end text-center text-sm'>{condition}</div>
		</div>
	);
};

// Assigning subcomponents to the Feeling component for better encapsulation and usage
Feeling.Icon = FeelingIcon;
Feeling.Content = FeelingContent;

export default Feeling;
