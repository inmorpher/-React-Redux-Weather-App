import { Suspense, lazy } from 'react';
import Card from '../../UI/Card';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import Aqi from '../Aqi/Aqi';
import Daily from '../Daily/Daily';
import Feeling from '../Feeling/Feeling';
import Humidity from '../Humidity/Humidity';
import Moon from '../Moon/Moon';
import Pressure from '../Pressure/Pressure';
import Sun from '../Sun/Sun';
import UV from '../UV/UV';
import Visibility from '../Visibility/Visibility';
import Wind from '../Wind/Wind';
const AsyncHourly = lazy(() => import('../Hourly/Hourly'));
const AsyncPrecipitation = lazy(() => import('../Precipitation/Precipitation'));

const WeatherCards = () => {
	// const renderCardContent = (Component: ReactNode) => (isLoading ? Component : <Skeleton />);

	const cardData = [
		{
			title: 'Hourly',
			className: 'col-span-2 row-span-2 h-[100%] p-0',
			component: <Suspense fallback={<Skeleton />}>{<AsyncHourly />}</Suspense>,
			key: 'hourly',
		},
		{ title: 'Wind', className: '', component: <Wind />, key: 'wind' },
		{ title: 'Humidity', component: <Humidity />, key: 'humidity' },
		{ title: 'Sun position', component: <Sun />, key: 'sun' },
		{
			title: 'Precipitation',
			className: 'relative col-span-2 p-0',
			component: <Suspense>{<AsyncPrecipitation />}</Suspense>,
			key: 'precipitation',
		},
		{ title: 'UV', component: <UV />, key: 'uv' },
		{
			title: 'Daily',
			className: 'col-span-2 row-span-2 p-0',
			component: <Daily />,
			key: 'daily',
		},
		{ title: 'Moon', component: <Moon />, key: 'moon' },
		{ title: 'Pressure', component: <Pressure />, key: 'pressure' },
		{ title: 'Feeling', component: <Feeling />, key: 'feeling' },
		{ title: 'Visibility', component: <Visibility />, key: 'visibility' },
		{ title: 'Air quality', component: <Aqi />, key: 'aqi' },
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

export default WeatherCards;
