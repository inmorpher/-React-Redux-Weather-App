import { useFetchState } from '../../../hooks/useFetchState';

import { selectPressure } from '../../../store/slices/weatherApiSlice';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import PressureIndicator from './PressureIndicator';

/**
 * Renders the Pressure component which displays the current pressure data.
 * It utilizes the `useFetchState` hook to retrieve pressure data from the store,
 * and conditionally renders different UI elements based on the data's loading state.
 *
 * @returns {JSX.Element | null} The Pressure component UI or null if data is not available or an error occurred.
 */
const Pressure = () => {
	const {
		status: { isLoading, isError, isSuccess },
		data,
	} = useFetchState(selectPressure);

	// Display a skeleton loader while the data is loading
	if (isLoading) return <Skeleton />;

	// Return null if there is no data, the fetch was not successful, or an error occurred
	if (!data || !isSuccess || isError) return null;

	const { coords, angle, pressure } = data;

	// Render the pressure information using the PressureIndicator component and display the pressure value
	return (
		<div className='relative flex flex-1 flex-col'>
			<div className='flex items-center justify-center'>
				<Pressure.Indicator coords={coords} angle={angle} />
			</div>
			<div className='flex flex-1 flex-col justify-end text-center text-sm'>
				{pressure}hpa
			</div>
		</div>
	);
};

// Assign the PressureIndicator component to the Pressure component for easy access
Pressure.Indicator = PressureIndicator;

export default Pressure;
