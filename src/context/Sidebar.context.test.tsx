import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { act, ReactNode, useContext } from 'react';
import { vi } from 'vitest';
import { SidebarContext, SidebarProvider } from './Sidebar.context';

beforeAll(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(), // deprecated
			removeListener: vi.fn(), // deprecated
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
});
describe('SidebarContext', () => {
	const wrapper = ({ children }: { children: ReactNode }) => (
		<SidebarProvider>{children}</SidebarProvider>
	);

	test('should toggle sidebar visibility when toggleSideBar is called', () => {
		window.innerWidth = 750; // Set window width to 750px
		const { result } = renderHook(() => useContext(SidebarContext), { wrapper });

		act(() => {
			result.current?.toggleSideBar();
		});

		expect(result.current?.isOpenMobile).toBe(true);

		act(() => {
			result.current?.toggleSideBar();
		});

		expect(result.current?.isOpenMobile).toBe(false);
	});

	test('should set sidebar visibility to true when setSidebarVisibility is called with true', () => {
		const { result } = renderHook(() => useContext(SidebarContext), { wrapper });

		act(() => {
			result.current?.setSidebarVisibility(true);
		});

		expect(result.current?.isOpenMobile).toBe(true);
		expect(document.body.classList.contains('overflow-hidden')).toBe(true);
	});

	test('should set sidebar visibility to false when setSidebarVisibility is called with false', () => {
		const { result } = renderHook(() => useContext(SidebarContext), { wrapper });

		act(() => {
			result.current?.setSidebarVisibility(false);
		});

		expect(result.current?.isOpenMobile).toBe(false);
		expect(document.body.classList.contains('overflow-hidden')).toBe(false);
	});

	test('should force sidebar visibility change regardless of screen width when force parameter is true', () => {
		const { result } = renderHook(() => useContext(SidebarContext), { wrapper });

		act(() => {
			result.current?.setSidebarVisibility(true, true);
		});

		expect(result.current?.isOpenMobile).toBe(true);
		expect(document.body.classList.contains('overflow-hidden')).toBe(true);

		act(() => {
			result.current?.setSidebarVisibility(false, true);
		});

		expect(result.current?.isOpenMobile).toBe(false);
		expect(document.body.classList.contains('overflow-hidden')).toBe(false);
	});

	test('should add "overflow-hidden" class to body when sidebar is opened on mobile', () => {
		const { result } = renderHook(() => useContext(SidebarContext), { wrapper });

		act(() => {
			result.current?.setSidebarVisibility(true);
		});

		expect(document.body.classList.contains('overflow-hidden')).toBe(true);
	});
	test('should remove "overflow-hidden" class from body when sidebar is closed on mobile', () => {
		const { result } = renderHook(() => useContext(SidebarContext), { wrapper });

		act(() => {
			result.current?.setSidebarVisibility(true);
		});

		expect(document.body.classList.contains('overflow-hidden')).toBe(true);

		act(() => {
			result.current?.setSidebarVisibility(false);
		});

		expect(document.body.classList.contains('overflow-hidden')).toBe(false);
	});

	test('should close sidebar when swipe distance exceeds threshold in handleTouchMove', () => {
		const { result } = renderHook(() => useContext(SidebarContext), { wrapper });

		act(() => {
			result.current?.setSidebarVisibility(true);
		});

		act(() => {
			result.current?.handleTouchStart({
				changedTouches: [{ clientY: 100 }],
			} as unknown as React.TouchEvent<HTMLDivElement>);
		});

		act(() => {
			result.current?.handleTouchMove({
				changedTouches: [{ clientX: 50 }],
			} as unknown as React.TouchEvent<HTMLDivElement>);
		});

		expect(result.current?.isOpenMobile).toBe(false);
	});

	test('should not change sidebar visibility if touchStart is null in handleTouchMove', () => {
		const { result } = renderHook(() => useContext(SidebarContext), { wrapper });

		act(() => {
			result.current?.handleTouchMove({
				changedTouches: [{ clientX: 50 }],
			} as unknown as React.TouchEvent<HTMLDivElement>);
		});

		expect(result.current?.isOpenMobile).toBe(false);
	});

	test('should update touchStart state with initial touch position in handleTouchStart', () => {
		const { result } = renderHook(() => useContext(SidebarContext), { wrapper });

		act(() => {
			result.current?.handleTouchStart({
				changedTouches: [{ clientY: 150 }],
			} as unknown as React.TouchEvent<HTMLDivElement>);
		});

		expect(result.current?.touchStart).toBe(150);
	});
});
