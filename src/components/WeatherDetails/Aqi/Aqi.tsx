import { useGetAqi } from '../../../context/WeatherData.context';
import { ScaleType, getSvgScale } from '../../../utils/services/definitions/svgScale.definition';
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
export const Aqi = ({ data: aqi }: { data: number }) => {
	const aqiScale = getSvgScale(ScaleType.aqi, aqi);

	return (
		<Aqi.Wrapper className='relative flex flex-1 flex-col'>
			<Aqi.Wrapper className='flex flex-1 items-end gap-4 px-3'>
				{aqiScale.values?.level && aqiScale.values?.value ? (
					<>
						<Aqi.Text
							className='text-[2.5rem] leading-[2.5rem]'
							style={{ color: aqiScale.values.color || '#fff' }}
						>
							{aqiScale.values.value}
						</Aqi.Text>
						<Aqi.Text className='leading-[2.5rem]'>{aqiScale.values.level}</Aqi.Text>
					</>
				) : (
					<Aqi.Text>N/A</Aqi.Text>
				)}
			</Aqi.Wrapper>
			<Aqi.Wrapper className='flex flex-1 items-end'>
				<Aqi.SVGScale data={aqiScale} type={ScaleType.aqi} />
			</Aqi.Wrapper>
		</Aqi.Wrapper>
	);
};

Aqi.Wrapper = Wrapper;
Aqi.Text = SpanText;
Aqi.SVGScale = SvgScale;

export default withLoading<{}, number>(Aqi, useGetAqi);
