import { useFetchState } from '../../../hooks/useFetchState';
import { selectAQI } from '../../../store/slices/weatherApiSlice';
import { ScaleType, getSvgScale } from '../../../utils/services/definitions/svgScale.definition';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import SvgScale from '../../UI/SvgScale/SvgScale';

/**
 * Aqi component fetches and displays the Air Quality Index (AQI) data.
 * It uses the `useFetchState` hook to fetch the AQI data from the store.
 * Depending on the fetch status, it either shows a loading skeleton, an error state, or the AQI data.
 * The AQI data is displayed using the `SvgScale` component.
 *
 * @returns {JSX.Element | null} The rendered component or null if there's an error or no data.
 */
const Aqi = () => {
	const {
		status: { isLoading, isError, isSuccess },
		data,
	} = useFetchState(selectAQI);

	// Show loading skeleton while data is being fetched
	if (isLoading) return <Skeleton />;

	// Return null if there's an error or no data
	if (!data || !isSuccess || isError) return null;

	// Get the AQI scale data
	const aqi = getSvgScale(ScaleType.aqi, data?.aqi || 0);

	return (
		<div className='relative flex flex-1 flex-col'>
			<div className='flex flex-1 items-end gap-4 px-3'>
				{aqi.values?.level && aqi.values?.value ? (
					<>
						<span
							className='text-[2.5rem] leading-[2.5rem]'
							style={{ color: aqi.values?.color || '#fff' }}
						>
							{aqi.values.value}
						</span>
						<span className='leading-[2.5rem]'>{aqi.values.level}</span>
					</>
				) : (
					<span>N/A</span>
				)}
			</div>
			<div className='flex flex-1 items-end'>
				<SvgScale data={aqi} type={ScaleType.aqi} />
			</div>
		</div>
	);
};

export default Aqi;
