import { useDailyContext } from './useDailyContext';

export const useDailyCalendar = () => {
	const { dailyState, showDetails } = useDailyContext();

	const onCalendarDayClick = (index: number) => {
		showDetails(index);
	};

	const selectPrevDay = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (dailyState.item > 0) {
			showDetails(dailyState.item - 1);
			return;
		}
		console.log('There no more days BEFORE');
	};
	const selectNextDay = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (dailyState.item < 7) {
			showDetails(dailyState.item + 1);
			return;
		}
		console.log('There no more days AFTER');
	};

	return {
		onCalendarDayClick,
		selectPrevDay,
		selectNextDay,
		dailyState,
	};
};
