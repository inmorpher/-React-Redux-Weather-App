import { useCallback } from 'react';
import { useDailyContext } from './useDailyContext';

/**
 * Custom hook for managing daily weather data and UI interactions.
 * It provides functionality to open and close details about daily weather,
 * handle keyboard events for accessibility, and manage scrolling within the container.
 *
 * @returns An object containing various states and handlers related to the daily weather UI.
 */
export const useDaily = () => {
	// Retrieves daily weather values and colors from the Redux store.

	// Retrieves context values including state and ref objects for managing UI interactions.
	const { showDetails, hideDetails, dailyState, containerRef, dailyDetailsRef, dailyListRef } =
		useDailyContext();

	/**
	 * Scrolls the container to show the daily details component smoothly.
	 */
	const scrollToggler = useCallback(() => {
		if (containerRef.current && dailyListRef.current && dailyDetailsRef.current) {
			const containerLeft = containerRef.current.offsetLeft;
			const dailyDetailsLeft = dailyDetailsRef.current.offsetLeft;
			containerRef.current.scrollTo({
				left: dailyDetailsLeft - containerLeft,
				behavior: 'smooth',
			});
		}
	}, [containerRef, dailyDetailsRef, dailyListRef]);

	/**
	 * Handles the opening of the popup for daily details.
	 * It triggers the detail view to show and scrolls the container accordingly.
	 *
	 * @param {number} index - The index of the day for which details should be shown.
	 */
	const onOpenPopup = useCallback(
		(index: number) => {
			showDetails(index);
			scrollToggler();
		},
		[showDetails, scrollToggler]
	);

	/**
	 * Closes the daily details view and scrolls the container back to the start.
	 */
	const onCloseDetails = useCallback(() => {
		if (containerRef.current) {
			hideDetails();
			containerRef.current?.scrollTo({
				left: 0,
				behavior: 'smooth',
			});
		}
	}, [containerRef, hideDetails]);

	/**
	 * Handles keyboard events for accessibility.
	 * It allows opening and closing of daily details using the Enter and Escape keys, respectively.
	 *
	 * @param {React.KeyboardEvent<HTMLLIElement>} event - The keyboard event.
	 * @param {number} index - The index of the day for which the keyboard event is triggered.
	 */
	const onPressKeys = useCallback(
		(event: React.KeyboardEvent<HTMLLIElement>, index: number) => {
			if (event.key === 'Enter' && !dailyState.isOpen) {
				onOpenPopup(index);
			} else if (event.key === 'Escape' && dailyState.isOpen) {
				onCloseDetails();
			}
		},
		[dailyState.isOpen, onCloseDetails, onOpenPopup]
	);

	return {
		onOpenPopup,
		onPressKeys,
		containerRef,
		dailyListRef,
		dailyDetailsRef,
		dailyState,
		onCloseDetails,
	};
};
/**
 * Custom hook that retrieves the index of the currently selected day.
 *
 * @returns {number} The index of the selected day from the dailyState.
 */
export const useSelectedDayIndex = (): number => {
	const { dailyState } = useDaily();
	const selectedDayIndex = dailyState.item;

	return selectedDayIndex;
};
