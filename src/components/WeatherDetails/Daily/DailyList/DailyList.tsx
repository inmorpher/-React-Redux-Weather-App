import { memo } from 'react';
import { IDailyType } from '../../../../store/slices/weatherApiSlice';
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
const DailyList = memo(({ dailyValues }: IDailyListProps): JSX.Element => {
	return (
		<ul className='m-auto flex h-full flex-col justify-between overflow-hidden rounded-b-lg'>
			{dailyValues.map((daily, index) => (
				<DailyListItem
					index={index}
					daily={daily}
					key={'dailyListItem' + daily.weekDay + index}
				/>
			))}
		</ul>
	);
});

export default DailyList;
