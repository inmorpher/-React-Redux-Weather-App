import { useGetDailyForecast } from '../../../context/WeatherData.context';
import { IDailyForecast } from '../../../context/WeatherData.types';
import { useDailyContext } from '../../../hooks/useDailyContext';
import withLoading from '../../UI/WithLoading';
import DailyColors from './DailyColors';
import DailyContainer from './DailyContainer';
import DailyDetails from './DailyDetails';
import DailyList from './DailyList/DailyList';

/**
 * Renders the daily weather forecast component.
 * This component displays the daily weather colors, list of daily values, and detailed daily weather information.
 *
 * @param {Object} props - The component props.
 * @param {IDailyForecast} props.data - The daily forecast data.
 * @param {Array} props.data.dailyValues - An array of daily weather values.
 * @param {Array} props.data.colors - An array of colors associated with the weather conditions.
 * @returns {JSX.Element} A React component that displays the daily weather forecast.
 */
const Daily = ({ data: { dailyValues, colors } }: { data: IDailyForecast }) => {
	const { containerRef, dailyDetailsRef, dailyListRef } = useDailyContext();

	return (
		<DailyContainer containerRef={containerRef}>
			<DailyColors colors={colors} />
			<div className='relative inline-block h-full min-w-full' ref={dailyListRef}>
				<DailyList dailyValues={dailyValues} />
			</div>
			<div
				className='inline-block min-w-full overflow-hidden overflow-y-scroll scrollbar-hidden scrollbar-hidden-webkit'
				ref={dailyDetailsRef}
			>
				<DailyDetails />
			</div>
		</DailyContainer>
	);
};

export default withLoading<{}, IDailyForecast>(Daily, useGetDailyForecast);
