import { MinutelyWeather } from '../store/weather.type';
import { MetricReturnType } from '../utils/services/converter/metric.converter';

/**
 * Represents information about a city.
 * @property {string} cityName - The name of the city
 * @property {string} countryName - The name of the country where the city is located
 * @property {string} stateName - The name of the state or region where the city is located
 * @property {number} latitude - The latitude coordinate of the city
 * @property {number} longitude - The longitude coordinate of the city (may be undefined)
 * @property {string} localTime - The local time in the city
 */
export interface ICityInfo {
	cityName: string;
	countryName: string;
	stateName: string;
	latitude: number;
	longitude: number;
	localTime: string;
}

/**
 * Represents the return type for the useGetCityInfo hook.
 * It can be either an ICityInfo object or undefined.
 */
export type UseGetCityInfoReturn = ICityInfo | undefined;

/**
 * Represents the main weather information for a location.
 * @property {MetricReturnType} temperature - The current temperature
 * @property {string} condition - The current weather condition description
 * @property {MetricReturnType} minTemperature - The minimum temperature for the day
 * @property {MetricReturnType} maxTemperature - The maximum temperature for the day
 * @property {number} cloudCoverage - The percentage of cloud coverage
 */
export interface IMainWeather {
	temperature: MetricReturnType;
	condition: string;
	minTemperature: MetricReturnType;
	maxTemperature: MetricReturnType;
	cloudCoverage: number;
}

/**
 * Represents the return type for the useGetMainWeather hook.
 * It can be either an IMainWeather object or undefined.
 */
export type UseGetMainWeatherReturn = IMainWeather | undefined;

/**
 * Represents an icon for displaying weather conditions.
 * @property {string} iconCode - The code representing the specific weather icon
 * @property {'day' | 'night'} timeOfDay - Indicates whether the icon represents day or night conditions
 */
export interface IWeatherIcon {
	iconCode: string;
	timeOfDay: 'day' | 'night';
}

/**
 * Represents information about wind conditions.
 * @property {number} degree - The wind direction in degrees
 * @property {MetricReturnType} speed - The wind speed
 * @property {MetricReturnType | null} gust - The wind gust speed, if available
 * @property {string} direction - The cardinal direction of the wind (e.g., "N", "SE", etc.)
 */
export interface IWindInfo {
	degree: number;
	speed: MetricReturnType;
	gust: MetricReturnType | null;
	direction: string;
}

/**
 * Represents humidity-related weather information.
 * @property {number} humidity - The relative humidity percentage
 * @property {MetricReturnType} dewPoint - The dew point temperature
 */
export interface IHumidityInfo {
	humidity: number;
	dewPoint: MetricReturnType;
}

/**
 * Represents information about the sun's position and day/night cycle.
 * @property {string} sunset - The time of sunset in the local timezone
 * @property {string} sunrise - The time of sunrise in the local timezone
 * @property {number} cycleDuration - The duration of the complete day/night cycle in minutes
 * @property {number} timeSinceCycleStart - The time elapsed since the start of the current cycle in minutes
 * @property {boolean} isDay - Indicates whether it is currently daytime (true) or nighttime (false)
 */
export interface ISunPosition {
	sunset: string;
	sunrise: string;
	cycleDuration: number;
	timeSinceCycleStart: number;
	isDay: boolean;
}

/**
 * Represents information about precipitation forecasts and conditions.
 * @property {MinutelyWeather[]} minutelyForecast - An array of minute-by-minute weather forecasts
 * @property {string} locationTimezone - The timezone of the location for which the forecast is provided
 * @property {boolean} hasPrecipitation - Indicates whether precipitation is currently occurring or expected
 */
export interface IPrecipitationInfo {
	minutelyForecast: MinutelyWeather[];
	locationTimezone: string;
	hasPrecipitation: boolean;
}

/**
 * Represents information about the moon's position and phases for a specific location.
 * @property {number} moonPhase - The current moon phase, represented as a number between 0 and 1
 * @property {string} formattedMoonRise - The formatted time of moonrise in the local timezone
 * @property {string} formattedMoonSet - The formatted time of moonset in the local timezone
 */
export interface IMoonPosition {
	moonPhase: number;
	formattedMoonRise: string;
	formattedMoonSet: string;
}
