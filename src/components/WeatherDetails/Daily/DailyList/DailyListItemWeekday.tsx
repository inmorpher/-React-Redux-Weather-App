export interface IDailyListItemWeekdayProps {
	/**
	 * The index of the day, starting from 0 (representing "Today").
	 */
	dayIndex: number;

	/**
	 * The name of the weekday (e.g., "Monday", "Tuesday", etc.).
	 */
	dailyWeekday: string;
}

/**
 * A React component that displays the weekday for a daily list item.
 *
 * @param {IDailyListItemWeekdayProps} props - The component props.
 * @param {number} props.dayIndex - The index of the day, starting from 0 (representing "Today").
 * @param {string} props.dailyWeekday - The name of the weekday (e.g., "Monday", "Tuesday", etc.).
 * @returns {JSX.Element} The rendered component.
 */
const DailyListItemWeekday = ({ dayIndex, dailyWeekday }: IDailyListItemWeekdayProps) => {
	return (
		<div className='flex w-1/5 justify-start'>
			<span className={`${dayIndex ? 'font-light' : 'font-bold'}`}>
				{dayIndex ? dailyWeekday : 'Today'}
			</span>
		</div>
	);
};

export default DailyListItemWeekday;
