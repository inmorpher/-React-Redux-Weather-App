import { useCityList } from '../context/CityList.context';
import { useGetCityName } from '../context/WeatherData.context';

export const useCityName = () => {
	const cityInfo = useGetCityName();

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
