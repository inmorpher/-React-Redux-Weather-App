import { useHourly } from '../../../hooks/useHourly';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';

import HourlySVGContainer from './HourlySVGContainer';
import HourlySVGDefs from './HourlySVGDefs';
import Scale from './HourlyScale';

import HourlyChartCurve from './MainCurve/HourlyChartCurve';
import HourlyChartTimeLine from './MainCurve/HourlyChartTimeLine';
import HourlyPrecipitationDescription from './MainCurve/HourlyPrecipitationDescription';
import HourlyPrecipitationRects from './MainCurve/HourlyPrecipitationRects';
import HourlyUnderline from './MainCurve/HourlyUnderline';
import HourlyWeatherDescription from './MainCurve/HourlyWeatherDescription';

/**
 * Hourly component that displays hourly weather data.
 * It fetches data using the useHourly hook and displays different parts of the hourly weather chart.
 *
 * @returns {JSX.Element | null} The rendered component or null if there is an error.
 */
const Hourly = () => {
	// Destructure the status and data from the useHourly hook
	const {
		status: { isLoading, isError, isSuccess },
		data,
	} = useHourly();

	// Show a skeleton loader while data is loading
	if (isLoading) return <Skeleton />;

	// Return null if there is an error or the data fetch was not successful
	if (isError || !isSuccess) return null;

	// Destructure the necessary data for rendering the chart
	const {
		scale,
		precipitationRects,
		curve,
		precipitationDesc,
		timeLine,
		weatherDesc,
		wrapperRef,
	} = data;

	// Render the hourly weather chart
	return (
		<div className='relative flex h-full w-full items-center' ref={wrapperRef}>
			<Hourly.Scale scaleMarks={scale} />
			<div className=' overflow-x-scroll scrollbar-hidden scrollbar-hidden-webkit'>
				<Hourly.SVGContainer>
					<Hourly.SVGDefs />
					<Hourly.PrecipitationRects precipitationRectangles={precipitationRects} />
					<Hourly.ChartCurve curvePath={curve?.mainCurve} />
					<Hourly.PrecipitationDescription precipitationDescription={precipitationDesc} />
					<Hourly.ChartTimeLine data={timeLine} />
					<Hourly.WeatherDescription weatherDescription={weatherDesc} />
					<Hourly.Underline />
				</Hourly.SVGContainer>
			</div>
		</div>
	);
};

// Assigning components to Hourly for easier access
Hourly.Scale = Scale;
Hourly.SVGContainer = HourlySVGContainer;
Hourly.SVGDefs = HourlySVGDefs;
Hourly.PrecipitationRects = HourlyPrecipitationRects;
Hourly.ChartCurve = HourlyChartCurve;
Hourly.PrecipitationDescription = HourlyPrecipitationDescription;
Hourly.ChartTimeLine = HourlyChartTimeLine;
Hourly.WeatherDescription = HourlyWeatherDescription;
Hourly.Underline = HourlyUnderline;

export default Hourly;
