import { useDailyCalendar } from '../../../../hooks/useDailyCalendar';
import { useFetchState } from '../../../../hooks/useFetchState';
import { selectDailyCalendar } from '../../../../store/slices/weatherApiSlice';
import Button from '../../../UI/Button';

const Calendar = () => {
	const { data: calendar } = useFetchState(selectDailyCalendar);

	const { onCalendarDayClick, selectNextDay, selectPrevDay, dailyState } = useDailyCalendar();

	if (!calendar) {
		console.warn('calendar is not defined');
		return null;
	}

	return (
		<>
			<div className='flex justify-center gap-2'>
				{calendar.map((day, index) => {
					return (
						<Button
							key={'daily-calendar' + index}
							variant='calendar'
							size={'small'}
							children={day.days}
							className={dailyState.item === index ? 'active' : ''}
							onClick={() => onCalendarDayClick(index)}
							tabIndex={dailyState.isOpen ? 0 : -1}
							aria-label={day.fullDate}
						/>
					);
				})}
			</div>
			<div className='relative flex items-center justify-center py-3 text-base'>
				<Button
					variant='arrLeft'
					size='small'
					onClick={selectPrevDay}
					className={`absolute left-[10%] ${dailyState.item <= 0 && 'hidden'}`}
					tabIndex={dailyState.isOpen ? 0 : -1}
					aria-label='to previous day'
				/>
				<span>{calendar[dailyState.item].fullDate}</span>
				<Button
					variant='arrRight'
					size='small'
					onClick={selectNextDay}
					className={`absolute right-[10%] ${dailyState.item > 6 && 'hidden'}`}
					tabIndex={dailyState.isOpen ? 0 : -1}
					aria-label='to next day'
				/>
			</div>
		</>
	);
};

export default Calendar;
