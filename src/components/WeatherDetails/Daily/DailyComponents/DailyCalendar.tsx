import { useGetDailyCalendar } from '../../../../context/WeatherData.context';
import { IDailyCalendar } from '../../../../context/WeatherData.types';
import { useDailyCalendar } from '../../../../hooks/useDailyCalendar';
import Button from '../../../UI/Button';
import SpanText from '../../../UI/Global/SpanText';
import Wrapper from '../../../UI/Global/Wrapper';
import withLoading from '../../../UI/WithLoading';

const Calendar = ({ data: calendar }: { data: IDailyCalendar[] }) => {
	const { onCalendarDayClick, selectNextDay, selectPrevDay, dailyState } = useDailyCalendar();

	return (
		<>
			<Calendar.Wrapper className='flex justify-center gap-2'>
				{calendar.map((day, index) => {
					return (
						<Calendar.Button
							key={'daily-calendar' + index}
							variant='calendar'
							size={'small'}
							children={day.dayOfMonth}
							className={dailyState.item === index ? 'active' : ''}
							onClick={() => onCalendarDayClick(index)}
							tabIndex={dailyState.isOpen ? 0 : -1}
							aria-label={day.fullDateString}
						/>
					);
				})}
			</Calendar.Wrapper>
			<Calendar.Wrapper className='relative flex items-center justify-center py-3 text-base'>
				<Calendar.Button
					variant='arrLeft'
					size='small'
					onClick={selectPrevDay}
					className={`absolute left-[10%] ${dailyState.item <= 0 && 'hidden'}`}
					tabIndex={dailyState.isOpen ? 0 : -1}
					aria-label='to previous day'
				/>
				<Calendar.Text>{calendar[dailyState.item].fullDateString}</Calendar.Text>
				<Calendar.Button
					variant='arrRight'
					size='small'
					onClick={selectNextDay}
					className={`absolute right-[10%] ${dailyState.item > 6 && 'hidden'}`}
					tabIndex={dailyState.isOpen ? 0 : -1}
					aria-label='to next day'
				/>
			</Calendar.Wrapper>
		</>
	);
};

Calendar.Wrapper = Wrapper;
Calendar.Button = Button;
Calendar.Text = SpanText;

export default withLoading<{}, IDailyCalendar[]>(Calendar, useGetDailyCalendar);
