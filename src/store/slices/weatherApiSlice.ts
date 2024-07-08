import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MetricConverter, MetricReturnType } from '../../utils/services/converter/metric.converter';
import { getTempritureScale } from '../../utils/services/definitions/daily.temp.definition';
import { getDailyScaleCoords } from '../../utils/services/definitions/daily.temp.scale';
import { pressureDefinition } from '../../utils/services/definitions/pressure.definition';
import { sunDefinition } from '../../utils/services/definitions/sunDefinition';
import { getVisibilityValue } from '../../utils/services/definitions/visibility.definition';
import { getWindDirection } from '../../utils/services/definitions/wind.direction';
import { TimeService } from '../../utils/services/time/time.service';
import { RootState } from '../store';
import { IWeatherData } from '../weather.type';

const url = `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}`;

export type IGetWeatherArgs = string | { lat: number | string; lon: number | string };

export const weatherApiSlice = createApi({
	reducerPath: 'weatherApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${url}`,
	}),
	endpoints: (builder) => ({
		getWeather: builder.query<IWeatherData, IGetWeatherArgs>({
			query: (args: IGetWeatherArgs) => ({
				url: `search/byName?q=${args}`,
				method: 'GET',
			}),
		}),
	}),
});

export const selectCurrentWeather = (queryArg: IGetWeatherArgs) =>
	weatherApiSlice.endpoints.getWeather.select(queryArg);

export const selectLoadingStatus = (queryArg: IGetWeatherArgs) =>
	createSelector(selectCurrentWeather(queryArg), (loadingState) => loadingState.isSuccess);
/**
 * Creates a selector to extract specific city-related information from the weather data.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string (city name) or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing city, country, state, latitude, longitude, and time.
 */
export const selectCityName = (queryArg: IGetWeatherArgs) =>
	createSelector(selectCurrentWeather(queryArg), (weatherData) => {
		const { city, countryCode, country, state, lat, lon, current, timezone } =
			weatherData.data || {};

		const timeService = new TimeService(current?.dt || 0, timezone);
		const time = timeService.getTime('hoursAndMinutes').result() || '';

		return {
			...weatherData,
			data: {
				city,
				country: countryCode || country,
				state: state || '',
				lat,
				lon,
				time,
			},
		};
	});

/**
 * Creates a selector to extract the main weather information for a specific query argument.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string (city name) or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing temperature, weather condition, and maximum temperature.
 */
export const selectMainWeather = (queryArg: IGetWeatherArgs) =>
	createSelector(
		selectCurrentWeather(queryArg),
		(state: RootState) => state.user.data.userMetrics,
		(weatherData, userMetrics) => {
			const { current, daily } = weatherData.data || {};

			const { temp, weather, clouds } = current || {};
			const [todayWeather] = daily || [];
			const tempShort = 'short';

			const tempCurrent = MetricConverter.getTemp(temp || 0, userMetrics, tempShort);
			const tempMax = MetricConverter.getTemp(todayWeather.temp.max, userMetrics, tempShort);
			const tempMin = MetricConverter.getTemp(todayWeather.temp.min, userMetrics, tempShort);

			return {
				...weatherData,
				data: {
					temp: tempCurrent,
					condition: weather ? weather[0]?.main : '',
					max: tempMax,
					min: tempMin,
					clouds,
				},
			};
		},
	);

/**
 * Creates a selector to extract the weather icon ID and time of day for a specific query argument.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string (city name) or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing the weather icon code and time of day.
 */
export const selectWeatherIconId = (queryArg: IGetWeatherArgs) =>
	createSelector(selectCurrentWeather(queryArg), (weatherData) => ({
		...weatherData,
		error: weatherData.error,
		data: {
			iconCode: weatherData.data?.current.weather[0].icon.slice(0, 2) || '',
			timeOfDay:
				weatherData.data?.current.weather[0].icon.charAt(2) === 'd' ? 'day' : 'night',
		},
	}));

/**
 * Creates a selector for extracting wind-related information from the weather data.
 * This selector combines the current weather data with user preferences for units of measurement
 * to return wind speed, direction, and gusts in a user-friendly format.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing wind degree, speed, gust, and a literal description of the wind direction. If the weather data is not available, it returns undefined.
 */
