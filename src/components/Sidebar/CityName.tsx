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
	const { formattedCityName = '', localTime = '', handleAddCity = undefined } = useCityName() || {};

	return (
		<div className='flex w-1/2 items-center'>
			{handleAddCity && (
				<Button
					size='medium'
					variant='add'
					onClick={handleAddCity ?? undefined}
					aria-label='Add city to your list'
				/>
			)}

			<div className='flex max-w-full flex-col overflow-hidden whitespace-nowrap'>
				<p
					className='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium leading-3 sm:text-xl'
					aria-label='city name'
				>
					{formattedCityName || 'N/A'}
				</p>
				<p className='text-[0.6rem] font-light underline' aria-label='local time'>
					{localTime || 'N/A'}
				</p>
			</div>
		</div>
	);
};

const CityNameWithLoading = withLoading(CityName);

export { CityName, CityNameWithLoading as CityNameWithLoadingComponent };

export default CityNameWithLoading;
