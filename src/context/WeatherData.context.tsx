import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeather } from '../api/weatherApi';
import { IDailyTempCoords, IDailyType } from '../store/slices/weatherApiSlice';
import { IWeatherData } from '../store/weather.type';
import {
	MetricConverter,
	MetricReturnType,
	MetricValue,
} from '../utils/services/converter/metric.converter';
import { getTempritureScale } from '../utils/services/definitions/daily.temp.definition';
import { getDailyScaleCoords } from '../utils/services/definitions/daily.temp.scale';
import {
	IPressureDefinition,
	pressureDefinition,
} from '../utils/services/definitions/pressure.definition';
import { sunDefinition } from '../utils/services/definitions/sunDefinition';
import {
	getVisibilityValue,
	IVisibilityReturn,
} from '../utils/services/definitions/visibility.definition';
import { getWindDirection } from '../utils/services/definitions/wind.direction';
import { TimeService } from '../utils/services/time/time.service';
import { useUserMetrics } from './User.context';
import {
	IDailyCalendar,
	IDailyForecast,
	IDailyForecastForDay,
	IFeelsLikeInfo,
	IHourlyForecast,
	IHumidityInfo,
	IMoonPosition,
	IPrecipitationInfo,
	ISunPosition,
	IWeatherIcon,
	IWindInfo,
	UseGetCityInfoReturn,
	UseGetMainWeatherReturn,
} from './WeatherData.types';

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
	}, [
		weatherData?.city,
		weatherData?.countryCode,
		weatherData?.country,
		weatherData?.state,
		weatherData?.lat,
	]);
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

/**
 * A custom hook that retrieves and formats wind information from the weather data.
 *
 * This hook uses the weather data context and user metrics to extract and format
 * relevant wind information, including wind speed, direction, and gust speed.
 *
 * @returns {IWindInfo | undefined} An object containing formatted wind information:
 *   - degree: The wind direction in degrees
 *   - speed: The wind speed, formatted according to user preferences
 *   - gust: The gust speed, formatted according to user preferences (or null if not available)
 *   - direction: The wind direction as a literal string (e.g., "N", "NE", "E", etc.)
 *
 * If wind data is not available in the weather data, the hook returns undefined.
 */
export const useGetWindInfo = (): IWindInfo | undefined => {
	const { weatherData } = useWeatherData();
	const userPreferredMetrics = useUserMetrics();

	return useMemo(() => {
		if (
			weatherData?.current?.wind_deg === undefined ||
			weatherData?.current?.wind_speed === undefined
		)
			return undefined;
		const {
			wind_deg: windDirection,
			wind_gust: windGust,
			wind_speed: windSpeed,
		} = weatherData.current;

		const formattedWindSpeed = MetricConverter.getSpeed(windSpeed, userPreferredMetrics, true);
		const formattedGustSpeed = windGust
			? MetricConverter.getSpeed(windGust, userPreferredMetrics, true)
			: null;
		const windDirectionLiteral = getWindDirection(windDirection);

		return {
			degree: windDirection,
			speed: formattedWindSpeed,
			gust: formattedGustSpeed,
			direction: windDirectionLiteral,
		};
	}, [
		weatherData?.current?.wind_deg,
		weatherData?.current?.wind_gust,
		weatherData?.current?.wind_speed,
		userPreferredMetrics,
	]);
};

/**
 * A custom hook that retrieves and formats humidity information from the weather data.
 *
 * This hook uses the weather data context and user metrics to extract and format
 * relevant humidity information, including the humidity percentage and dew point.
 *
 * @returns {IHumidityInfo | undefined} An object containing formatted humidity information:
 *   - humidity: The current humidity percentage
 *   - dewPoint: The dew point temperature, formatted according to user preferences
 *
 * If humidity data is not available in the weather data, the hook returns undefined.
 */
