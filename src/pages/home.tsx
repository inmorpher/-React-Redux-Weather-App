import { Helmet } from 'react-helmet-async';
import UserCityList from '../components/Sidebar/UserCityList/UserCityList';
import Search from '../components/WeatherDetails/Search/Search';
import { useCityList } from '../context/CityList.context';

const HomePage = () => {
	const { list } = useCityList();
	return (
		<>
			<Helmet>
				<title>Weather App</title>
				<meta
					name='description'
					content='A weather app built with React, Tailwind CSS, and the OpenWeatherMap API.'
				/>
				<meta property='og:title' content='Weather App' />
				<meta
					property='og:description'
					content='A weather app built with React, Tailwind CSS, and the OpenWeatherMap API.'
				/>
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://yevweatherapp.netlify.app/' />
				<meta property='og:site_name' content='Weather App' />
			</Helmet>
			<div className='container h-[100vh] grid place-content-center md:w-[50vw] w-[90vw]'>
				<Search home={true} />
				{list.length > 0 && <UserCityList />}
			</div>
		</>
	);
};

export default HomePage;
