import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks.type';
import { setQuery } from '../store/slices/querySlice';
import { useGetWeatherQuery } from '../store/slices/weatherApiSlice';
import { RootState } from '../store/store';

/**
 * Custom hook for fetching weather data based on URL parameters or search parameters.
 * It navigates to the home page if no valid parameters are found.
 * It also handles the case when there is an error in fetching weather data.
 */
export const useFetchData = () => {
	// Retrieve URL parameters and search parameters.
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	// Combine URL parameters into a single string.
	const urlParams = Object.values(params).join(',');
	// Extract latitude and longitude from search parameters.
	const [lat, lon] = searchParams.get('location')?.split(',') || [];

	// Access the error state from the weather slice of the Redux store.
	// const error = useAppSelector((state) => state.weather.error);

	const error = useAppSelector((state: RootState) => state.weather.error);
	const query = urlParams || { lat: lat, lon: lon };

	useGetWeatherQuery(query);

	// Log any existing error to the console.

	// Effect hook to fetch weather data or navigate home based on parameters.
	useEffect(() => {
		// Navigate to home if no valid parameters are found.
		if ((!urlParams || !urlParams.trim()) && (!lat || !lat.trim()) && (!lon || !lon.trim())) {
			navigate('/');
			return;
		}
		// Log and return if there is an error.
		if (error) {
			console.log('that an error happened');
			return;
		}

		dispatch(setQuery(query));

		// Dispatch fetchWeather action with URL parameters or latitude and longitude.
	}, [dispatch, error, lat, lon, navigate, urlParams]);
};
