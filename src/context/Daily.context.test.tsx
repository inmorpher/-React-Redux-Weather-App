import { act, renderHook, waitFor } from '@testing-library/react';
import { useContext } from 'react';
import { vi } from 'vitest';
import { DailyContext, DailyProvider } from './Daily.context';

// Mock the useWindowResize hook at the top level
// xxw
vi.mock('../hooks/useWindowResize', () => ({
	useWindowResize: vi.fn((callback) => callback()),
	// showDetails: vi.fn((callback) => callback()),
	scrollToggler: vi.fn(),
}));
describe('DailyContext', () => {
	test('should initialize with default state values', () => {
		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		expect(result.current).not.toBeUndefined();

		if (result.current) {
			expect(result.current.dailyState).toEqual({ isOpen: false, item: 0 });
			expect(result.current.isDailyOpen).toBe(false);
			expect(result.current.activeDay).toBe(0);
			expect(result.current.isActiveListener).toBe(false);
			expect(result.current.containerRef.current).toBe(null);
			expect(result.current.dailyListRef.current).toBe(null);
			expect(result.current.dailyDetailsRef.current).toBe(null);
		}
	});

	test('should open the details popup when showDetails is called with an item index', () => {
		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		act(() => {
			result.current?.showDetails(1);
		});

		expect(result.current?.dailyState).toEqual({ isOpen: true, item: 1 });
	});
	test('should close the details popup when hideDetails is called', () => {
		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		act(() => {
			result.current?.showDetails(1);
		});

		expect(result.current?.dailyState.isOpen).toBe(true);

		act(() => {
			result.current?.hideDetails();
		});

		expect(result.current?.dailyState.isOpen).toBe(false);
	});
	test('should scroll to the details section when onOpenPopup is called', () => {
		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		const scrollToMock = vi.fn();

		// Ensure refs are set up
		if (result.current?.containerRef.current && result.current?.dailyDetailsRef.current) {
			result.current.containerRef.current.scrollTo = scrollToMock;

			act(() => {
				result.current?.onOpenPopup(1);
			});

			expect(scrollToMock).toHaveBeenCalledWith({
				left:
					(result.current.dailyDetailsRef.current.offsetLeft ?? 0) -
					(result.current.containerRef.current.offsetLeft ?? 0),
				behavior: 'smooth',
			});
		}
	});

	test('should reset scroll position to start when onCloseDetails is called', () => {
		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		const scrollToMock = vi.fn();

		if (result.current?.containerRef.current) {
			result.current.containerRef.current.scrollTo = scrollToMock;

			act(() => {
				result.current?.onCloseDetails();
			});

			expect(scrollToMock).toHaveBeenCalledWith({
				left: 0,
				behavior: 'smooth',
			});
		}
	});

	test('should handle Enter key to open popup when onPressKeys is called', () => {
		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		const mockEvent = {
			key: 'Enter',
		} as React.KeyboardEvent<HTMLLIElement>;

		act(() => {
			result.current?.onPressKeys(mockEvent, 1);
		});

		expect(result.current?.dailyState).toEqual({ isOpen: true, item: 1 });
	});

	test('should handle Escape key to close popup when onPressKeys is called', async () => {
		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		const mockEvent = {
			key: 'Escape',
		} as React.KeyboardEvent<HTMLLIElement>;

		if (result.current && result.current.dailyState) {
			act(() => {
				result.current?.onPressKeys(mockEvent, 1);
			});

			// Wait for the state to update
			await waitFor(() => {
				expect(result.current?.dailyState).toEqual({ isOpen: false, item: 0 });
			});
		}
	});

	test('should update state correctly when setIsActiveListener is called', () => {
		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		act(() => {
			result.current?.setIsActiveListener(true);
		});

		expect(result.current?.isActiveListener).toBe(true);

		act(() => {
			result.current?.setIsActiveListener(false);
		});

		expect(result.current?.isActiveListener).toBe(false);
	});

	test('should trigger scrollToggler on window resize if details are open', () => {
		const scrollTogglerMock = vi.fn();
		const useWindowResizeMock = vi.fn((callback) => callback());

		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		if (result.current && result.current.scrollToggler && result.current.dailyState.isOpen) {
			result.current.scrollToggler = scrollTogglerMock;

			act(() => {
				result.current?.showDetails(1);
			});

			expect(result.current?.dailyState.isOpen).toBe(true);

			act(() => {
				useWindowResizeMock(() => {
					result.current?.scrollToggler();
				});
			});

			expect(scrollTogglerMock).toHaveBeenCalled();
		}
	});

	test('should not scroll if containerRef, dailyListRef, or dailyDetailsRef are null', () => {
		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		const scrollToMock = vi.fn();
		const containerRef = { current: null };
		const dailyListRef = { current: null };
		const dailyDetailsRef = { current: null };
		// Ensure refs are null
		if (result.current) {
			result.current.containerRef = containerRef;
			result.current.dailyListRef = dailyListRef;
			result.current.dailyDetailsRef = dailyDetailsRef;

			act(() => {
				result.current?.onOpenPopup(1);
			});

			expect(scrollToMock).not.toHaveBeenCalled();
		}
	});

	test('should handle other keys gracefully when onPressKeys is called', () => {
		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		const mockEvent = {
			key: 'ArrowDown',
		} as React.KeyboardEvent<HTMLLIElement>;

		act(() => {
			result.current?.onPressKeys(mockEvent, 1);
		});

		expect(result.current?.dailyState).toEqual({ isOpen: false, item: 0 });
	});

	test('should handle other keys gracefully when onPressKeys is called', () => {
		const { result } = renderHook(() => useContext(DailyContext), {
			wrapper: ({ children }) => <DailyProvider>{children}</DailyProvider>,
		});

		const mockEvent = {
			key: 'ArrowDown',
		} as React.KeyboardEvent<HTMLLIElement>;

		act(() => {
			result.current?.containerRef.current === null;
		});

		act(() => {
			result.current?.onPressKeys(mockEvent, 1);
		});

		expect(result.current?.dailyState).toEqual({ isOpen: false, item: 0 });
	});
});