export const useGetHumidityInfo = (): IHumidityInfo | undefined => {
	const { weatherData } = useWeatherData();
	const userPreferredMetrics = useUserMetrics();

	return useMemo(() => {
		if (!weatherData?.current?.humidity) return undefined;

		const { humidity, dew_point } = weatherData.current;

		return {
			humidity,
			dewPoint: MetricConverter.getTemp(dew_point || 0, userPreferredMetrics, 'short'),
		};
	}, [weatherData?.current?.humidity, weatherData?.current?.dew_point]);
};

/**
 * A custom hook that calculates and returns information about the sun's position and day/night cycle.
 *
 * This hook uses the weather data to extract sunrise and sunset times, and calculates
 * various properties related to the sun's position and the day/night cycle.
 *
 * @returns {Object | undefined} An object containing sun position information:
 *   - sunset: {string} Formatted time of sunset (HH:MM)
 *   - sunrise: {string} Formatted time of sunrise (HH:MM)
 *   - cycleDuration: {number} Duration of the day/night cycle in seconds
 *   - timeSinceCycleStart: {number} Time elapsed since the start of the current cycle in seconds
 *   - isDay: {boolean} Whether it's currently daytime (true) or nighttime (false)
 *
 * Returns undefined if sunrise or sunset data is not available in the weather data.
 */
export const useGetSunPosition = (): ISunPosition | undefined => {
	const { weatherData } = useWeatherData();

	return useMemo(() => {
		if (!weatherData?.current?.sunrise || !weatherData?.current?.sunset) return undefined;
		const { timezone, current } = weatherData;
		const { sunrise, sunset, dt } = current;
		const { cycleDuration, timeSinceCycleStart, isDay } = sunDefinition(sunrise, sunset, dt);

		const formatTime = (timestamp: number) =>
			new TimeService(timestamp, timezone).getTime('hoursAndMinutes').result();

		return {
			sunset: formatTime(sunset),
			sunrise: formatTime(sunrise),
			cycleDuration,
			timeSinceCycleStart,
			isDay,
		};
	}, [weatherData?.current?.sunrise, weatherData?.current?.sunset, weatherData?.timezone]);
};

/**
 * Custom hook to retrieve precipitation information from weather data.
 * @returns {Object | undefined} Precipitation info or undefined if data is not available.
 */
export const useGetPrecipitationInfo = (): IPrecipitationInfo | undefined => {
	const { weatherData } = useWeatherData();

	return useMemo(() => {
		if (!weatherData?.daily) return undefined;

		const { minutely, timezone, isPrecipitation } = weatherData;

		return {
			minutelyForecast: minutely,
			locationTimezone: timezone,
			hasPrecipitation: isPrecipitation,
		};
	}, [
		weatherData?.daily,
		weatherData?.minutely,
		weatherData?.timezone,
		weatherData?.isPrecipitation,
	]);
};

/**
 * Custom hook to retrieve the current UV index from weather data.
 *
 * This hook uses the weather data context to extract the UV index information.
 * It memoizes the result to optimize performance.
 *
 * @returns {number | undefined} The current UV index value, or undefined if not available.
 */
export const useGetUvi = (): number | undefined => {
	const { weatherData } = useWeatherData();

	return useMemo(() => {
		if (weatherData?.current && 'uvi' in weatherData.current) {
			return weatherData.current.uvi;
		}
		return undefined;
	}, [weatherData?.current?.uvi]);
};

/**
 * Custom hook to retrieve the current Air Quality Index (AQI) from weather data.
 *
 * This hook uses the weather data context to extract the air pollution information.
 * It memoizes the result to optimize performance.
 *
 * @returns {Object | undefined} The current air pollution data, or undefined if not available.
 */
export const useGetAqi = (): number | undefined => {
	const { weatherData } = useWeatherData();

	return useMemo(() => {
		if (!weatherData?.current?.air_pollution) return undefined;

		return weatherData.current.air_pollution;
	}, [weatherData?.current?.air_pollution]);
};

