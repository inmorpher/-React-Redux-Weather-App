import { useCityName } from '../../hooks/useCityName';
import Button from '../UI/Button';
import withLoading from '../UI/WithLoading';

/**
 * CityName component displays the name of a city and its current time.
 * It also includes a button to add the city to a list.
 *
 * @returns {JSX.Element} A React component that renders the city name, time, and an add button.
 */
const CityName = () => {
	const { formattedCityName, localTime, handleAddCity } = useCityName();

	return (
		<div className='flex w-1/2 items-center'>
			<Button
				size='medium'
				variant='add'
				onClick={handleAddCity}
				aria-label='Add city to your list'
			/>
			<div className='flex max-w-full flex-col overflow-hidden whitespace-nowrap'>
				<p className='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium leading-3 sm:text-xl'>
					{formattedCityName}
				</p>
				<p className='text-[0.6rem] font-light underline'>{localTime}</p>
			</div>
		</div>
	);
};

export default withLoading(CityName);
