import { createBrowserRouter } from 'react-router-dom';
import Search from '../components/WeatherDetails/Search/Search';
import WeatherPage from '../pages/Weather/WeatherPage';
import { ROUTES } from './routes.const';

export const router = createBrowserRouter([
	{
		index: true,
		path: ROUTES.HOME,
		element: <Search />,
	},
	{
		path: `/${ROUTES.WEATHER}/:city?/:state?/:country?`,
		element: <WeatherPage />,
		errorElement: <div>Error</div>,
	},
]);
