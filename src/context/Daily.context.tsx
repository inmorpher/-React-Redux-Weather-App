import React, {
	ReactNode,
	createContext,
	startTransition,
	useCallback,
	useRef,
	useState,
} from 'react';
import { useWindowResize } from '../hooks/useWindowResize';

export interface DailyContextProps {
	children: ReactNode;
}

export interface DailyState {
	isOpen: boolean;
	item: number;
}

export interface DailyContextType {
	dailyState: DailyState;
	isDailyOpen: boolean;
	activeDay: number;
	isActiveListener: boolean;
	containerRef: React.RefObject<HTMLDivElement>;
	dailyListRef: React.RefObject<HTMLDivElement>;
	dailyDetailsRef: React.RefObject<HTMLDivElement>;
	scrollToggler: () => void;
	hideDetails: () => void;
	showDetails: (item: number) => void;
	setIsActiveListener: (value: boolean) => void;
	onOpenPopup: (item: number) => void;
	onPressKeys: (event: React.KeyboardEvent<HTMLLIElement>, index: number) => void;
	onCloseDetails: () => void;
}

export const DailyContext = createContext<DailyContextType | undefined>(undefined);

export const DailyProvider: React.FC<DailyContextProps> = ({ children }) => {
	const [dailyState, setDailyState] = useState<DailyState>({
		isOpen: false,
		item: 0,
	});
	const [isDailyOpen] = useState(false);
	const [activeDay] = useState<number>(0);

	const [isActiveListener, setIsActiveListener] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const dailyListRef = useRef<HTMLDivElement>(null);
	const dailyDetailsRef = useRef<HTMLDivElement>(null);
	/**
	 * Opens the popup with the given item and position.
	 * @param item the index of the item to display in the popup
	 * @param position the position of the popup, or 'mobile' to use the mobile layout
	 */

	const showDetails = useCallback((item: number) => {
		startTransition(() => {
			setDailyState({
				isOpen: true,
				item,
			});
		});
	}, []);

	const hideDetails = () => {
		startTransition(() => {
			setDailyState(() => ({
				item: 0,
				isOpen: false,
			}));
		});
	};

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

	useWindowResize(() => {
		if (dailyState.isOpen) {
			scrollToggler();
		}
	}, dailyState.isOpen);

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
	return (
		<DailyContext.Provider
			value={{
				isDailyOpen,
				activeDay,
				dailyState,
				showDetails,
				hideDetails,
				containerRef,
				dailyDetailsRef,
				dailyListRef,
				isActiveListener,
				setIsActiveListener,
				onOpenPopup,
				onPressKeys,
				onCloseDetails,
				scrollToggler,
			}}
		>
			{children}
		</DailyContext.Provider>
	);
};
