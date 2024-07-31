import { useCityList } from '../context/CityList.context';
import { useUser } from '../context/User.context';
import { useGetCityName } from '../context/WeatherData.context';

export const useCityName = () => {
	const cityInfo = useGetCityName();
	const { dispatch: contextDispatch } = useUser();
	const { addCity } = useCityList();

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

		contextDispatch({
			type: 'ADD_CITY',
			payload: cityData,
		});
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
