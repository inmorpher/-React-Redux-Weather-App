import { Suspense, lazy } from 'react';
import Card from '../UI/Card';
import Skeleton from '../UI/SkeletonLoader/Skeleton';
import AqiWithLoading from './Aqi/Aqi';
import { DailyWithLoading } from './Daily/Daily';
import FeelingWithLoading from './Feeling/Feeling';
import HumidityWithLoading from './Humidity/Humidity';
import MoonWithLoading from './Moon/Moon';
import PressureWithLoading from './Pressure/Pressure';
import SunWithLoading from './Sun/Sun';
import UV from './UV/UV';
import VisibilityWithLoading from './Visibility/Visibility';
import WindWithLoading from './Wind/Wind';
const AsyncHourly = lazy(() =>
	import('./Hourly/Hourly').then((module) => ({ default: module.default }))
);
const AsyncPrecipitation = lazy(() => import('./Precipitation/Precipitation'));

const WeatherDetails = () => {
	const cardData = [
		{
			title: 'Hourly',
			className: 'col-span-2 row-span-2 h-[100%] p-0',
			component: <Suspense fallback={<Skeleton />}>{<AsyncHourly />}</Suspense>,
			key: 'hourly',
		},
		{ title: 'Wind', className: '', component: <WindWithLoading />, key: 'wind' },
		{ title: 'Humidity', component: <HumidityWithLoading />, key: 'humidity' },
		{ title: 'Sun position', component: <SunWithLoading />, key: 'sun' },
		{
			title: 'Precipitation',
			className: 'relative col-span-2 p-0',
			component: <Suspense fallback={<Skeleton />}>{<AsyncPrecipitation />}</Suspense>,
			key: 'precipitation',
		},
		{ title: 'UV', component: <UV />, key: 'uv' },
		{
			title: 'Daily',
			className: 'col-span-2 row-span-2 p-0',
			component: <DailyWithLoading />,
			key: 'daily',
		},
		{ title: 'Moon', component: <MoonWithLoading />, key: 'moon' },
		{ title: 'Pressure', component: <PressureWithLoading />, key: 'pressure' },
		{ title: 'Feeling', component: <FeelingWithLoading />, key: 'feeling' },
		{ title: 'Visibility', component: <VisibilityWithLoading />, key: 'visibility' },
		{ title: 'Air quality', component: <AqiWithLoading />, key: 'aqi' },
	];

	return (
		<section className='grid-weather-cards col-span-1' key={'section'}>
			{cardData.map(({ title, className, component, key }) => (
				<Card title={title} className={className} key={key}>
					{component}
				</Card>
			))}
		</section>
	);
};

export default WeatherDetails;
