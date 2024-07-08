import { useFetchData } from '../../hooks/useFetchData';
import WeatherCards from './WeatherCards/WeatherCards';

const WeatherDetails = () => {
	useFetchData();

	return <WeatherCards />;
};

export default WeatherDetails;
