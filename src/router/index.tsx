import { createBrowserRouter } from 'react-router-dom';
import Search from '../components/WeatherDetails/Search/Search';
import { UserProvider } from '../context/User.context';
import { WeatherProvider } from '../context/WeatherData.context';
import WeatherPage from '../pages/Weather/WeatherPage';

export const ROUTES = {
	HOME: '/',
	WEATHER: 'weather',
	WEATHER_BY_LOCATION: 'weather/location',
};

export const router = createBrowserRouter([
	{
		index: true,
		path: ROUTES.HOME,
		element: <Search />,
	},
	{
		path: `/${ROUTES.WEATHER}/:city?/:state?/:country?`,
		element: (
			<UserProvider>
				<WeatherProvider>
					<WeatherPage />
				</WeatherProvider>
			</UserProvider>
		),
		errorElement: <div>Error</div>,
	},
]);
