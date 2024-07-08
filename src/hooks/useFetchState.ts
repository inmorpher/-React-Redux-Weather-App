import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppSelector } from '../store/hooks.type';
import { IGetWeatherArgs } from '../store/slices/weatherApiSlice';
import { RootState } from '../store/store';

/**
 * Defines the structure of the fetch state, including both the state and the data.
 * @template T The type of the data being fetched.
 */
export interface FetchState<T> {
	status: {
		isLoading: boolean; // Indicates if the fetch operation is in progress.
		isSuccess: boolean; // Indicates if the fetch operation was successful.
		isError: boolean; // Indicates if there was an error during the fetch operation.
		error?: FetchBaseQueryError | SerializedError; // The error object if an error occurred.
	};
	data?: T; // The data resulting from the fetch operation, if successful.
}

/**
 * Type definition for a selector function that is used to select data from the Redux store.
 * @template T The type of the data being selected.
 * @param args The arguments required to select the data, in this case, weather arguments.
 * @returns A function that takes the Redux state and returns an object containing the data and its fetch status.
 */
export type SelectorFunction<T, K> = (
	args: IGetWeatherArgs,
	...additionalArgs: K[]
) => (state: RootState) => {
	data?: T; // The selected data.
	isLoading: boolean; // Indicates if the fetch operation is in progress.
	isError: boolean; // Indicates if there was an error during the fetch operation.
	isSuccess: boolean; // Indicates if the fetch operation was successful.
	error?: FetchBaseQueryError | SerializedError; // The error object if an error occurred.
};

/**
 * Custom hook to abstract the fetching state logic using a selector function.
 * @template T The type of the data being fetched.
 * @param selector A selector function that selects the desired data and its state from the Redux store.
 * @returns An object containing both the state of the fetch operation and the fetched data.
 */
export const useFetchState = <T, K>(
	selector: SelectorFunction<T, K>,
	...args: K[]
): FetchState<T> => {
	const url = useAppSelector((state: RootState) => state.userQuery.query); // Retrieves URL parameters, used as arguments for the selector.

	const { isLoading, isError, isSuccess, error, data } = useAppSelector(selector(url, ...args));
	return {
		status: {
			isLoading,
			isSuccess,
			isError,
			error,
		},
		data,
	};
};
