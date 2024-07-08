import React, { Suspense, memo } from 'react';
import { useFetchState } from '../../hooks/useFetchState';
import { selectWeatherIconId } from '../../store/slices/weatherApiSlice';
import Skeleton from '../UI/SkeletonLoader/Skeleton';

const SnowDynamicIcon = React.lazy(() => import('../Icons/SnowDynamicIcon'));
const ClearCloudyDynamicIcon = React.lazy(() => import('../Icons/ClearCloudyDynamicIcon'));
const CloudsDynamicIcon = React.lazy(() => import('../Icons/CloudsDynamicIcon'));
const PrecipitationDynamicIcon = React.lazy(() => import('../Icons/PrecipitationDynamicIcon'));
const MistDynamicIcon = React.lazy(() => import('../Icons/MistDynamicIcon'));

export type MainWeatherIcon = {
	[key: string]: React.ReactNode;
};

/**
 * MainWeatherIcon component
 *
 * This component fetches the weather icon data and displays the appropriate weather icon
 * based on the fetched data. It uses React's lazy loading and suspense to load the icons
 * dynamically.
 *
 * @returns {JSX.Element | null} The weather icon component or null if there is an error or no data.
 */
const MainWeatherIcon = memo(() => {
	const {
		status: { isLoading, isError, isSuccess },
		data,
	} = useFetchState(selectWeatherIconId);

	// Show a skeleton loader while the data is loading
	if (isLoading) return <Skeleton />;

	// Return null if there is an error or no data
	if (isError || !isSuccess || !data) return null;

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

	// Select the appropriate weather icon component based on the icon code
	const WeatherIconElement = iconComponents[iconCode] || iconComponents['default'];

	return (
		<div className='mx-2 h-10 w-10 '>
			<Suspense fallback={'loading'}>{WeatherIconElement}</Suspense>
		</div>
	);
});

export default MainWeatherIcon;
