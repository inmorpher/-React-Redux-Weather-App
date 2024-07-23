import { useDispatch } from 'react-redux';
import { useUser } from '../context/User.context';
import { useGetCityName } from '../context/WeatherData.context';
import { addCity } from '../store/slices/userSlice';

export const useCityName = () => {
	const cityInfo = useGetCityName();
	const reduxDispatch = useDispatch();
	const { dispatch: contextDispatch } = useUser();

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

		reduxDispatch(addCity(cityData));
		contextDispatch({
			type: 'ADD_CITY',
			payload: cityData,
		});
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
