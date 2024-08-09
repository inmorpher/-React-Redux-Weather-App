import axios from 'axios';

import { ROUTES } from '../router/routes.const';
import { IWeatherData } from './weather.type';

export type IGetWeatherArgs = string | { lat: number | string; lon: number | string };

const url = ROUTES.URL;

/**
 * Fetches weather data from the server based on the provided arguments.
 *
 * @param args - The search criteria for weather data. Can be either:
 *               - A string representing the name of a location.
 *               - An object with 'lat' and 'lon' properties representing latitude and longitude.
 *
 * @returns A promise that resolves to the weather data (IWeatherData).
 *
 * @throws Will throw an error if the API request fails.
 */
export const fetchWeather = async (args: IGetWeatherArgs): Promise<IWeatherData> => {
	const isString = typeof args === 'string';
	const endpoint = `${url}/search/${isString ? 'byName' : 'byGeo'}`;
	const params = isString ? { q: args } : args;
	try {
		const response = await axios.get(endpoint, { params });
		return response.data;
	} catch (error) {
		console.error('Error fetching weather data:', error);
		throw error;
	}
};