export const selectWind = (queryArg: IGetWeatherArgs) =>
	createSelector(
		selectCurrentWeather(queryArg),
		(state: RootState) => state.user.data.userMetrics,
		(weatherData, userMetrics) => {
			const { wind_deg, wind_speed, wind_gust } = weatherData?.data?.current || {};
			const speed = MetricConverter.getSpeed(wind_speed || 0, userMetrics, true);
			const gust = wind_gust ? MetricConverter.getSpeed(wind_gust, userMetrics, true) : null;
			const literal = getWindDirection(wind_deg || 0);

			return {
				...weatherData,
				data: {
					deg: wind_deg || 0,
					speed,
					gust,
					literal,
				},
			};
		},
	);
/**
 * Creates a selector for extracting humidity-related information from the weather data.
 * This selector focuses on the dew point temperature, converting it to the user's preferred
 * units of measurement. It's part of the weather data selectors that enhance the application's
 * ability to provide localized and user-specific weather information.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing the dew point temperature in the user's preferred units. If the weather data is not available, it returns undefined.
 */
export const selectHumidity = (queryArg: IGetWeatherArgs) =>
	createSelector(
		selectCurrentWeather(queryArg),
		(state: RootState) => state.user.data.userMetrics,
		(weatherData, userMetrics) => ({
			...weatherData,
			data: {
				dew_point: MetricConverter.getTemp(
					weatherData.data?.current?.dew_point || 0,
					userMetrics,
					'short',
				),
				humidity: weatherData.data?.current?.humidity || 0,
			},
		}),
	);

/**
 * Creates a selector for extracting sun position information from the weather data.
 * This selector focuses on calculating the sunrise and sunset times in the local timezone
 * of the queried location and determining the current sun position (e.g., before sunrise, after sunset).
 * It enhances the application's ability to provide detailed and localized sun-related information.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing the sunrise and sunset times in 'hoursAndMinutes' format, along with additional sun position information. If the weather data is not available, it returns undefined.
 */
export const selectSunPosition = (queryArg: IGetWeatherArgs) =>
	createSelector(selectCurrentWeather(queryArg), (weatherData) => {
		const { current, timezone } = weatherData.data || {};

		const { sunrise, sunset, dt } = current || {};
		const { cycleDuration, timeSinceCycleStart, isDay } = sunDefinition(
			sunrise || 0,
			sunset || 0,
			dt || 0,
		);

		return {
			...weatherData,
			data: {
				sunset: new TimeService(sunset, timezone).getTime('hoursAndMinutes').result(),
				sunrise: new TimeService(sunrise, timezone).getTime('hoursAndMinutes').result(),
				cycleDuration,
				timeSinceCycleStart,
				isDay,
			},
		};
	});

/**
 * Creates a selector for extracting precipitation information from the weather data.
 * This selector focuses on the minutely precipitation data, providing insight into the
 * immediate precipitation forecast for the queried location. It also includes the timezone
 * of the location, which can be useful for displaying the data in a localized format.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. This can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing the precipitation data and timezone. If the weather data is not available, it returns undefined.
 */
export const selectPrecipitation = (queryArg: IGetWeatherArgs) =>
	createSelector(selectCurrentWeather(queryArg), (weatherData) => ({
		...weatherData,
		data: {
			minutely: weatherData.data?.minutely,
			timezone: weatherData.data?.timezone,
			isPrecipitation: weatherData.data?.isPrecipitation,
		},
	}));

/**
 * Creates a selector for extracting the UV index (UVI) information from the weather data.
 * This selector focuses on providing a static UV index value of 5 for the queried location.
 * It enhances the application's ability to provide UV-related information, which can be useful
 * for users to take necessary precautions against UV exposure.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing the UV index (UVI). If the weather data is not available, it returns undefined.
 */
export const selectUVI = (queryArg: IGetWeatherArgs) =>
	createSelector(selectCurrentWeather(queryArg), (weatherData) => ({
		...weatherData,
		data: {
			uvi: weatherData.data?.current?.uvi || 0,
		},
	}));

/**
 * Creates a selector for extracting the Air Quality Index (AQI) information from the weather data.
 * This selector focuses on providing the AQI value for the queried location.
 * It enhances the application's ability to provide air quality-related information, which can be useful
 * for users to take necessary precautions against air pollution.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing the AQI value. If the weather data is not available, it returns an AQI value of 0.
 */
