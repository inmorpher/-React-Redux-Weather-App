import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { IWeatherData } from '../weather.type';
import { weatherApiSlice } from './weatherApiSlice';

const weatherDataSlice = createSlice({
	name: 'weatherData',
	initialState: {
		data: {} as IWeatherData,
	},
	reducers: {
		setWeatherData: (state, action: { payload: IWeatherData }) => {
			console.log('Setting weather data:', action.payload);
			state.data = action.payload;
		},
	},
});

export const { setWeatherData } = weatherDataSlice.actions;

export const fetchWeatherQuery =
	(queryArg: string) => async (state: RootState, dispatch: AppDispatch) => {
		try {
			const result = await dispatch(
				weatherApiSlice.endpoints.getWeather.initiate(queryArg)
			).unwrap();
		} catch (error) {
			console.error('Failed to fetch weather data:', error);
		}
	};

export default weatherDataSlice.reducer;
