import { MetricReturnType } from '../utils/services/converter/metric.converter.ts';

/**
 * Represents comprehensive weather data for a specific location.
 * @interface IWeatherData
 * @property {string} city - The name of the city
 * @property {string} country - The name of the country
 * @property {string} countryCode - The country code (e.g., 'US' for United States)
 * @property {string} [state] - The state or region (optional)
 * @property {number} lat - The latitude coordinate of the location
 * @property {number} lon - The longitude coordinate of the location
 * @property {string} timezone - The timezone name (e.g., 'America/New_York')
 * @property {number} timezone_offset - The timezone offset in seconds from UTC
 * @property {CurrentWeather} current - The current weather conditions
 * @property {MinutelyWeather[]} minutely - Minute-by-minute weather forecast for the next hour
 * @property {HourlyWeather[]} hourly - Hourly weather forecast
 * @property {DailyWeather[]} daily - Daily weather forecast
 * @property {boolean} isPrecipitation - Indicates if precipitation is occurring or forecasted
 */
export interface IWeatherData {
	city: string;
	country: string;
	countryCode: string;
	state?: string;
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	current: CurrentWeather;
	minutely: MinutelyWeather[];
	hourly: HourlyWeather[];
	daily: DailyWeather[];
	isPrecipitation: boolean;
}

/**
 * Represents the current weather conditions.
 * @interface CurrentWeather
 * @property {number} dt - Current time, Unix, UTC
 * @property {number} sunrise - Sunrise time, Unix, UTC
 * @property {number} sunset - Sunset time, Unix, UTC
 * @property {number} temp - Current temperature
 * @property {number} feels_like - Temperature accounting for human perception
 * @property {number} pressure - Atmospheric pressure on the sea level, hPa
 * @property {number} humidity - Humidity, %
 * @property {number} [dew_point] - Dew point
 * @property {number} air_pollution - Air pollution level
 * @property {number} uvi - UV index
 * @property {number} clouds - Cloudiness, %
 * @property {number} visibility - Average visibility, meters
 * @property {number} wind_speed - Wind speed, meter/sec
 * @property {number} wind_deg - Wind direction, degrees (meteorological)
 * @property {number} [wind_gust] - Wind gust, meter/sec
 * @property {Weather[]} weather - Weather condition details
 * @property {number} [aqi] - Air Quality Index
 */
export interface CurrentWeather {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point?: number;
	air_pollution: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust?: number;
	weather: Weather[];
	aqi?: number;
}

/**
 * Represents minute-by-minute weather data.
 * @interface MinutelyWeather
 * @property {number} dt - Time of the forecasted data, Unix, UTC
 * @property {number} precipitation - Precipitation volume, mm
 */
export interface MinutelyWeather {
	dt: number;
	precipitation: number;
}

/**
 * Represents hourly weather forecast data.
 * @interface HourlyWeather
 * @property {number} dt - Time of the forecasted data, Unix, UTC
 * @property {number} temp - Temperature
 * @property {number} feels_like - Temperature accounting for human perception
 * @property {number} pressure - Atmospheric pressure on the sea level, hPa
 * @property {number} humidity - Humidity, %
 * @property {number} dew_point - Dew point
 * @property {number} uvi - UV index
 * @property {number} clouds - Cloudiness, %
 * @property {number} visibility - Average visibility, meters
 * @property {number} wind_speed - Wind speed, meter/sec
 * @property {number} wind_deg - Wind direction, degrees (meteorological)
 * @property {number} wind_gust - Wind gust, meter/sec
 * @property {Weather[]} weather - Weather condition details
 * @property {number} pop - Probability of precipitation
 */
export interface HourlyWeather {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: Weather[];

	pop: number;
}

/**
 * Represents daily weather forecast data.
 * @interface DailyWeather
 * @property {number} dt - Time of the forecasted data, Unix, UTC
 * @property {number} sunrise - Sunrise time, Unix, UTC
 * @property {number} sunset - Sunset time, Unix, UTC
 * @property {number} moonrise - Moonrise time, Unix, UTC
 * @property {number} moonset - Moonset time, Unix, UTC
 * @property {number} moon_phase - Moon phase
 * @property {string} summary - Summary of the day's weather
 * @property {Object} temp - Temperature details for different parts of the day
 * @property {Object} feels_like - "Feels like" temperature for different parts of the day
 * @property {number} pressure - Atmospheric pressure on the sea level, hPa
 * @property {number} humidity - Humidity, %
 * @property {number} dew_point - Dew point
 * @property {number} wind_speed - Wind speed, meter/sec
 * @property {number} wind_deg - Wind direction, degrees (meteorological)
 * @property {number} wind_gust - Wind gust, meter/sec
 * @property {Weather[]} weather - Weather condition details
 * @property {number} clouds - Cloudiness, %
 * @property {number} pop - Probability of precipitation
 * @property {number} [rain] - Rain volume, mm
 * @property {number} [snow] - Snow volume, mm
 * @property {number} uvi - UV index
 */
export interface DailyWeather {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	summary: string;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
		eve: number;
		morn: number;
	};
	feels_like: {
		day: number;
		night: number;
		eve: number;
		morn: number;
	};
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: Weather[];
	clouds: number;
	pop: number;
	rain?: number;
	snow?: number;
	uvi: number;
}

/**
 * Represents weather condition details.
 * @interface Weather
 * @property {number} id - Weather condition id
 * @property {string} main - Group of weather parameters (Rain, Snow, Extreme etc.)
 * @property {string} description - Weather condition within the group
 * @property {string} icon - Weather icon id
 */
export interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

/**
 * Represents temperature data for different parts of the day.
 * @typedef {Object} WeatherTemp
 * @property {number} day - Day temperature
 * @property {number} min - Minimum daily temperature
 * @property {number} max - Maximum daily temperature
 * @property {number} night - Night temperature
 * @property {number} eve - Evening temperature
 * @property {number} morn - Morning temperature
 */
export type WeatherTemp = {
	day: number;
	min: number;
	max: number;
	night: number;
	eve: number;
	morn: number;
};

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