/**
 * A custom hook that retrieves and formats moon position information from the weather data.
 *
 * This hook uses the weather data context to extract relevant moon information,
 * including moon phase, moonrise, and moonset times. It also formats the moonrise
 * and moonset times according to the location's timezone.
 *
 * @returns {IMoonPosition | undefined} An object containing moon position information:
 *   - moonPhase: The current phase of the moon
 *   - formattedMoonRise: The formatted time of moonrise (HH:MM)
 *   - formattedMoonSet: The formatted time of moonset (HH:MM)
 *
 * Returns undefined if moon data is not available in the weather data.
 */
export const useGetMoonPosition = (): IMoonPosition | undefined => {
	const { weatherData } = useWeatherData();

	return useMemo(() => {
		if (
			weatherData?.daily[0].moon_phase === undefined ||
			weatherData?.daily[0].moonrise === undefined ||
			weatherData?.daily[0].moonset === undefined
		)
			return undefined;

		return {
			moonPhase: weatherData.daily[0].moon_phase,
			formattedMoonRise: new TimeService(weatherData.daily[0].moonrise, weatherData.timezone)
				.getTime('hoursAndMinutes')
				.result(),
			formattedMoonSet: new TimeService(weatherData.daily[0].moonset, weatherData.timezone)
				.getTime('hoursAndMinutes')
				.result(),
		};
	}, [
		weatherData?.daily[0].moon_phase,
		weatherData?.daily[0].moonrise,
		weatherData?.daily[0].moonset,
		weatherData?.timezone,
	]);
};

/**
 * A custom hook that retrieves and formats pressure information from the weather data.
 *
 * This hook uses the weather data context to extract the current pressure value
 * and then applies the pressureDefinition function to interpret the pressure reading.
 *
 * @returns {IPressureDefinition | undefined} An object containing formatted pressure information:
 *  - pressure: The atmospheric pressure value.
 *  - angle: The calculated angle for the gauge's needle, based on the pressure value.
 *  - coords: An array of coordinate pairs representing the lines of the gauge.
 *  Returns undefined if pressure data is not available in the weather data.
 */
export const useGetPressureInfo = (): IPressureDefinition | undefined => {
	const { weatherData } = useWeatherData();

	return useMemo(() => {
		if (!weatherData?.current?.pressure) return undefined;
		return pressureDefinition(weatherData.current.pressure);
	}, [weatherData?.current?.pressure]);
};

/**
 * A custom hook that retrieves and formats "feels like" temperature information from the weather data.
 *
 * This hook uses the weather data context and user metrics to extract and format
 * the "feels like" temperature and compare it to the actual temperature.
 *
 * @returns {IFeelsLikeInfo | undefined} An object containing formatted "feels like" information:
 *   - temperature: The "feels like" temperature, formatted according to user preferences
 *   - feelsLike: A string describing how the "feels like" temperature compares to the actual temperature
 *     (e.g., "feels colder", "feels warmer", or "feels about the same")
 *
 * Returns undefined if "feels like" data is not available in the weather data.
 */
export const useGetFeelsLikeInfo = (): IFeelsLikeInfo | undefined => {
	const { weatherData } = useWeatherData();
	const userPreferredMetrics = useUserMetrics();

	return useMemo(() => {
		if (!weatherData?.current?.feels_like) return undefined;

		const { feels_like, temp } = weatherData.current;
		return {
			temperature: MetricConverter.getTemp(feels_like, userPreferredMetrics, 'short'),
			feelsLike:
				temp > feels_like
					? 'feels colder'
					: temp < feels_like
						? 'feels warmer'
						: 'feels about the same',
		};
	}, [weatherData?.current?.feels_like, weatherData?.current?.temp, userPreferredMetrics]);
};

/**
 * A custom hook that retrieves and formats visibility information from the weather data.
 *
 * This hook uses the weather data context to extract the current visibility value
 * and then applies the getVisibilityValue function to interpret and format the visibility.
 *
 * @returns {IVisibilityReturn | undefined} An object containing formatted visibility information,
 * or undefined if visibility data is not available in the weather data.
 * The IVisibilityReturn object typically includes:
 *   - visibility: The visibility distance value.
 *   - unit: The unit of measurement for visibility (e.g., 'km', 'mi').
 *   - description: A textual description of the visibility conditions.
 */
