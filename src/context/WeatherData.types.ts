import { MinutelyWeather } from '../store/weather.type';
import { MetricReturnType } from '../utils/services/converter/metric.converter';

/**
 * Represents information about a city.
 */
export interface ICityInfo {
	/** The name of the city */
	cityName: string;
	/** The name of the country where the city is located */
	countryName: string;
	/** The name of the state or region where the city is located */
	stateName: string;
	/** The latitude coordinate of the city */
	latitude: number;
	/** The longitude coordinate of the city (may be undefined) */
	longitude: number;
	/** The local time in the city */
	localTime: string;
}

/**
 * Represents the return type for the useGetCityInfo hook.
 * It can be either an ICityInfo object or undefined.
 */
export type UseGetCityInfoReturn = ICityInfo | undefined;

/**
 * Represents the main weather information for a location.
 */
export interface IMainWeather {
	/** The current temperature */
	temperature: MetricReturnType;
	/** The current weather condition description */
	condition: string;
	/** The minimum temperature for the day */
	minTemperature: MetricReturnType;
	/** The maximum temperature for the day */
	maxTemperature: MetricReturnType;
	/** The percentage of cloud coverage */
	cloudCoverage: number;
}

/**
 * Represents the return type for the useGetMainWeather hook.
 * It can be either an IMainWeather object or undefined.
 */
export type UseGetMainWeatherReturn = IMainWeather | undefined;

/**
 * Represents an icon for displaying weather conditions.
 */
export interface IWeatherIcon {
	/** The code representing the specific weather icon */
	iconCode: string;
	/** Indicates whether the icon represents day or night conditions */
	timeOfDay: 'day' | 'night';
}

/**
 * Represents information about wind conditions.
 */
export interface IWindInfo {
	/** The wind direction in degrees */
	degree: number;
	/** The wind speed */
	speed: MetricReturnType;
	/** The wind gust speed, if available */
	gust: MetricReturnType | null;
	/** The cardinal direction of the wind (e.g., "N", "SE", etc.) */
	direction: string;
}

/**
 * Represents humidity-related weather information.
 */
export interface IHumidityInfo {
	/** The relative humidity percentage */
	humidity: number;
	/** The dew point temperature */
	dewPoint: MetricReturnType;
}

/**
 * Represents information about the sun's position and day/night cycle.
 */
export interface ISunPosition {
	/** The time of sunset in the local timezone */
	sunset: string;
	/** The time of sunrise in the local timezone */
	sunrise: string;
	/** The duration of the complete day/night cycle in minutes */
	cycleDuration: number;
	/** The time elapsed since the start of the current cycle in minutes */
	timeSinceCycleStart: number;
	/** Indicates whether it is currently daytime (true) or nighttime (false) */
	isDay: boolean;
}

/**
 * Represents information about precipitation forecasts and conditions.
 */
export interface IPrecipitationInfo {
	/** An array of minute-by-minute weather forecasts */
	minutelyForecast: MinutelyWeather[];
	/** The timezone of the location for which the forecast is provided */
	locationTimezone: string;
	/** Indicates whether precipitation is currently occurring or expected */
	hasPrecipitation: boolean;
}

/**
 * Represents information about the moon's position and phases for a specific location.
 */
export interface IMoonPosition {
	/**
	 * The current phase of the moon, represented as a number between 0 and 1.
	 * 0 represents a new moon, 0.25 a first quarter moon, 0.5 a full moon, and 0.75 a last quarter moon.
	 */
	moonPhase: number;
	/** The formatted time of moonrise as a string, typically in the local time of the specified timezone */
	formattedMoonRise: string;
	/** The formatted time of moonset as a string, typically in the local time of the specified timezone */
	formattedMoonSet: string;
}
