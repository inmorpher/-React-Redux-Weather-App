import { useFetchState } from '../../../hooks/useFetchState';
import { selectWind } from '../../../store/slices/weatherApiSlice';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import WindIcon from './WindIcon';
import WindSpeedDetails from './WindSpeedDetails';

/**
 * Wind component that fetches and displays wind data.
 * It uses the `useFetchState` hook to fetch wind data from the store.
 * Depending on the fetch status, it either shows a loading skeleton,
 * an error state, or the wind data.
 *
 * @component
 * @returns {JSX.Element | null} The rendered component or null if there's an error or no data.
 */
const Wind = () => {
	const {
		status: { isError, isLoading, isSuccess },
		data,
	} = useFetchState(selectWind);

	// Show loading skeleton while data is being fetched
	if (isLoading) return <Skeleton />;

	// Return null if there's an error or no data
	if (isError || !isSuccess || !data) return null;

	const { deg, speed, gust, literal } = data;
	return (
		<div className='relative flex flex-1 flex-col'>
			<Wind.Icon deg={deg} literal={literal} />
			<Wind.SpeedDetails speed={speed} gust={gust} />
		</div>
	);
};

// Assign WindIcon component to Wind.Icon
Wind.Icon = WindIcon;

// Assign WindSpeedDetails component to Wind.SpeedDetails
Wind.SpeedDetails = WindSpeedDetails;

export default Wind;
