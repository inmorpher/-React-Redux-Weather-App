// Imports the CityName component from the Sidebar component collection.
import CityName from '../../../components/Sidebar/CityName';
// Imports the MainWeather component from the Sidebar component collection.
import MainWeather from '../../../components/Sidebar/MainWeather';

/**
 * HeaderWeatherContent is a functional component that renders the city name and main weather information
 * in the header section of the application. It utilizes the CityName and MainWeather components to display
 * this information.
 *
 * @returns A React fragment that contains the CityName and MainWeather components.
 */
const HeaderWeatherContent = () => {
	return (
		<>
			<CityName />
			<MainWeather />
		</>
	);
};

// Exports the HeaderWeatherContent component for use in other parts of the application.
export default HeaderWeatherContent;
