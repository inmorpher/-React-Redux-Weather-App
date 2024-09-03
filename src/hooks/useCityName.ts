import { useCityList } from '../context/CityList.context';
import { useGetCityName } from '../context/WeatherData.context';

/**
 * A custom hook that provides city name information and functionality to add a city.
 *
 * This hook uses the CityList and WeatherData contexts to retrieve and manipulate city data.
 * It formats the city name, provides the local time, and includes a function to add the city to the list.
 *
 * @returns An object containing:
 *  - formattedCityName: A string representation of the city name, including state (if available) and country.
 *  - localTime: A string representing the local time of the city.
 *  - handleAddCity: A function to add the current city to the city list.
 */
export const useCityName = () => {
	const cityInfo = useGetCityName();

	const { addCity } = useCityList();

	/**
	 * Handles the action of adding a city to the list.
	 *
	 * @param event - The mouse event from clicking the add button.
	 */
	const handleAddCity = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		if (!cityInfo) return;

		const cityData = {
			city: cityInfo.cityName,
			state: cityInfo.stateName,
			country: cityInfo.countryName,
			lat: cityInfo.latitude,
			lon: cityInfo.longitude,
		};

		addCity(cityData);
	};

	const formattedCityName = cityInfo
		? `${cityInfo.cityName}${cityInfo.stateName ? ', ' + cityInfo.stateName : ''}, ${cityInfo.countryName}`
		: '';

	return {
		formattedCityName,
		localTime: cityInfo?.localTime || '',
		handleAddCity,
	};
};
