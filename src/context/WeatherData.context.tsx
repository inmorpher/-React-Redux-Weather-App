import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeather } from '../api/weatherApi';
import { IWeatherData } from '../store/weather.type';
import {
	MetricConverter,
	MetricReturnType,
	MetricValue,
} from '../utils/services/converter/metric.converter';
import { TimeService } from '../utils/services/time/time.service';
import { useUserMetrics } from './User.context';
import { IWeatherIcon, UseGetCityInfoReturn, UseGetMainWeatherReturn } from './WeatherData.types';

interface WeatherContextProps {
	status: import('@tanstack/react-query').QueryStatus;
	error: Error | null;
	weatherData: IWeatherData | undefined;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
	const URLParams = useParams();

	const urlParams = Object.values(URLParams).join(',');
	const {
		status,
		error,
		data: weatherData,
	} = useQuery({
		enabled: !!urlParams,
		queryKey: ['weather', urlParams],
		queryFn: async () => fetchWeather(urlParams),
		refetchInterval: 1000 * 60 * 5, // 15 minutes
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	/**
	 * Memoized function to get the city name and related information from the weather data.
	 *
	 * @returns {Object} An object containing city information:
	 *   @property {string } city - The name of the city.
	 *   @property {string | undefined} country - The country code or full country name.
	 *   @property {string} state - The state name, or an empty string if not available.
	 *   @property {number | undefined} lat - The latitude of the location.
	 *   @property {number | undefined} lon - The longitude of the location.
	 *   @property {string} time - The current time in the location's timezone, formatted as hours and minutes.
	 */

	return (
		<WeatherContext.Provider value={{ weatherData, status, error }}>
			{children}
		</WeatherContext.Provider>
	);
};

export const useWeatherData = () => {
	const context = useContext(WeatherContext);
	if (!context) {
		throw new Error('useWeatherData must be used within a WeatherProvider');
	}
	return {
		weatherData: context.weatherData,
		status: context.status,
		error: context.error,
	};
};

/**
 * A custom hook that retrieves and formats city information from the weather data.
 *
 * This hook uses the weather data context to extract relevant city information,
 * including the city name, country, state, coordinates, and local time.
 *
 * @returns {UseGetCityInfoReturn | undefined} An object containing formatted city information:
 *   - cityName: The name of the city
 *   - countryName: The country code or full country name
 *   - stateName: The state name (if available, otherwise an empty string)
 *   - latitude: The latitude of the location
 *   - longitude: The longitude of the location
 *   - localTime: The current local time in the city's timezone
 *
 * If weather data is not available, the hook returns undefined.
 */
export const useGetCityName = (): UseGetCityInfoReturn => {
	const { weatherData } = useWeatherData();

	return useMemo(() => {
		if (!weatherData) return undefined;

		const { city, countryCode, country, state, lat, lon, current, timezone } = weatherData;
		const currentTime = new TimeService(current?.dt ?? 0, timezone)
			.getTime('hoursAndMinutes')
			.result();

		return {
			cityName: city,
			countryName: countryCode || country,
			stateName: state || '',
			latitude: lat ?? 0,
			longitude: lon,
			localTime: currentTime,
		};
	}, [weatherData]);
};

const TEMP_FORMAT = 'short' as const;

const formatTemperature = (temp: number, metrics: MetricValue): MetricReturnType =>
	MetricConverter.getTemp(temp, metrics, TEMP_FORMAT);

/**
 * A custom hook that retrieves and formats the main weather information.
 *
 * This hook uses the weather data context and user metrics to extract and format
 * relevant weather information, including current temperature, weather condition,
 * min/max temperatures, and cloud coverage.
 *
 * @returns {UseGetMainWeatherReturn | undefined} An object containing formatted weather information:
 *   - temperature: The current temperature formatted according to user metrics
 *   - condition: The main weather condition (e.g., "Cloudy", "Sunny")
 *   - minTemperature: The minimum temperature for the day, formatted
 *   - maxTemperature: The maximum temperature for the day, formatted
 *   - cloudCoverage: The percentage of cloud coverage
 *
 * If weather data is not available, the hook returns undefined.
 */
export const useGetMainWeather = (): UseGetMainWeatherReturn => {
	const { weatherData } = useWeatherData();
	const userMetrics = useUserMetrics();

	return useMemo(() => {
		if (!weatherData?.current || !weatherData?.daily?.[0]) return undefined;
		console.log(userMetrics);

		const { current, daily } = weatherData;
		const { temp: currentTemperature, weather: currentWeather, clouds } = current;
		const todayForecast = daily[0];
		console.log('Today forecast:');
		return {
			temperature: formatTemperature(currentTemperature, userMetrics),
			condition: currentWeather[0]?.main ?? 'Unknown',
			minTemperature: formatTemperature(todayForecast.temp.min, userMetrics),
			maxTemperature: formatTemperature(todayForecast.temp.max, userMetrics),
			cloudCoverage: clouds,
		};
	}, [weatherData, userMetrics]);
};

/**
 * A custom hook that extracts and formats the weather icon information.
 *
 * @returns {{iconCode: string, timeOfDay: 'day' | 'night'} | undefined} An object containing:
 *   - iconCode: The first two characters of the weather icon code
 *   - timeOfDay: 'day' if the icon represents daytime, 'night' otherwise
 * Returns undefined if the weather data or icon is not available.
 */
export const useGetWeatherIconInfo = (): IWeatherIcon | undefined => {
	const { weatherData } = useWeatherData();

	return useMemo(() => {
		const weatherIcon = weatherData?.current.weather[0]?.icon;
		if (!weatherIcon) return undefined;

		const iconCode = weatherIcon.slice(0, 2);
		const timeOfDay = weatherIcon.charAt(2) === 'd' ? 'day' : 'night';

		return { iconCode, timeOfDay };
	}, [weatherData?.current?.weather[0]?.icon]);
};