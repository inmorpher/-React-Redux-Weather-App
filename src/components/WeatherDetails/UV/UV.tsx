import { useGetUvi } from '../../../context/WeatherData.context';
import { ScaleReturn, ScaleType } from '../../../utils/services/definitions/svgScale.definition';
import SpanText from '../../UI/Global/SpanText';
import Wrapper from '../../UI/Global/Wrapper';
import SvgScale from '../../UI/SvgScale/SvgScale';
import withLoading from '../../UI/WithLoading';

/**
 * Uv component fetches and displays the UV index data.
 * It uses the `useFetchState` hook to fetch the UV index data from the store.
 * Depending on the fetch status, it either shows a loading skeleton, an error state, or the UV index data.
 *
 * @returns {JSX.Element | null} The rendered component or null if there's an error or no data.
 */
const UV = ({
	data: { colors, values } = { colors: [], values: {} },
}: {
	data?: ScaleReturn;
}): JSX.Element | null => {
	return (
		<UV.Wrapper className='relative flex flex-1 flex-col'>
			<UV.Wrapper className='flex flex-1 items-end gap-4 px-3'>
				<UV.Text
					className='text-[2.5rem] leading-[2.5rem]'
					style={{ color: values?.color || '#ffffff' }}
				>
					{values?.value !== undefined ? values.value : '0'}
				</UV.Text>
				<UV.Text className='leading-[2.5rem]'>
					{values?.level !== undefined ? values.level : 'N/A'}
				</UV.Text>
			</UV.Wrapper>
			<UV.Wrapper className='flex flex-1 items-end'>
				<SvgScale data={{ values, colors }} type={ScaleType.uvi} />
			</UV.Wrapper>
		</UV.Wrapper>
	);
};

// Assign UVContent component to UV.Content
UV.Wrapper = Wrapper;
UV.Text = SpanText;

const UVWithLoading = withLoading<{}, ScaleReturn>(UV, useGetUvi);
export { UV, UVWithLoading as UVWithLoadingComponent };
export default UVWithLoading;
