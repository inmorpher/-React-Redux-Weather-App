import { useDailyContext } from './useDailyContext';
//TODO: add documentation for the returned object
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
	};
	const selectNextDay = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (dailyState.item < 7) {
			showDetails(dailyState.item + 1);
			return;
		}
	};

	return {
		onCalendarDayClick,
		selectPrevDay,
		selectNextDay,
		dailyState,
	};
};
