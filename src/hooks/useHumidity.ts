import { useAppSelector } from '../store/hooks.type';
import { selectHumidity } from '../store/slices/weatherApiSlice';
import { useGetURLParams } from './useGetURLParams';

/**
 * Custom hook to fetch humidity data based on the current URL parameters.
 * It utilizes the `useGetURLParams` hook to extract parameters from the URL,
 * then uses those parameters to select humidity data from the Redux store using
 * the `selectHumidity` selector. The hook manages and exposes the loading state,
 * success state, error state, dew point, and humidity level.
 *
 * @returns An object containing the loading state (`isLoading`), success state (`isSuccess`),
 * error state (`isError`), dew point (`dew_point`), and humidity level (`humidity`).
 */
export const useHumidity = () => {
	const url = useGetURLParams();
	const { data: humidity, isLoading, isSuccess, isError } = useAppSelector(selectHumidity(url));

	const state = { isLoading, isSuccess, isError };

	return {
		state,
		dew_point: humidity.dew_point, // Dew point value extracted from the humidity data.
		humidity: humidity.humidity, // Humidity level extracted from the humidity data.
	};
};
