import { IDataStatus } from '../global.types';
import { useAppSelector } from '../store/hooks.type';
import { selectWeatherIconId } from '../store/slices/weatherApiSlice';
import { useGetURLParams } from './useGetURLParams';

/**
 * Custom hook to retrieve weather icon information based on URL parameters.
 *
 * This hook uses the `useGetURLParams` hook to get the current URL parameters,
 * and then uses the `useAppSelector` hook to select the weather icon data from the Redux store
 * based on the URL parameters.
 *
 * @returns {Object} An object containing the weather icon code and the time of day.
 * @returns {string} return.iconCode - The code representing the weather icon.
 * @returns {string} return.timeOfDay - The time of day associated with the weather icon.
 */
export const useWeatherIcon = (): {
	status: IDataStatus;
	iconCode?: string;
	timeOfDay?: string;
} => {
	const url = useGetURLParams();
	const { data: icon, isLoading, isSuccess, isError } = useAppSelector(selectWeatherIconId(url));

	const status = { isLoading, isSuccess, isError };

	return {
		status,
		iconCode: icon.iconCode,
		timeOfDay: icon.timeOfDay,
	};
};