export const selectAQI = (queryArg: IGetWeatherArgs) =>
	createSelector(selectCurrentWeather(queryArg), (weatherData) => ({
		...weatherData,
		data: {
			aqi: weatherData.data?.current?.air_pollution,
		},
	}));

/**
 * Creates a selector for extracting moon position and phase information from the weather data.
 * This selector calculates the moonrise and moonset times in the local timezone of the queried location,
 * and provides a description of the moon phase (e.g., new moon, full moon, etc.).
 * It enhances the application's ability to provide detailed and localized moon-related information.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing the moonrise and moonset times in 'hoursAndMinutes' format, the calculated moon phase, and a descriptive string of the current moon phase. If the weather data is not available, it returns default values.
 */

export const selectMoonPosition = (queryArg: IGetWeatherArgs) =>
	createSelector(selectCurrentWeather(queryArg), (weatherData) => {
		// Definitions for moon phase descriptions based on phase value
		const moonPhaseDescriptions = {
			0: 'new moon',
			0.25: 'first quarter moon',
			0.5: 'full moon',
			0.75: 'last quarter moon',
		};
		const defaultDescription = 'moon phase'; // Default description if phase doesn't match predefined values
		// Destructuring to extract moonrise, moonset, and moon_phase from the daily weather data
		const { moonrise, moonset, moon_phase } = weatherData.data?.daily[0] || {
			moon_phase: 0,
			moonrise: 0,
			moonset: 0,
		};
		const timezone = weatherData.data?.timezone; // Extracting timezone for local time conversion

		// Calculating the description based on the moon phase value
		let description = Object.entries(moonPhaseDescriptions).reduce((acc, [key, desc]) => {
			const phaseKey = parseFloat(key);
			if (moon_phase === phaseKey) return desc;
			return acc;
		}, '');

		// Assigning a more specific description if the moon phase doesn't match predefined values
		if (!description) {
			description =
				moon_phase < 0.25 || (moon_phase > 0.75 && moon_phase < 1)
					? 'waxing crescent moon'
					: moon_phase < 0.5
						? 'waxing gibbous moon'
						: moon_phase < 0.75
							? 'waning gibbous moon'
							: 'waning crescent moon';
		}

		// Returning the moonrise, moonset times, moon phase, and description as part of the selector's output
		return {
			...weatherData,
			data: {
				moonrise: new TimeService(moonrise, timezone).getTime('hoursAndMinutes').result(),
				moonset: new TimeService(moonset, timezone).getTime('hoursAndMinutes').result(),
				moon_phase: 75 - moon_phase * 50, // Calculating a numeric representation of the moon phase
				description: description || defaultDescription, // Ensuring a description is always provided
			},
		};
	});

/**
 * Creates a selector for extracting atmospheric pressure information from the weather data.
 * This selector utilizes the `pressureDefinition` function to interpret the pressure value
 * and provide a more descriptive or formatted output suitable for display in the application.
 * It enhances the application's ability to present atmospheric pressure data in a user-friendly manner.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing the atmospheric pressure information. If the weather data is not available, it returns the default pressure definition.
 */
export const selectPressure = (queryArg: IGetWeatherArgs) =>
	createSelector(selectCurrentWeather(queryArg), (weatherData) => ({
		...weatherData,
		data: pressureDefinition(weatherData.data?.current.pressure || 0),
	}));

/**
 * Creates a selector for extracting the perceived temperature information from the weather data.
 * This selector compares the actual temperature with the 'feels like' temperature to provide
 * a descriptive condition of how the temperature feels. It utilizes user preferences for units
 * of measurement to return the temperature in a user-friendly format.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing the actual temperature and a descriptive condition of how the temperature feels ('feels colder', 'feels warmer', or 'feels same'). If the weather data is not available, it returns default values.
 */
export const selectFeeling = (queryArg: IGetWeatherArgs) =>
	createSelector(
		selectCurrentWeather(queryArg),
		(state: RootState) => state.user.data.userMetrics,
		(weatherData, userMetrics) => {
			const { temp, feels_like } = weatherData.data?.current || { temp: 0, feels_like: 0 };
			return {
				...weatherData,
				data: {
					temp: MetricConverter.getTemp(temp, userMetrics, 'short'),
					condition:
						temp > feels_like
							? 'feels colder'
							: temp < feels_like
								? 'feels warmer' // Corrected typo from 'wormer' to 'warmer'
								: temp === feels_like && 'feels same',
				},
			};
		},
	);

