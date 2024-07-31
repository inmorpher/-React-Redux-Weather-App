import { useGetHourlyForecast } from '../../../context/WeatherData.context';
import { IHourlyForecast } from '../../../context/WeatherData.types';
import { useHourly } from '../../../hooks/useHourly';
import Wrapper from '../../UI/Global/Wrapper';
import withLoading from '../../UI/WithLoading';

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
 * Renders the hourly weather forecast component.
 * This component displays various weather data in a chart format, including precipitation, temperature curve, and timeline.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {IHourlyForecast} props.data - The hourly forecast data to be displayed.
 * @returns {JSX.Element} A React component that renders the hourly weather forecast chart.
 */
const Hourly = ({ data: hourlyData }: { data: IHourlyForecast }) => {
	const { scale, precipitationRects, curve, precipitationDesc, timeLine, weatherDesc, wrapperRef } =
		useHourly(hourlyData);

	return (
		<Hourly.Wrapper className='relative flex h-full w-full items-center' ref={wrapperRef}>
			<Hourly.Scale scaleMarks={scale} />
			<Hourly.Wrapper className=' overflow-x-scroll scrollbar-hidden scrollbar-hidden-webkit'>
				<Hourly.SVGContainer>
					<Hourly.SVGDefs />
					<Hourly.PrecipitationRects precipitationRectangles={precipitationRects} />
					<Hourly.ChartCurve curvePath={curve.mainCurve} />
					<Hourly.PrecipitationDescription precipitationDescription={precipitationDesc} />
					<Hourly.ChartTimeLine data={timeLine} />
					<Hourly.WeatherDescription weatherDescription={weatherDesc} />
					<Hourly.Underline />
				</Hourly.SVGContainer>
			</Hourly.Wrapper>
		</Hourly.Wrapper>
	);
};

Hourly.Wrapper = Wrapper;
Hourly.Scale = Scale;
Hourly.SVGContainer = HourlySVGContainer;
Hourly.SVGDefs = HourlySVGDefs;
Hourly.PrecipitationRects = HourlyPrecipitationRects;
Hourly.ChartCurve = HourlyChartCurve;
Hourly.PrecipitationDescription = HourlyPrecipitationDescription;
Hourly.ChartTimeLine = HourlyChartTimeLine;
Hourly.WeatherDescription = HourlyWeatherDescription;
Hourly.Underline = HourlyUnderline;

export default withLoading<{}, IHourlyForecast>(Hourly, useGetHourlyForecast);
