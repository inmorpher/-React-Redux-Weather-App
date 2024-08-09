import axios from 'axios';
import { IWeatherData } from './weather.type';
import { fetchWeather } from './weatherApi'; // Assuming this function is defined in weatherApi.ts

const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');

const getServerUrl = () => {
	if (process.env.VITE_SERVER_URL) {
		return process.env.VITE_SERVER_URL;
	}
	return 'https://yevdev.me/weather/api'; // Fallback URL
};

const url = getServerUrl(); // Replace with your actual API URL

describe('fetchWeather', () => {
	it('should fetch weather data correctly when a valid location name is provided as a string', async () => {
		const mockWeatherData: IWeatherData = {
			city: 'London',
			country: 'UK',
			countryCode: 'GB',
			lat: 51.5074,
			lon: -0.1278,
			timezone: 'Europe/London',
			timezone_offset: 0,
			current: {
				dt: 1632374400,
				sunrise: 1632356457,
				sunset: 1632397663,
				temp: 287.06,
				feels_like: 286.73,
				pressure: 1018,
				humidity: 75,
				dew_point: 285.24,
				uvi: 0,
				clouds: 75,
				wind_speed: 1.5,
				wind_deg: 220,
				wind_gust: 2.3,
				air_pollution: 1,
				visibility: 10000,
				weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
			},
			minutely: [],
			hourly: [],
			daily: [],
			isPrecipitation: false,
		};

		const cityName = 'London';
		mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

		const result = await fetchWeather(cityName);

		expect(mockedAxios.get).toHaveBeenCalledWith(`${url}/search/byName`, {
			params: { q: cityName },
		});
		expect(result).toEqual(mockWeatherData);
	});

	it('should fetch weather data correctly when valid latitude and longitude values are provided as an object', async () => {
		const mockWeatherData: IWeatherData = {
			city: 'New York',
			country: 'United States',
			countryCode: 'US',
			lat: 40.7128,
			lon: -74.0059,
			timezone: 'America/New_York',
			timezone_offset: -14400,
			current: {
				dt: 1632374400,
				sunrise: 1632356457,
				sunset: 1632397663,
				temp: 290.06,
				feels_like: 289.73,
				pressure: 1015,
				humidity: 65,
				dew_point: 285.24,
				uvi: 2,
				clouds: 30,
				wind_speed: 2.5,
				wind_deg: 180,
				wind_gust: 3.3,
				air_pollution: 2,
				visibility: 16093,
				weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
			},
			minutely: [],
			hourly: [],
			daily: [],
			isPrecipitation: false,
		};

		const coords = { lat: 40.7128, lon: -74.0059 };
		mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

		const result = await fetchWeather(coords);

		expect(mockedAxios.get).toHaveBeenCalledWith(`${url}/search/byGeo`, {
			params: coords,
		});
		expect(result).toEqual(mockWeatherData);
	});

	it('should throw an error when the provided longitude is not a number', async () => {
		const invalidCoords = { lat: 40.7128, lon: 'invalid' };
		await expect(fetchWeather(invalidCoords)).rejects.toThrow();
	});

	it('should handle the case when the API returns an error response', async () => {
		const mockError = new Error('API request failed');
		mockedAxios.get.mockRejectedValueOnce(mockError);

		const cityName = 'Tokyo';
		await expect(fetchWeather(cityName)).rejects.toThrow(mockError);
	});

	it('should handle the case when the network request fails (e.g., timeout, network error)', async () => {
		const mockError = new Error('Network Error');
		mockedAxios.get.mockRejectedValueOnce(mockError);

		const coords = { lat: 40.7128, lon: -74.0059 };
		await expect(fetchWeather(coords)).rejects.toThrow(mockError);
	});

	it('should throw an error when the provided location name does not match any known location', async () => {
		const mockError = new Error('Invalid location name');
		mockedAxios.get.mockRejectedValueOnce(mockError);

		const invalidCityName = 'NonExistentCity';
		await expect(fetchWeather(invalidCityName)).rejects.toThrow(mockError);
	});
});
