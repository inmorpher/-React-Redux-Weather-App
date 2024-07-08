import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IWeatherData } from '../store/weather.type';
import { debounce } from '../utils/debounce';

const SERVER = import.meta.env.VITE_SERVER_URL;
const PORT = import.meta.env.VITE_SERVER_PORT;
const baseURL = `${SERVER}:${PORT}`;
const axiosInstance: AxiosInstance = axios.create({
	baseURL: baseURL,
});

export interface IGeocodingResponse {
	lat: string;
	lon: string;
	city: string;
	country: string;
	countryCode: string;
	state: string;
	stateCode: string;
}

export const fetchWeather = createAsyncThunk(
	'/weather/fetchWeather',
	async (
		query: string | { latitude: number; longitude: number },
	): Promise<IWeatherData | null> => {
		console.log(typeof query, 'query');

		let url = '';
		if (typeof query === 'string') {
			url = `search/byName?q=${query}`;
			console.log(url);
		} else if (typeof query === 'object' && 'latitude' in query && 'longitude' in query) {
			url = `search/byGeo?lat=${query.latitude}&lon=${query.longitude}`;
		} else {
			throw new Error('Invalid params');
		}

		console.log('fetchWeather');

		try {
			const response: AxiosResponse<IWeatherData> = await axiosInstance.get(url);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new Error(`API request error: ${error.message}`);
			} else {
				throw new Error(`Unknown API request error: ${error}`);
			}
		}
	},
);

export const autocompleteSearch = async (query: string): Promise<IGeocodingResponse[] | []> => {
	if (!query || query.length < 3) return [];
	try {
		const response: AxiosResponse<IGeocodingResponse[]> = await axios.get(
			`${SERVER}:${PORT}/search/autocomplete?q=${query}`,
		);

		return response.data;
	} catch (error) {
		return [];
	}
};

export const debouncedAutocompleteSearch = debounce(autocompleteSearch, 300);