export const useGetVisibilityInfo = (): IVisibilityReturn | undefined => {
	const { weatherData } = useWeatherData();

	return useMemo(() => {
		if (!weatherData?.current?.visibility) return undefined;
		return getVisibilityValue(weatherData.current.visibility);
	}, [weatherData?.current?.visibility]);
};

/**
 * A custom hook that retrieves hourly forecast information from the weather data.
 *
 * This hook uses the weather data context and user metrics to extract and format
 * relevant hourly forecast information, including the forecast data, timezone,
 * and user's preferred metrics.
 *
 * @returns {IHourlyForecast | undefined} An object containing hourly forecast information:
 *   - hourlyForecast: An array of hourly weather forecast data
 *   - timezone: The timezone of the location for which the forecast is provided
 *   - userPreferredMetrics: The user's preferred metric system for temperature and other measurements
 *
 * Returns undefined if hourly forecast data is not available in the weather data.
 */
export const useGetHourlyForecast = (): IHourlyForecast | undefined => {
	const { weatherData } = useWeatherData();
	const userPreferredMetrics = useUserMetrics();

	return useMemo(() => {
		if (!weatherData?.hourly) return undefined;
		return {
			hourlyForecast: weatherData.hourly,
			timezone: weatherData.timezone,
			userPreferredMetrics,
		};
	}, [weatherData?.hourly]);
};

/**
 * A custom hook that retrieves and processes daily forecast information from weather data.
 *
 * This hook calculates and formats daily temperature data, including minimum and maximum
 * temperatures, weekday information, weather icons, and temperature coordinates for charting.
 * It also generates a color scale based on the temperature range.
 *
 * @returns {IDailyForecast | undefined} An object containing processed daily forecast information:
 *   - daily: Raw daily forecast data from the weather API
 *   - dailyValues: Processed daily weather data including min/max temperatures, weekday, weather icon, and temperature coordinates
 *   - colors: Color scale generated based on the temperature range
 *
 * Returns undefined if daily forecast data is not available in the weather data.
 */
export const useGetDailyForecast = (): IDailyForecast | undefined => {
	const { weatherData } = useWeatherData();
	const userPreferredMetrics = useUserMetrics();

	return useMemo(() => {
		if (!weatherData?.daily) return undefined;

		const MIN_MAX_TEMP_LINE_LENGTH = 135;

		const { daily, timezone } = weatherData;

		const minDailyTemp = daily.reduce(
			(min, obj) => (obj.temp.min < min ? obj.temp.min : min),
			daily[0].temp.min
		);
		const maxDailyTemp = daily.reduce(
			(max, obj) => (obj.temp.max > max ? obj.temp.max : max),
			daily[0].temp.max
		);

		const minTempConverted = MetricConverter.getTemp(minDailyTemp, userPreferredMetrics, 'short');
		const maxTempConverted = MetricConverter.getTemp(maxDailyTemp, userPreferredMetrics, 'short');

		const dailyTempCoords: IDailyTempCoords[] = [];

		const dailyValues: IDailyType[] = daily.map((day) => {
			// Convert the minimum and maximum temperatures of the day to the user's preferred units
			const dayMinTemp = MetricConverter.getTemp(day.temp.min, userPreferredMetrics, 'short');
			const dayMaxTemp = MetricConverter.getTemp(day.temp.max, userPreferredMetrics, 'short');

			// Get the weekday abbreviation for the current day
			const weekDay = new TimeService(day.dt, timezone).getWeekday('short').result();

			// Get the weather icon code for the current day
			const dayWeatherIcon = day.weather[0].icon;

			// Calculate and store the temperature coordinates for charting
			dailyTempCoords.push({
				x1: getDailyScaleCoords(
					MIN_MAX_TEMP_LINE_LENGTH,
					minTempConverted.value,
					maxTempConverted.value,
					dayMinTemp.value
				),
				x2: getDailyScaleCoords(
					MIN_MAX_TEMP_LINE_LENGTH,
					minTempConverted.value,
					maxTempConverted.value,
					dayMaxTemp.value
				),
			});

			// Return an object containing the processed daily weather data
			return {
				dayMinTemp,
				dayMaxTemp,
				weekDay,
				dayWeatherIcon,
				dailyTempCoords,
			};
		});

		const colors = getTempritureScale(minDailyTemp, maxDailyTemp);

		return {
			daily,
			dailyValues,
			colors,
		};
	}, [weatherData?.daily, userPreferredMetrics]);
};

