import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetDailyCalendar } from '../../../../context/WeatherData.context';
import { IDailyCalendar } from '../../../../context/WeatherData.types';
import { IUseGetDailyCalendarReturn, useDailyCalendar } from '../../../../hooks/useDailyCalendar';
import Calendar from './DailyCalendar';

vi.mock('../../../../context/WeatherData.context', () => ({
	useGetDailyCalendar: vi.fn(),
}));

vi.mock('../../../../hooks/useDailyCalendar', () => ({
	useDailyCalendar: vi.fn(),
}));

describe('DailyCalendar', () => {
	test('should render the calendar component without crashing', () => {
		const mockCalendarData = [
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
		];

		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: vi.fn(),
			selectPrevDay: vi.fn(),
			dailyState: { item: 0, isOpen: true },
		});

		const { getByTestId } = render(<Calendar />);
		const calendarList = getByTestId('daily-calendar-list');
		expect(calendarList).toBeInTheDocument();
	});

	test('should display the correct number of days in the calendar', () => {
		const mockCalendarData = [
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
			{ dayOfMonth: '4', fullDateString: '2023-10-04' },
			{ dayOfMonth: '5', fullDateString: '2023-10-05' },
			{ dayOfMonth: '6', fullDateString: '2023-10-06' },
			{ dayOfMonth: '7', fullDateString: '2023-10-07' },
		];

		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: vi.fn(),
			selectPrevDay: vi.fn(),
			dailyState: { item: 0, isOpen: true },
		});

		const { getAllByRole } = render(<Calendar />);
		const calendarButtons = getAllByRole('button', { name: /2023-10-/ });
		expect(calendarButtons).toHaveLength(mockCalendarData.length);
	});

	test('should highlight the active day correctly based on dailyState.item', () => {
		const mockCalendarData = [
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
		];

		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: vi.fn(),
			selectPrevDay: vi.fn(),
			dailyState: { item: 1, isOpen: true },
		});

		const { getByText } = render(<Calendar />);
		const activeDayElement = getByText('2');
		expect(activeDayElement).toHaveClass('active');
	});

	test('should call onCalendarDayClick with the correct index when a day is clicked', () => {
		const mockCalendarData = [
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
		];

		const onCalendarDayClickMock = vi.fn();
		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: onCalendarDayClickMock,
			selectNextDay: vi.fn(),
			selectPrevDay: vi.fn(),
			dailyState: { item: 0, isOpen: true },
		});

		const { getByText } = render(<Calendar />);
		const dayElement = getByText('2');
		dayElement.click();

		expect(onCalendarDayClickMock).toHaveBeenCalledWith(1);
	});

	test('should hide the previous day button when dailyState.item is 0', () => {
		const mockCalendarData = [
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
		];

		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: vi.fn(),
			selectPrevDay: vi.fn(),
			dailyState: { item: 0, isOpen: true },
		});

		const { getByLabelText } = render(<Calendar />);
		const prevDayButton = getByLabelText('to previous day');
		expect(prevDayButton).toHaveClass('hidden');
	});
	test('should display the correct date string for the selected day', () => {
		const mockCalendarData = [
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
		];

		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: vi.fn(),
			selectPrevDay: vi.fn(),
			dailyState: { item: 1, isOpen: true },
		});

		const { getByText } = render(<Calendar />);
		const dateString = getByText('2023-10-02');
		expect(dateString).toBeInTheDocument();
	});

	test('should call selectNextDay when the "next day" button is clicked', () => {
		const mockCalendarData = [
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
		];

		const selectNextDayMock = vi.fn();
		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: selectNextDayMock,
			selectPrevDay: vi.fn(),
			dailyState: { item: 0, isOpen: true },
		});

		const { getByLabelText } = render(<Calendar />);
		const nextDayButton = getByLabelText('to next day');
		nextDayButton.click();

		expect(selectNextDayMock).toHaveBeenCalled();
	});

	test('should call selectPrevDay when the "previous day" button is clicked', () => {
		const mockCalendarData = [
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
		];

		const selectPrevDayMock = vi.fn();
		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: vi.fn(),
			selectPrevDay: selectPrevDayMock,
			dailyState: { item: 1, isOpen: true },
		});

		const { getByLabelText } = render(<Calendar />);
		const prevDayButton = getByLabelText('to previous day');
		prevDayButton.click();

		expect(selectPrevDayMock).toHaveBeenCalled();
	});

	test('should disable the "next day" button when dailyState.item is greater than or equal to the last day of the calendar', () => {
		const mockCalendarData = [
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
			{ dayOfMonth: '4', fullDateString: '2023-10-04' },
			{ dayOfMonth: '5', fullDateString: '2023-10-05' },
			{ dayOfMonth: '6', fullDateString: '2023-10-06' },
			{ dayOfMonth: '7', fullDateString: '2023-10-07' },
		];

		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: vi.fn(),
			selectPrevDay: vi.fn(),
			dailyState: { item: mockCalendarData.length - 1, isOpen: true },
		});

		const { getByLabelText } = render(<Calendar />);
		const nextDayButton = getByLabelText('to next day');
		expect(nextDayButton).toHaveClass('hidden');
		expect(nextDayButton).toBeDisabled();
	});

	test('should disable the "previous day" button when dailyState.item is 0 and dailyState.isOpen is false', () => {
		const mockCalendarData = [
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
		];

		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: vi.fn(),
			selectPrevDay: vi.fn(),
			dailyState: { item: 0, isOpen: false },
		});

		const { getByLabelText } = render(<Calendar />);
		const prevDayButton = getByLabelText('to previous day');
		expect(prevDayButton).toBeDisabled();
		expect(prevDayButton).toHaveClass('hidden');
	});

	test('should render the calendar with no days when useGetDailyCalendar returns an empty array', () => {
		const mockCalendarData = [] as unknown as IDailyCalendar[];

		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: vi.fn(),
			selectPrevDay: vi.fn(),
			dailyState: { item: 0, isOpen: true },
		});

		const { queryByTestId } = render(<Calendar />);
		const calendarList = queryByTestId('daily-calendar-list');
		expect(calendarList?.children.length).toBe(0);
	});

	test('should render nothing when useGetDailyCalendar returns null', () => {
		const mockCalendarData = null;

		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData as unknown as IDailyCalendar[]
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: vi.fn(),
			selectPrevDay: vi.fn(),
			dailyState: { item: 0, isOpen: true },
		});

		const { queryByTestId } = render(<Calendar />);
		const calendarList = queryByTestId('daily-calendar-list');
		expect(calendarList).toBeEmptyDOMElement();
	});

	test('should render nothing when useDailyCalendar returns undefined', () => {
		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue([
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
		]);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue(
			undefined as unknown as IUseGetDailyCalendarReturn
		);

		const { queryByTestId, getByText } = render(<Calendar />);
		const calendarList = queryByTestId('daily-calendar-list');
		expect(calendarList).toBeInTheDocument();
		expect(getByText('Calendar is not available')).toBeInTheDocument();
	});

	test('should render the calendar with accessibility attributes (aria-label, tabIndex) correctly', () => {
		const mockCalendarData = [
			{ dayOfMonth: '1', fullDateString: '2023-10-01' },
			{ dayOfMonth: '2', fullDateString: '2023-10-02' },
			{ dayOfMonth: '3', fullDateString: '2023-10-03' },
		];

		(useGetDailyCalendar as MockedFunction<typeof useGetDailyCalendar>).mockReturnValue(
			mockCalendarData
		);
		(useDailyCalendar as MockedFunction<typeof useDailyCalendar>).mockReturnValue({
			onCalendarDayClick: vi.fn(),
			selectNextDay: vi.fn(),
			selectPrevDay: vi.fn(),
			dailyState: { item: 1, isOpen: true },
		});

		const { getAllByRole, getByLabelText } = render(<Calendar />);

		// Check if calendar days have correct aria-label
		const calendarButtons = getAllByRole('button', { name: /2023-10-/ });
		expect(calendarButtons).toHaveLength(mockCalendarData.length);
		expect(calendarButtons[0].getAttribute('aria-label')).toBe('2023-10-01');
		expect(calendarButtons[1].getAttribute('aria-label')).toBe('2023-10-02');
		expect(calendarButtons[2].getAttribute('aria-label')).toBe('2023-10-03');

		// Check if calendar days have correct tabIndex
		expect(calendarButtons[0].getAttribute('tabIndex')).toBe('0');
		expect(calendarButtons[1].getAttribute('tabIndex')).toBe('0');
		expect(calendarButtons[2].getAttribute('tabIndex')).toBe('0');

		// Check if previous day button has correct aria-label and tabIndex
		const prevDayButton = getByLabelText('to previous day');
		expect(prevDayButton.getAttribute('aria-label')).toBe('to previous day');
		expect(prevDayButton.getAttribute('tabIndex')).toBe('0');

		// Check if next day button has correct aria-label and tabIndex
		const nextDayButton = getByLabelText('to next day');
		expect(nextDayButton.getAttribute('aria-label')).toBe('to next day');
		expect(nextDayButton.getAttribute('tabIndex')).toBe('0');
	});
});
