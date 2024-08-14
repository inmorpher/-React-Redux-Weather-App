import axios from 'axios';
import { describe, expect, Mocked, test, vi } from 'vitest';
import { IWeatherData } from './weather.type.ts';
import { fetchWeather } from './weatherApi.ts';

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;
const url = 'https://yevdev.me/weather/api';

describe('fetchWeather', () => {
	const mockWeatherData: IWeatherData = {
		city: 'Test City',
		country: 'Test Country',
		countryCode: 'TC',
		lat: 123,
		lon: 456,
		timezone: 'Test Timezone',
		timezone_offset: 7200,
		current: {
			temp: 293.75,
			feels_like: 293.75,
			humidity: 50,
			dew_point: 288.12,
			uvi: 0.0,
			visibility: 10000,
			pressure: 1013.25,
			wind_speed: 14.14,
			wind_deg: 120,
			weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: ',0d' }],
			air_pollution: 1,
			wind_gust: 19.14,
			clouds: 0,
			sunrise: 1645772800,
			sunset: 1645819200,
			dt: 1645766400,
		},
		minutely: [],
		hourly: [],
		daily: [],
		isPrecipitation: false,
	};

	test('should fetch weather data', async () => {
		mockedAxios.get.mockResolvedValue({ data: mockWeatherData });

		const response = await axios.get('/weather');
		expect(response.data).toEqual(mockWeatherData);
	});
	test('should fetch weather data by geographic coordinates', async () => {
		mockedAxios.get.mockResolvedValue({ data: mockWeatherData });

		const lat = 123;
		const lon = 456;
		const response = await fetchWeather({ lat, lon });

		expect(mockedAxios.get).toHaveBeenCalledWith(`${url}/search/byGeo`, { params: { lat, lon } });
		expect(response).toEqual(mockWeatherData);
	});
	test('should handle non-string and non-object inputs gracefully', async () => {
		const invalidInputs = [null, undefined, true, false, 123, [], {}];

		for (const input of invalidInputs) {
			mockedAxios.get.mockRejectedValue(new Error('Invalid input'));

			await expect(fetchWeather(input as any)).rejects.toThrow('Invalid input');
		}
	});
	test('should handle invalid latitude and longitude values', async () => {
		const invalidInputs = [
			{ lat: -91, lon: 0 },
			{ lat: 91, lon: 0 },
			{ lat: 0, lon: -181 },
			{ lat: 0, lon: 181 },
		];

		for (const input of invalidInputs) {
			mockedAxios.get.mockRejectedValue(new Error('Invalid latitude or longitude value'));

			await expect(fetchWeather(input)).rejects.toThrow('Invalid latitude or longitude value');
		}
	});
	test('should fetch weather data by name or coordinates', async () => {
		mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });
		mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

		const locationName = 'New York';
		const response1 = await fetchWeather(locationName);
		expect(mockedAxios.get).toHaveBeenCalledWith(`${url}/search/byName`, {
			params: { q: locationName },
		});
		expect(response1).toEqual(mockWeatherData);

		const coordinates = { lat: 40.7128, lon: -74.0059 };
		const response2 = await fetchWeather(coordinates);
		expect(mockedAxios.get).toHaveBeenCalledWith(`${url}/search/byGeo`, { params: coordinates });
		expect(response2).toEqual(mockWeatherData);
	});
});