/**
 * A custom hook that generates a daily calendar based on weather data.
 *
 * This hook processes the daily weather data to create a calendar-like structure,
 * including the day of the month and a full date string for each day in the forecast.
 *
 * @returns {IDailyCalendar[] | undefined} An array of IDailyCalendar objects, each containing:
 *   - dayOfMonth: A string representing the day of the month (01-31)
 *   - fullDateString: A formatted string of the full date (e.g., "Mon 01, Jan 2023")
 *   Returns undefined if daily weather data is not available.
 */
export const useGetDailyCalendar = (): IDailyCalendar[] | undefined => {
	const { weatherData } = useWeatherData();
	const userPreferredMetrics = useUserMetrics();

	return useMemo(() => {
		if (!weatherData?.daily) return undefined;

		const { daily, timezone } = weatherData;

		return daily.map((day) => {
			const timeService = new TimeService(day.dt, timezone);
			return {
				dayOfMonth: timeService.getDay('2-digit').result(),
				fullDateString: timeService
					.getWeekday('short')
					.addDivider('space')
					.getDay('2-digit')
					.addDivider('coma')
					.getMonth('short')
					.addDivider('space')
					.getYear('numeric')
					.result(),
			};
		});
	}, [
		weatherData?.daily?.[0]?.dt,
		weatherData?.daily?.[0]?.weather?.[0]?.icon,
		weatherData?.daily?.[0]?.temp?.day,
		weatherData?.daily?.[0]?.humidity,
		weatherData?.timezone,
		userPreferredMetrics,
	]);
};

/**
 * Custom hook to retrieve daily weather forecast for a specific day.
 *
 * This hook fetches and formats weather data for a given day index from the available daily forecast.
 * It uses the user's preferred metrics for temperature conversion.
 *
 * @param {number} dayIndex - The index of the day for which to retrieve the forecast (0 is today, 1 is tomorrow, etc.)
 * @returns {IDailyForecastForDay | undefined} An object containing the formatted daily forecast data, or undefined if data is not available
 *   The returned object includes:
 *   - tempMax: Maximum temperature for the day (formatted according to user metrics)
 *   - tempMin: Minimum temperature for the day (formatted according to user metrics)
 *   - weatherIcon: Icon code representing the weather condition
 *   - weatherCondition: Main weather condition description
 */
export const useGetDailyWeatherForDay = (dayIndex: number): IDailyForecastForDay | undefined => {
	const { weatherData } = useWeatherData();
	const userMetrics = useUserMetrics();

	return useMemo(() => {
		if (!weatherData?.daily) return undefined;
		const dayForecast = weatherData.daily[dayIndex];
		return {
			tempMax: MetricConverter.getTemp(dayForecast.temp.max, userMetrics, 'full'),
			tempMin: MetricConverter.getTemp(dayForecast.temp.min, userMetrics, 'full'),
			weatherIcon: dayForecast.weather[0].icon,
			weatherCondition: dayForecast.weather[0].main,
		};
	}, [
		dayIndex,
		weatherData?.daily?.[dayIndex]?.temp?.max,
		weatherData?.daily?.[dayIndex]?.temp?.min,
		weatherData?.daily?.[dayIndex]?.weather[0]?.main,
		userMetrics,
	]);
};
