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

export interface IWeatherIcon {
	iconCode: string;
	timeOfDay: 'day' | 'night';
}

export interface IWindInfo {
	degree: number;
	speed: MetricReturnType;
	gust: MetricReturnType | null;
	direction: string;
}
