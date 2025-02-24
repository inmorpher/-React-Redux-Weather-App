import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useCityName } from '../../hooks/useCityName';
import Header from './header/Header';

const AsyncWeatherDetails = lazy(() => import('../../components/WeatherDetails/WeatherDetails'));

const WeatherPage = () => {
	const { formattedCityName } = useCityName();
	return (
		<>
			<Helmet>
				<title>{`Weather for ${formattedCityName}`}</title>
				<meta
					name='description'
					content={`Check the current weather conditions and forecast for ${formattedCityName}.`}
				/>
			</Helmet>
			<Header />
			<div className='container relative mt-3 grid grid-cols-7 gap-3'>
				<Sidebar />
				<main className='col-span-7 md:col-span-5'>
					<Suspense fallback={<div>Loading...</div>}>
						<AsyncWeatherDetails />
					</Suspense>
				</main>
			</div>
		</>
	);
};

export default WeatherPage;
