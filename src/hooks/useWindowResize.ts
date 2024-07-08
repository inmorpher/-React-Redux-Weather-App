import { useEffect } from 'react';
import { debounce } from '../utils/debounce';

/**
 * A custom hook that listens to window resize events and invokes a specified callback function.
 * The hook debounces the resize handler to avoid unnecessary calls, and it removes the listener on cleanup.
 * @param callback The function to be invoked on resize.
 * @param dependency A boolean value that determines whether the hook should listen to window resize events.
 */
export const useWindowResize = (callback: () => void, shouldListen = false) => {
	// Debounce the resize handler to avoid unnecessary calls
	const handleResize = debounce(() => callback(), 300);

	useEffect(() => {
		if (shouldListen) {
			// Debounce the resize handler to avoid unnecessary calls

			// Add the resize listener
			window.addEventListener('resize', handleResize);

			// Remove the resize listener on cleanup
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [shouldListen, handleResize]);
};
