import { lazy } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from './header/Header';

const AsyncWeatherDetails = lazy(() => import('../../components/WeatherDetails/WeatherDetails'));

const WeatherPage = () => {
	console.log('hegg');

	return (
		<>
			<Header />
			<div className='container relative mt-3 grid grid-cols-7 gap-3'>
				<Sidebar />
				<main className='col-span-7 md:col-span-5'>
					<AsyncWeatherDetails />
				</main>
			</div>
		</>
	);
};

export default WeatherPage;