/**
 * Creates a selector for extracting visibility information from the weather data.
 * This selector utilizes the `getVisibilityValue` function to interpret the visibility
 * distance and provide a more descriptive or formatted output suitable for display in the application.
 * It enhances the application's ability to present visibility data in a user-friendly manner.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing the visibility information. If the weather data is not available, it returns the default visibility definition.
 */
export const selectVisibility = (queryArg: IGetWeatherArgs) =>
	createSelector(selectCurrentWeather(queryArg), (weatherData) => ({
		...weatherData,
		data: getVisibilityValue(weatherData.data?.current.visibility || 0),
	}));

/**
 * Creates a selector for extracting hourly weather information from the weather data.
 * This selector combines the current weather data with user preferences for units of measurement
 * to return hourly weather data in a user-friendly format.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing hourly weather data, timezone, and user metrics. If the weather data is not available, it returns undefined.
 */
export const selectHourly = (queryArg: IGetWeatherArgs) =>
	createSelector(
		selectCurrentWeather(queryArg),
		(state: RootState) => state.user.data.userMetrics,
		(weatherData, userMetrics) => ({
			...weatherData,
			data: {
				hourly: weatherData.data?.hourly,
				timezone: weatherData.data?.timezone,
				userMetrics,
			},
		}),
	);

/**
 * Creates a selector for extracting and processing daily weather information from the overall weather data.
 * This selector combines the current weather data with user preferences for units of measurement
 * to return daily weather data, including minimum and maximum temperatures, weekdays, weather icons,
 * temperature coordinates for charting purposes, and color scales based on the temperature range.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object containing processed daily weather data, including an array of daily values with minimum and maximum temperatures, weekdays, weather icons, temperature coordinates, and a color scale based on the temperature range. If the weather data is not available, it returns undefined.
 */
export interface IDailyTempCoords {
	x1: number;
	x2: number;
}
export interface IDailyType {
	dayMinTemp: MetricReturnType;
	dayMaxTemp: MetricReturnType;
	weekDay: string;
	dayWeatherIcon: string;
	dailyTempCoords: {
		x1: number;
		x2: number;
	}[];
}

