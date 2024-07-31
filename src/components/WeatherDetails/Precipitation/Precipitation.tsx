import { useGetPrecipitationInfo } from '../../../context/WeatherData.context';
import { IPrecipitationInfo } from '../../../context/WeatherData.types';
import { usePrecipitation } from '../../../hooks/usePrecipitation';
import Wrapper from '../../UI/Global/Wrapper';
import withLoading from '../../UI/WithLoading';
import AxisComponent from './AxisComponent';
import CurveComponent from './CurveComponent';
import GradientMaskComponent from './GradientMaskComponent';
import PrecipitationSVGContainer from './PrecipitationSVGContaienr';
import TimeLineComponent from './TimeLineComponent';

/**
 * Renders a precipitation chart component.
 * This component displays precipitation data in a graphical format, including gradient, timeline, axis, and curve.
 * If no precipitation data is available, it shows a message instead.
 *
 * @param {Object} props - The component props.
 * @param {IPrecipitationInfo} props.data - The precipitation data to be displayed.
 * @returns {JSX.Element} A React component representing the precipitation chart.
 */
const Precipitation = ({ data }: { data: IPrecipitationInfo }) => {
	const { wrapperRef, curve, gradientColors, timeLine, axis, dimension, hasPrecipitation } =
		usePrecipitation(data);

	return (
		<Precipitation.Wrapper
			ref={wrapperRef || null}
			className='relative flex  h-full w-full flex-shrink justify-center overflow-hidden'
		>
			<Precipitation.Container dimension={dimension} isPrecipitation={hasPrecipitation}>
				<Precipitation.GradientMask colors={gradientColors} />
				<Precipitation.TimeLine timeLine={timeLine} />
				<Precipitation.Axis axis={axis} />
				<Precipitation.Curve mainCurve={curve.mainCurve} backCurve={curve.backPathCurve} />
			</Precipitation.Container>

			{!hasPrecipitation && (
				<Precipitation.Wrapper className='absolute top-1/2 translate-y-1/2 underline'>
					No Precipitation data
				</Precipitation.Wrapper>
			)}
		</Precipitation.Wrapper>
	);
};

Precipitation.Wrapper = Wrapper;
Precipitation.Container = PrecipitationSVGContainer;
Precipitation.GradientMask = GradientMaskComponent;
Precipitation.TimeLine = TimeLineComponent;
Precipitation.Axis = AxisComponent;
Precipitation.Curve = CurveComponent;

export default withLoading<{}, IPrecipitationInfo>(Precipitation, useGetPrecipitationInfo);
