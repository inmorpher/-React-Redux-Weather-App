import React, { Suspense } from 'react';
import { useGetWeatherIconInfo } from '../../context/WeatherData.context';

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
const MainWeatherIcon = () => {
	const icon = useGetWeatherIconInfo();

	// Map of weather icon codes to their respective components
	const iconComponents: MainWeatherIcon = {
		'01': (
			<ClearCloudyDynamicIcon
				iconCode={icon?.iconCode ?? ''}
				timeOfDay={icon?.timeOfDay ?? 'day'}
			/>
		),
		'02': (
			<ClearCloudyDynamicIcon
				iconCode={icon?.iconCode ?? ''}
				timeOfDay={icon?.timeOfDay ?? 'day'}
			/>
		),
		'03': <CloudsDynamicIcon iconCode={icon?.iconCode ?? ''} />,
		'04': <CloudsDynamicIcon iconCode={icon?.iconCode ?? ''} />,
		'09': <PrecipitationDynamicIcon iconCode={icon?.iconCode ?? ''} />,
		'10': <PrecipitationDynamicIcon iconCode={icon?.iconCode ?? ''} />,
		'11': <PrecipitationDynamicIcon iconCode={icon?.iconCode ?? ''} />,
		'13': <SnowDynamicIcon />,
		'50': <MistDynamicIcon />,
		default: 'N/A',
	};

	// Get the appropriate weather icon component based on the icon code and time of day
	const WeatherIconElement = iconComponents[icon?.iconCode ?? 0] || iconComponents['default'];

	return (
		<div className='mx-2 h-10 w-10 ' data-testid='dynamic icon'>
			<Suspense fallback={'loading'}>{WeatherIconElement}</Suspense>
		</div>
	);
};

export default MainWeatherIcon;
