import { useRef } from 'react';
import { IHourlyForecast } from '../context/WeatherData.types';
import { HourlyChart } from '../utils/services/curves/hourly.service';

/**
 * A custom hook for processing hourly weather forecast data and generating chart-related information.
 *
 * @param {IHourlyForecast} options - The options for processing hourly forecast data.
 * @param {any} options.hourlyForecast - The hourly forecast data.
 * @param {string} options.timezone - The timezone for the forecast.
 * @param {any} options.userPreferredMetrics - The user's preferred metrics for weather data.
 *
 * @returns {Object} An object containing various chart-related data and references:
 *   - wrapperRef: A ref object for the chart wrapper div.
 *   - curve: The curve data for the hourly chart.
 *   - scale: The scale information for the chart.
 *   - precipitationRects: Rectangle data for precipitation visualization.
 *   - precipitationDesc: Description of precipitation.
 *   - timeLine: Time line data for the chart.
 *   - weatherDesc: Description of weather conditions.
 */
export const useHourly = ({ hourlyForecast, timezone, userPreferredMetrics }: IHourlyForecast) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const hourlyService = new HourlyChart(hourlyForecast, timezone, userPreferredMetrics);

	const scale = hourlyService.getScale();
	const curve = hourlyService.drawCurve(true);
	const precipitationRects = hourlyService.getPrecipitationRects();
	const precipitationDesc = hourlyService.getPrecipitationDescription();
	const timeLine = hourlyService.getTimeLine();
	const weatherDesc = hourlyService.getWeatherDescription();

	return {
		wrapperRef,
		curve,
		scale,
		precipitationRects,
		precipitationDesc,
		timeLine,
		weatherDesc,
	};
};
