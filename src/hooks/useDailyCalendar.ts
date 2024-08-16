import { DailyState } from '../context/Daily.context';
import { useDailyContext } from './useDailyContext';

export interface IUseGetDailyCalendarReturn {
	dailyState: DailyState;

	selectPrevDay: (event: React.MouseEvent<HTMLButtonElement>) => void;
	selectNextDay: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onCalendarDayClick: (index: number) => void;
}
/**
 * Custom hook that provides functionality for interacting with a daily calendar.
 *
 * @returns An object containing methods to handle calendar day clicks,
 *          select the previous day, select the next day, and the current daily state.
 */
export const useDailyCalendar = (): IUseGetDailyCalendarReturn => {
	const { dailyState, showDetails } = useDailyContext();

	/**
	 * Handles the click event on a calendar day.
	 *
	 * @param index - The index of the day that was clicked.
	 */
	const onCalendarDayClick = (index: number) => {
		showDetails(index);
	};

	/**
	 * Selects the previous day in the calendar.
	 *
	 * @param event - The mouse event triggered by clicking the previous day button.
	 */
	const selectPrevDay = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (dailyState.item > 0) {
			showDetails(dailyState.item - 1);
			return;
		}
	};

	/**
	 * Selects the next day in the calendar.
	 *
	 * @param event - The mouse event triggered by clicking the next day button.
	 */
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
