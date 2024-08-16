import { IDailyType } from '../../../../api/weather.type';
import DailyListItem from './DailyListItem';

export interface IDailyListProps {
	/**
	 * An array of daily weather data.
	 */
	dailyValues: IDailyType[];
}

/**
 * A component that renders a list of daily weather items.
 *
 * @param {IDailyListProps} props - The properties for the DailyList component.
 * @param {IDailyType[]} props.dailyValues - An array of daily weather data to be displayed.
 * @returns {JSX.Element} The rendered list of daily weather items.
 */
const DailyList = ({ dailyValues }: IDailyListProps): JSX.Element => {
	return (
		<ul className='m-auto flex h-full flex-col justify-between overflow-hidden rounded-b-lg'>
			{Array.isArray(dailyValues) && dailyValues.length > 0
				? dailyValues.map(
						(daily, index) =>
							daily !== null && (
								<DailyListItem
									index={index}
									daily={daily}
									key={'dailyListItem' + daily.weekDay + index}
								/>
							)
					)
				: 'List is unavailable. Please try again later.'}
		</ul>
	);
};

export default DailyList;
