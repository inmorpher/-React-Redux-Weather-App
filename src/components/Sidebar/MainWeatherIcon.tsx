import React, { Suspense } from 'react';
import { useGetWeatherIconInfo } from '../../context/WeatherData.context';
import { IWeatherIcon } from '../../context/WeatherData.types';
import withLoading from '../UI/WithLoading';

const SnowDynamicIcon = React.lazy(() => import('../Icons/SnowDynamicIcon'));
const ClearCloudyDynamicIcon = React.lazy(() => import('../Icons/ClearCloudyDynamicIcon'));
const CloudsDynamicIcon = React.lazy(() => import('../Icons/CloudsDynamicIcon'));
const PrecipitationDynamicIcon = React.lazy(() => import('../Icons/PrecipitationDynamicIcon'));
const MistDynamicIcon = React.lazy(() => import('../Icons/MistDynamicIcon'));

export type MainWeatherIcon = {
	[key: string]: React.ReactNode;
};

/**
 * Renders a weather icon component based on the provided weather data.
 *
 * This component dynamically selects and renders the appropriate weather icon
 * based on the icon code and time of day. It uses React.lazy for code splitting
 * and Suspense for loading handling.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The weather data object.
 * @param {string} props.data.iconCode - The weather icon code (e.g., '01', '02', etc.).
 * @param {'day' | 'night'} props.data.timeOfDay - The time of day, either 'day' or 'night'.
 *
 * @returns {React.ReactElement} A div containing the appropriate weather icon component.
 */
export const MainWeatherIcon = ({ data }: { data: IWeatherIcon }) => {
	const { iconCode, timeOfDay } = data;

	// Map of weather icon codes to their respective components
	const iconComponents: MainWeatherIcon = {
		'01': <ClearCloudyDynamicIcon iconCode={iconCode} timeOfDay={timeOfDay} />,
		'02': <ClearCloudyDynamicIcon iconCode={iconCode} timeOfDay={timeOfDay} />,
		'03': <CloudsDynamicIcon iconCode={iconCode} />,
		'04': <CloudsDynamicIcon iconCode={iconCode} />,
		'09': <PrecipitationDynamicIcon iconCode={iconCode} />,
		'10': <PrecipitationDynamicIcon iconCode={iconCode} />,
		'11': <PrecipitationDynamicIcon iconCode={iconCode} />,
		'13': <SnowDynamicIcon />,
		'50': <MistDynamicIcon />,
		default: 'N/A',
	};

	// Get the appropriate weather icon component based on the icon code and time of day
	const WeatherIconElement = iconComponents[iconCode] || iconComponents['default'];

	return (
		<div className='mx-2 h-10 w-10 '>
			<Suspense fallback={'loading'}>{WeatherIconElement}</Suspense>
		</div>
	);
};

export default withLoading<{}, IWeatherIcon>(MainWeatherIcon, useGetWeatherIconInfo);
