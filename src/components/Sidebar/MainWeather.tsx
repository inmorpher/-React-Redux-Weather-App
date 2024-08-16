import { useGetMainWeather } from '../../context/WeatherData.context';
import { IMainWeather } from '../../context/WeatherData.types';
import SpanText from '../UI/Global/SpanText';
import Wrapper from '../UI/Global/Wrapper';
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
const MainWeather = ({ data }: { data: IMainWeather | undefined }) => {
	const { temperature, condition, minTemperature, maxTemperature, cloudCoverage } = data || {};
	return (
		<MainWeather.Wrapper className='flex flex-col items-center justify-center'>
			<MainWeather.Wrapper className='flex items-center justify-end sm:gap-2'>
				<MainWeather.Text
					className='text-[1.5rem] font-bold sm:text-[2rem]'
					aria-label='main-current-temperature'
				>
					{temperature?.value ?? 'N/A'}
					{temperature?.units ?? ''}
				</MainWeather.Text>
				<MainWeather.Text
					className='hidden text-right text-sm md:inline-block'
					aria-label='main-min-max-temperatures'
				>
					{maxTemperature?.value ?? 'N/A'}
					{maxTemperature?.units ?? ''}/{minTemperature?.value ?? 'N/A'}
					{minTemperature?.units ?? ''}
				</MainWeather.Text>
				<MainWeather.Wrapper className='hidden flex-col text-[0.6rem] lg:flex'>
					<MainWeather.Text>{condition ?? 'N/A'}</MainWeather.Text>
					<MainWeather.Text>clouds: {cloudCoverage ?? 0}%</MainWeather.Text>
				</MainWeather.Wrapper>
				<MainWeatherIcon />
			</MainWeather.Wrapper>
		</MainWeather.Wrapper>
	);
};

MainWeather.Wrapper = Wrapper;
MainWeather.Text = SpanText;

const MainWeatherWithLoading = withLoading<{}, IMainWeather>(MainWeather, useGetMainWeather);

export { MainWeather, MainWeatherWithLoading as MainWeatherWithLoading };

export default MainWeatherWithLoading;
