import { useGetMainWeather } from '../../context/WeatherData.context';
import { IMainWeather } from '../../context/WeatherData.types';
import withLoading from '../UI/WithLoading';
import MainWeatherIcon from './MainWeatherIcon';

/**
 * MainWeather component displays the main weather information.
 * It uses the `useFetchState` hook to retrieve weather data from the store,
 * selected by `selectMainWeather`. It handles loading, error, and success states
 * to conditionally render the weather data or a loading skeleton.
 *
 * @returns {JSX.Element | null} The main weather information as a JSX element,
 * or null if there is an error or the data is not available.
 */
const MainWeather = ({ data }: { data: IMainWeather }) => {
	const { temperature, condition, minTemperature, maxTemperature, cloudCoverage } = data;

	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='flex items-center justify-end sm:gap-2'>
				<span className='text-[1.5rem] font-bold sm:text-[2rem]'>
					{temperature.value}
					{temperature.units}
				</span>
				<span className='hidden text-right text-sm md:inline-block'>
					{maxTemperature.value}
					{maxTemperature.units}/{minTemperature.value}
					{minTemperature.units}
				</span>
				<div className='hidden flex-col text-[0.6rem] lg:flex'>
					<span>{condition}</span>
					<span>clouds: {cloudCoverage}%</span>
				</div>
				<MainWeatherIcon />
			</div>
		</div>
	);
};

export default withLoading<{}, IMainWeather>(MainWeather, useGetMainWeather);
