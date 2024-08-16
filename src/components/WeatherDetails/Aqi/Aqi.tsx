import { useGetAqi } from '../../../context/WeatherData.context';
import { ScaleReturn, ScaleType } from '../../../utils/services/definitions/svgScale.definition';
import SpanText from '../../UI/Global/SpanText';
import Wrapper from '../../UI/Global/Wrapper';
import SvgScale from '../../UI/SvgScale/SvgScale';
import withLoading from '../../UI/WithLoading';

/**
 * Aqi component fetches and displays the Air Quality Index (AQI) data.
 * It uses the `useFetchState` hook to fetch the AQI data from the store.
 * Depending on the fetch status, it either shows a loading skeleton, an error state, or the AQI data.
 * The AQI data is displayed using the `SvgScale` component.
 *
 * @returns {JSX.Element | null} The rendered component or null if there's an error or no data.
 */
const Aqi = ({
	data: { colors, values } = { colors: [], values: {} },
}: {
	data?: ScaleReturn;
}): JSX.Element | null => {
	return (
		<Aqi.Wrapper className='relative flex flex-1 flex-col'>
			<Aqi.Wrapper className='flex flex-1 items-end gap-4 px-3'>
				<Aqi.Text
					className='text-[2.5rem] leading-[2.5rem]'
					style={{ color: values?.color || '#ffffff' }}
				>
					{values?.value !== undefined ? values.value : '0'}
				</Aqi.Text>
				<Aqi.Text className='leading-[2.5rem]'>
					{values?.level !== undefined ? values.level : 'N/A'}
				</Aqi.Text>
			</Aqi.Wrapper>
			<Aqi.Wrapper className='flex flex-1 items-end'>
				<Aqi.SVGScale data={{ values, colors }} type={ScaleType.aqi} />
			</Aqi.Wrapper>
		</Aqi.Wrapper>
	);
};

Aqi.Wrapper = Wrapper;
Aqi.Text = SpanText;
Aqi.SVGScale = SvgScale;

const AqiWithLoading = withLoading<{}, ScaleReturn>(Aqi, useGetAqi);

export { Aqi, AqiWithLoading as AqiWithLoading };
export default AqiWithLoading;
