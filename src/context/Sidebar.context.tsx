import { ReactNode, createContext, useCallback, useLayoutEffect, useState } from 'react';

export type SidebarContextProps = {
	children: ReactNode;
};

export type SidebarContextType = {
	isOpenMobile: boolean;
	toggleSideBar: () => void;
	setSidebarVisibility: (isOpenMobile: boolean, force?: boolean) => void;
	handleTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
	handleTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<SidebarContextProps> = ({ children }) => {
	// State to manage the visibility of the sidebar on mobile devices.
	const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
	// State to track the start position of a touch event.
	const [touchStart, setTouchStart] = useState<number | null>(null);

	/**
	 * Handles the start of a touch event.
	 * Records the vertical position where the touch started.
	 *
	 * @param event - The touch event.
	 */
	const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		const touchDown = event.changedTouches[0].clientY;
		console.log(touchDown);
		setTouchStart(touchDown);
	};

	/**
	 * Handles the movement of a touch event.
	 * Closes the sidebar if the swipe distance is greater than a threshold.
	 *
	 * @param event - The touch event.
	 */
	const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
		if (touchStart === null) {
			return;
		}

		const currentTouch = event.changedTouches[0].clientY;
		const diff = currentTouch - touchStart;

		if (diff > 35) {
			setIsOpenMobile(false);
		}
		setTouchStart(currentTouch);
	};

	/**
	 * Sets the visibility of the sidebar.
	 * Optionally forces the visibility change regardless of screen width.
	 *
	 * @param isOpenMobile - Boolean indicating if the sidebar should be open on mobile.
	 * @param force - Optional boolean to force the visibility change.
	 */
	const setSidebarVisibility = useCallback((isOpenMobile: boolean, force = false) => {
		if (force || window.innerWidth < 768) {
			setIsOpenMobile(isOpenMobile);
			document.body.classList.toggle('overflow-hidden', isOpenMobile);
		}
	}, []);

	/**
	 * Toggles the visibility of the sidebar.
	 */
	const toggleSideBar = useCallback(() => {
		setSidebarVisibility(!isOpenMobile);
	}, [isOpenMobile, setSidebarVisibility]);

	/**
	 * Effect to handle window resize events.
	 * Closes the sidebar and removes the 'overflow-hidden' class from the body if the window width is >= 768px.
	 */
	useLayoutEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 768px)');
		const handleResize = () => {
			if (mediaQuery.matches && isOpenMobile) {
				setIsOpenMobile(false);
				document.body.classList.remove('overflow-hidden');
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize(); // Call the handler immediately to set the initial state.
		return () => window.removeEventListener('resize', handleResize);
	}, [isOpenMobile]);

	return (
		<SidebarContext.Provider
			value={{
				isOpenMobile,
				toggleSideBar,
				setSidebarVisibility,
				handleTouchStart,
				handleTouchMove,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};
