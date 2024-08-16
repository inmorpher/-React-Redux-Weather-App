import { z } from 'zod';
import { useGetDailyCalendar } from '../../../../context/WeatherData.context';
import { useDailyCalendar } from '../../../../hooks/useDailyCalendar';
import Button from '../../../UI/Button';
import SpanText from '../../../UI/Global/SpanText';
import Wrapper from '../../../UI/Global/Wrapper';

const CalendarDaySchema = z.object({
	dayOfMonth: z.string(),
	fullDateString: z.string(),
});

const DailyStateSchema = z.object({
	item: z.number(),
	isOpen: z.boolean(),
});

const CalendarSchema = z.array(CalendarDaySchema);

const Calendar = () => {
	const { onCalendarDayClick, selectNextDay, selectPrevDay, dailyState } = useDailyCalendar() ?? {};
	const calendar = useGetDailyCalendar();

	const isCalendar =
		CalendarSchema.safeParse(calendar).success &&
		DailyStateSchema.safeParse(dailyState).success &&
		calendar;
	return (
		<>
			<Calendar.Wrapper className='flex justify-center gap-2' data-testid='daily-calendar-list'>
				{isCalendar &&
					calendar.map((day, index) => (
						<Calendar.Button
							key={'daily-calendar' + index}
							variant='calendar'
							size={'small'}
							children={day.dayOfMonth}
							className={dailyState?.item === index ? 'active' : ''}
							onClick={() => onCalendarDayClick(index)}
							tabIndex={dailyState?.isOpen ? 0 : -1}
							aria-label={day.fullDateString}
						/>
					))}
			</Calendar.Wrapper>
			<Calendar.Wrapper className='relative flex items-center justify-center py-3 text-base'>
				{isCalendar && (
					<Calendar.Button
						variant='arrLeft'
						size='small'
						onClick={selectPrevDay}
						className={`absolute left-[10%] ${dailyState?.item <= 0 && 'hidden'}`}
						tabIndex={dailyState?.isOpen ? 0 : -1}
						aria-label='to previous day'
						disabled={dailyState?.item <= 0}
					/>
				)}

				<Calendar.Text>
					{isCalendar ? calendar[dailyState?.item]?.fullDateString : 'Calendar is not available'}
				</Calendar.Text>
				{isCalendar && (
					<Calendar.Button
						variant='arrRight'
						size='small'
						onClick={selectNextDay}
						className={`absolute right-[10%] ${dailyState?.item >= calendar.length - 1 && 'hidden'}`}
						tabIndex={dailyState?.isOpen ? 0 : -1}
						aria-label='to next day'
						disabled={dailyState?.item >= calendar.length - 1}
					/>
				)}
			</Calendar.Wrapper>
		</>
	);
};

Calendar.Wrapper = Wrapper;
Calendar.Button = Button;
Calendar.Text = SpanText;

export default Calendar;
