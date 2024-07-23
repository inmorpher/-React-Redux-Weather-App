import axios from 'axios';
import { IGetWeatherArgs } from '../store/slices/weatherApiSlice';
import { IWeatherData } from '../store/weather.type';

const url = `${import.meta.env.VITE_SERVER_URL}`;

export const fetchCityData = async (city: string) => {
	const response = await fetch(`${url}/city?q=${city}`);
	return await response.json();
};
export const fetchWeather = async (args: IGetWeatherArgs): Promise<IWeatherData> => {
	console.log(url, 'Server URL');
	const response = await axios.get(`${url}/search/ByName`, {
		params:
			args instanceof Object
				? args
				: {
						q: args,
					},
	});
	return response.data;
};
