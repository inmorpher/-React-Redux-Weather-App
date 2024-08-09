import { createBrowserRouter } from 'react-router-dom';
import { WeatherProvider } from '../context/WeatherData.context';
import WeatherPage from '../pages/Weather/WeatherPage';
import HomePage from '../pages/home';

export const ROUTES = {
	HOME: '/',
	WEATHER: 'weather',
	WEATHER_BY_LOCATION: 'weather/location',
};

/**
 * Creates and configures the application's router using react-router-dom.
 *
 * @returns {ReturnType<typeof createBrowserRouter>} A configured router object that defines the application's routes and their corresponding components.
 *
 * The router includes the following routes:
 * - Home route ('/'):
 *   - Renders the Search component
 * - Weather route ('/weather/:city?/:state?/:country?/'):
 *   - Renders the WeatherPage component wrapped in UserProvider and WeatherProvider
 *   - Supports optional parameters for city, state, and country
 *   - Includes an error element for handling routing errors
 */
export const router = createBrowserRouter([
	{
		index: true,
		path: ROUTES.HOME,
		element: (
			<WeatherProvider>
				<HomePage />
			</WeatherProvider>
		),
	},
	{
		path: `/${ROUTES.WEATHER}/:city?/:state?/:country?/`,
		element: (
			<WeatherProvider>
				<WeatherPage />
			</WeatherProvider>
		),
		errorElement: <div>Error</div>,
	},
]);
