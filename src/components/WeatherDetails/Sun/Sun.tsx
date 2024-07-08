import { useSunPosition } from '../../../hooks/useSunPosition';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import SunPositionIcon from './SunPostionIcon';
import SunTimings from './SunTimings';

/**
 * Sun component that displays the sun's position and timings.
 * It uses the `useSunPosition` hook to fetch the sun's data.
 *
 * @returns {JSX.Element | null} The rendered component or null if there's an error or data is missing.
 */
const Sun = () => {
	const {
		status: { isError, isLoading, isSuccess },
		data,
		pathRef,
		indicatorRef,
	} = useSunPosition();

	// Show a loading skeleton while data is being fetched
	if (isLoading) return <Skeleton />;

	// Return null if there's an error or required data is missing
	if (isError || !data.sunset || !data.sunrise || !isSuccess) return null;

	const { isDay, sunrise, sunset } = data;

	return (
		<div className='relative flex min-w-full flex-1 flex-col'>
			<Sun.PositionIcon isDay={!!isDay} pathRef={pathRef} indicatorRef={indicatorRef} />
			<Sun.Timings sunrise={sunrise} sunset={sunset} isDay={!!isDay} />
		</div>
	);
};

// Assigning subcomponents to the Sun component
Sun.PositionIcon = SunPositionIcon;
Sun.Timings = SunTimings;

export default Sun;