export const selectDailyMain = (queryArg: IGetWeatherArgs) =>
	createSelector(
		selectCurrentWeather(queryArg),
		(state: RootState) => state.user.data.userMetrics,
		(weatherData, userMetrics) => {
			// If there is no weather data, return undefined
			if (!weatherData.data)
				return {
					...weatherData,
					data: undefined,
				};

			// Define the maximum length of the temperature line for scaling coordinates
			const MIN_MAX_TEMP_LINE_LENGTH = 135;

			// Destructure the daily weather data and timezone from the overall weather data
			const { daily, timezone } = weatherData.data;

			// Find the minimum and maximum daily temperatures from the daily weather data
			const minDailyTemp = daily.reduce(
				(min, obj) => (obj.temp.min < min ? obj.temp.min : min),
				daily[0].temp.min,
			);
			const maxDailyTemp = daily.reduce(
				(max, obj) => (obj.temp.max > max ? obj.temp.max : max),
				daily[0].temp.max,
			);

			// Convert the minimum and maximum daily temperatures to the user's preferred units
			const minTempConverted = MetricConverter.getTemp(minDailyTemp, userMetrics, 'short');
			const maxTempConverted = MetricConverter.getTemp(maxDailyTemp, userMetrics, 'short');

			// Initialize an array to store the temperature coordinates for charting
			const dailyTempCoords: IDailyTempCoords[] = [];

			// Map over the daily weather data to process and format the required information
			const dailyValues: IDailyType[] = daily.map((day) => {
				// Convert the minimum and maximum temperatures of the day to the user's preferred units
				const dayMinTemp = MetricConverter.getTemp(day.temp.min, userMetrics, 'short');
				const dayMaxTemp = MetricConverter.getTemp(day.temp.max, userMetrics, 'short');

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
						dayMinTemp.value,
					),
					x2: getDailyScaleCoords(
						MIN_MAX_TEMP_LINE_LENGTH,
						minTempConverted.value,
						maxTempConverted.value,
						dayMaxTemp.value,
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

			// Get the color scale based on the minimum and maximum daily temperatures
			const colors = getTempritureScale(minDailyTemp, maxDailyTemp);

			// Return the processed daily weather data
			return {
				...weatherData,
				data: {
					daily: daily,
					dailyValues,
					colors,
				},
			};
		},
	);

// export const selectDailyDetails = (queryArg: IGetWeatherArgs) =>
// 	createSelector(
// 		selectCurrentWeather(queryArg),
// 		(state: RootState) => state.user.data.userMetrics,
// 		(weatherData, userMetrics) => {

// 			return;
// 		},
// 	);

/**
 * Creates a selector for extracting and formatting daily calendar information from the weather data.
 * This selector processes the daily weather data to return an array of objects, each containing
 * the day of the month and the full date in a formatted string. The full date includes the weekday,
 * day of the month, month, and year, formatted for easy reading. This can be useful for applications
 * that need to display a calendar view of daily weather forecasts.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object. If weather data is available, it returns an object containing an array of daily calendar information. Each element in the array includes `days` (the day of the month in '2-digit' format) and `fullDate` (a formatted string of the full date). If the weather data is not available, it returns an object with the data property set to undefined.
 */
export const selectDailyCalendar = (queryArg: IGetWeatherArgs) =>
	createSelector(selectCurrentWeather(queryArg), (weatherData) => {
		if (!weatherData.data)
			return {
				...weatherData,
				data: undefined,
			};

		return {
			...weatherData,
			data: weatherData.data.daily.map((day) => {
				const timeService = new TimeService(day.dt, weatherData.data?.timezone);
				const days = timeService.getDay('2-digit').result();
				const fullDate = timeService
					.getWeekday('short')
					.addDivider('space')
					.getDay('2-digit')
					.addDivider('coma')
					.getMonth('short')
					.addDivider('space')
					.getYear('numeric')
					.result();
				return {
					days,
					fullDate,
				};
			}),
		};
	});

/**
 * Creates a selector for extracting and formatting daily weather condition information from the weather data.
 * This selector processes the daily weather data to return an object containing an array of objects, each representing
 * a day's weather conditions including the maximum and minimum temperatures, weather icon, and general weather condition.
 * The temperatures are converted to the user's preferred units of measurement.
 *
 * @param {IGetWeatherArgs} queryArg - The argument to query the weather data. It can be a string representing a city name or an object containing latitude and longitude.
 * @returns {Function} A selector function that takes the Redux state and returns an object. If weather data is available, it returns an object containing an array with each element representing a day's weather conditions including `max` and `min` temperatures, `icon`, and `condition`. Temperatures are presented in the user's preferred units. If the weather data is not available, it returns an object with the data property set to undefined.
 */
export const selectDailyCondition = (queryArg: IGetWeatherArgs, selected: number) =>
	createSelector(
		selectCurrentWeather(queryArg),
		(state: RootState) => state.user.data.userMetrics,
		(weatherData, userMetrics) => {
			if (!weatherData.data) {
				return {
					...weatherData,
					data: undefined,
				};
			}
			const selectedDay = weatherData.data.daily[selected];

			return {
				...weatherData,
				data: {
					max: MetricConverter.getTemp(selectedDay.temp.max, userMetrics, 'full'),
					min: MetricConverter.getTemp(selectedDay.temp.min, userMetrics, 'full'),
					icon: selectedDay.weather[0].icon,
					condition: selectedDay.weather[0].main,
				},
			};
		},
	);

export const selectDailyPopupScale = (queryArg: IGetWeatherArgs, index: number) =>
	createSelector(
		selectCurrentWeather(queryArg),
		(state: RootState) => state.user.data.userMetrics,
		(weatherData, userMetrics) => {
			console.log(index);
			return;
		},
	);

const selectAPi = (state: RootState) => state.weatherApi;
const selectTestQuery = (state: RootState) => selectAPi(state).queries['getWeather'];

export const testSelect = createSelector(selectTestQuery, (selectedQuery) => selectedQuery?.data);

export const { useGetWeatherQuery } = weatherApiSlice;
