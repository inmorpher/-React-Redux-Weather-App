import { useGetUvi } from '../../../context/WeatherData.context';
import { ScaleType, getSvgScale } from '../../../utils/services/definitions/svgScale.definition';
import Wrapper from '../../UI/Global/Wrapper';
import SvgScale from '../../UI/SvgScale/SvgScale';
import withLoading from '../../UI/WithLoading';
import UVContent from './UVContent';

/**
 * Uv component fetches and displays the UV index data.
 * It uses the `useFetchState` hook to fetch the UV index data from the store.
 * Depending on the fetch status, it either shows a loading skeleton, an error state, or the UV index data.
 *
 * @returns {JSX.Element | null} The rendered component or null if there's an error or no data.
 */
const Uv = ({ data: uvi }: { data: number }) => {
	console.log('UV data:', uvi);
	const uviTransformed = getSvgScale(ScaleType.uvi, uvi);

	return (
		<Uv.Wrapper className='relative flex flex-1 flex-col'>
			<Uv.Wrapper className='flex flex-1 items-end gap-4 px-3'>
				<Uv.Content uvi={uviTransformed} />
			</Uv.Wrapper>
			<Uv.Wrapper className='flex flex-1 items-end'>
				<SvgScale data={uviTransformed} type={ScaleType.uvi} />
			</Uv.Wrapper>
		</Uv.Wrapper>
	);
};

// Assign UVContent component to Uv.Content
Uv.Wrapper = Wrapper;
Uv.Content = UVContent;

export default withLoading(Uv, useGetUvi);
