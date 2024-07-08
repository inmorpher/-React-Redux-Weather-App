import { useFetchState } from '../../../hooks/useFetchState';
import { selectUVI } from '../../../store/slices/weatherApiSlice';
import { ScaleType, getSvgScale } from '../../../utils/services/definitions/svgScale.definition';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import SvgScale from '../../UI/SvgScale/SvgScale';
import UVContent from './UVContent';

/**
 * Uv component fetches and displays the UV index data.
 * It uses the `useFetchState` hook to fetch the UV index data from the store.
 * Depending on the fetch status, it either shows a loading skeleton, an error state, or the UV index data.
 *
 * @returns {JSX.Element | null} The rendered component or null if there's an error or no data.
 */
const Uv = () => {
	const {
		status: { isError, isLoading, isSuccess },
		data: { uvi } = { uvi: undefined },
	} = useFetchState(selectUVI);

	// Return null if there's an error or the fetch was not successful or there's no data

	// Show loading skeleton while data is being fetched
	if (isLoading) {
		return <Skeleton />;
	}

	if (isError || !isSuccess || uvi === undefined) return null;
	// Get the UV index scale data
	const uviTransformed = getSvgScale(ScaleType.uvi, uvi);

	return (
		<div className='relative flex flex-1 flex-col'>
			<div className='flex flex-1 items-end gap-4 px-3'>
				<Uv.Content uvi={uviTransformed} />
			</div>
			<div className='flex flex-1 items-end'>
				<SvgScale data={uviTransformed} type={ScaleType.uvi} />
			</div>
		</div>
	);
};

// Assign UVContent component to Uv.Content
Uv.Content = UVContent;

export default Uv;
