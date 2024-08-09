import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useCityList } from '../../../context/CityList.context';
import { useGetCityName } from '../../../context/WeatherData.context';
import { useSidebarContext } from '../../../hooks/useSidebarContext';
import { ROUTES } from '../../../router/routes.const';
import { constructUrl } from '../../../utils/constructUrl';
import Button from '../../UI/Button';
import withMemo from '../../UI/WithMemo';

interface IUserCityListItemProps extends HTMLAttributes<HTMLLIElement> {
	city: string;
	country: string;
	state: string;
	lat: string | number;
	lon: string | number;
	showDelete: boolean;
}

const UserCityListItem = ({
	city,
	country,
	state,
	lat,
	lon,
	showDelete,
}: IUserCityListItemProps) => {
	const urlString = constructUrl(
		{ location: ROUTES.WEATHER, city, state, country },
		undefined,
		undefined,
		true
	);

	const { latitude: currentLat, longitude: currentLon } = useGetCityName() || {};
	const { deleteCity } = useCityList();
	const match =
		!!(lat && lon && currentLat && currentLon) &&
		lat === currentLat.toString() &&
		lon === currentLon.toString();

	const onDeleteCityHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		deleteCity({ city, country, state, lat, lon });
	};

	const { closeSideBarOnListItemClick } = useSidebarContext();

	return (
		<li
			className={twMerge(
				'bg-weather-bg-500 flex h-10 text-xl hover:bg-primary-color-900 sm:text-base hover:dark:bg-primary-color-dark-900 [&.active]:bg-primary-color-900 [&.active]:dark:bg-primary-color-dark-900',
				match && 'active'
			)}
			onClick={(event) => closeSideBarOnListItemClick(event)}
		>
			<Link to={urlString} className='flex flex-grow items-center justify-between gap-2 px-2'>
				<p className='w-[80%] overflow-hidden text-ellipsis whitespace-nowrap'>
					<span className=' capitalize'>{city}, </span>
					{state ? <span className='capitalize'>{state}, </span> : ''}
					<span className='uppercase'>{country}</span>
				</p>
			</Link>
			<Button
				size='medium'
				variant='trash'
				aria-label='delete city'
				className={twMerge('transition-all', showDelete ? 'opacity-full' : 'w-0 scale-0 opacity-0')}
				onClick={onDeleteCityHandler}
			/>
		</li>
	);
};

export default withMemo(UserCityListItem);
