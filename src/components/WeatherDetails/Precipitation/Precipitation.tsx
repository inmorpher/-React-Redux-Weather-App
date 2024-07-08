import { usePrecipitation } from '../../../hooks/usePrecipitation';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import AxisComponent from './AxisComponent';
import CurveComponent from './CurveComponent';
import GradientMaskComponent from './GradientMaskComponent';
import PrecipitationSVGContainer from './PrecipitationSVGContaienr';
import TimeLineComponent from './TimeLineComponent';

/**
 * The `Precipitation` component visualizes precipitation data using SVG elements.
 * It leverages custom hooks and child components to display a dynamic and responsive
 * precipitation chart. The component handles loading states, absence of data, and
 * the rendering of the chart's various parts, such as gradients, timelines, axes, and curves.
 */
const Precipitation = () => {
	const {
		status, // Contains the loading status of the precipitation data.
		wrapperRef, // A ref object for the container element to enable DOM manipulations.
		isWrapper, // A boolean indicating if the wrapper element is ready or not.
		curve, // Contains data for the main and back path curves of the precipitation chart.
		gradientColors, // An array of colors used for the gradient mask in the chart.
		timeLine, // Data for rendering the vertical timeline component.
		axis, // Data for rendering the horizontal axis lines.
		dimension, // The dimensions of the SVG container.
		isPrecipitation, // A boolean indicating if there is precipitation data to display.
	} = usePrecipitation();

	return (
		<div
			ref={wrapperRef || null} // Attaches or detaches the ref to the container div.
			className='relative flex  h-full w-full flex-shrink justify-center overflow-hidden'
		>
			{status.isLoading || !isWrapper ? (
				<Skeleton /> // Displays a loading skeleton if data is loading or wrapper is not ready.
			) : (
				<Precipitation.Container dimension={dimension} isPrecipitation={isPrecipitation}>
					{/* Renders the SVG container and its child components if data is available. */}
					<Precipitation.GradientMask colors={gradientColors} /> // Defines the gradient
					mask for the chart.
					<Precipitation.TimeLine timeLine={timeLine} /> // Renders the vertical timeline.
					<Precipitation.Axis axis={axis} /> // Renders the horizontal axis lines.
					<Precipitation.Curve
						mainCurve={curve.mainCurve} // The main curve path data.
						backCurve={curve.backPathCurve} // The back curve path data for additional visual depth.
					/>
				</Precipitation.Container>
			)}
			{!isPrecipitation && status.isSuccess && (
				<div className='absolute top-1/2 translate-y-1/2 underline'>
					No Precipitation data
				</div>
			)}
		</div>
	);
};

// Assigning child components to the Precipitation function for a cleaner component structure.
Precipitation.Container = PrecipitationSVGContainer;
Precipitation.GradientMask = GradientMaskComponent;
Precipitation.TimeLine = TimeLineComponent;
Precipitation.Axis = AxisComponent;
Precipitation.Curve = CurveComponent;

export default Precipitation;
