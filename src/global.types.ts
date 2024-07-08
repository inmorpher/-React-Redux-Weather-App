/**
 * Interface representing the status of a data-fetching operation.
 *
 * @interface IDataStatus
 * @property {boolean} isLoading - Indicates if the data is currently being loaded.
 * @property {boolean} isSuccess - Indicates if the data was successfully fetched.
 * @property {boolean} isError - Indicates if there was an error during the data fetching process.
 * @property {boolean} [error] - Optional property that can store the error state or message.
 */
export interface IDataStatus {
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	error?: boolean;
}
