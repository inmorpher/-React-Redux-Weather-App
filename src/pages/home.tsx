import UserCityList from '../components/Sidebar/UserCityList/UserCityList';
import Search from '../components/WeatherDetails/Search/Search';
import { useCityList } from '../context/CityList.context';

const HomePage = () => {
	const { list } = useCityList();
	return (
		<div className='container h-[100vh] grid place-content-center md:w-[50vw] w-[90vw]'>
			<Search home={true} />
			{list.length > 0 && <UserCityList />}
		</div>
	);
};

export default HomePage;
