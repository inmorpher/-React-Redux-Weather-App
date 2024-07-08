import { useDispatch } from 'react-redux';
import { addCity } from '../store/slices/userSlice';
import { selectCityName } from '../store/slices/weatherApiSlice';
import { useFetchState } from './useFetchState';

/**
 * Custom hook to manage and provide city name information.
 * It utilizes the URL parameters to fetch city name details and provides
 * a method to add the city to the user's list.
 *
 * @returns An object containing the city name string, loading state, error state,
 * success state, current time, and a handler function to add the city.
 */
export const useCityName = () => {
	// Retrieve URL parameters
	const { status, data } = useFetchState(selectCityName); // Select city name data from Redux store
	const dispatch = useDispatch(); // Dispatch function from Redux

	/**
	 * Handler for adding a city to the user's list.
	 * Dispatches an action to add the city with its details to the Redux store.
	 *
	 * @param event The mouse event triggered by clicking the add city button.
	 */
	const onAddCityHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault(); // Prevent default button click behavior
		if (data) {
			dispatch(
				addCity({
					city: data.city,
					state: data.state,
					country: data.country,
					lat: data.lat,
					lon: data.lon,
				}),
			);
		}
		return;
	};

	// Construct a string representation of the city name, including state and country if available
	const nameString =
		`${data?.city}${data?.state ? ', ' + data.state : ''}, ${data?.country}` || '';

	return {
		status,
		nameString,
		time: data?.time || '', // Current time data from the city information
		onAddCityHandler,
	};
};
