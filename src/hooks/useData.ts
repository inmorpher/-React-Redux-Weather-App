import { useGetWeatherQuery } from '../store/slices/weatherApiSlice';
import { useGetURLParams } from './useGetURLParams';

/**
 * Custom hook that fetches weather data based on URL parameters.
 *
 * This hook combines the functionality of `useGetURLParams` to extract
 * parameters from the URL and `useGetWeatherQuery` to fetch weather data
 * based on those parameters.
 *
 * @returns {ReturnType<typeof useGetWeatherQuery>} The result of the weather query,
 * which includes data, error, and loading state.
 */
export const useData = () => {
	const url = useGetURLParams();
	return useGetWeatherQuery(url);
};
