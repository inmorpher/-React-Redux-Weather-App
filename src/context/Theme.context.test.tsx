import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemeProvider, useTheme } from './Theme.context';

describe('ThemeContext', () => {
	afterEach(() => {
		localStorage.clear();
	});

	test('should initialize theme to "light" if no saved theme and system preference is light', () => {
		localStorage.removeItem('themeData'); // Ensure localStorage is clear
		window.matchMedia = vi.fn().mockImplementation((query) => {
			return {
				matches: query === '(prefers-color-scheme: light)',
				addListener: vi.fn(),
				removeListener: vi.fn(),
			};
		});

		const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

		expect(result.current.mode).toBe('light');
	});

	test('should initialize theme to "dark" if no saved theme and system preference is dark', () => {
		localStorage.removeItem('themeData'); // Ensure localStorage is clear
		window.matchMedia = vi.fn().mockImplementation((query) => {
			return {
				matches: query === '(prefers-color-scheme: dark)',
				addListener: vi.fn(),
				removeListener: vi.fn(),
			};
		});

		const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

		expect(result.current.mode).toBe('dark');
	});

	test('should persist theme to localStorage when toggled', () => {
		const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

		const initialTheme = result.current.mode;
		const initialLocalStorage = localStorage.getItem('themeData');

		act(() => {
			result.current.toggleTheme();
		});

		const updatedTheme = result.current.mode;
		const updatedLocalStorage = localStorage.getItem('themeData');

		expect(updatedTheme).not.toBe(initialTheme);
		expect(updatedLocalStorage).not.toBe(initialLocalStorage);

		const parsedLocalStorage = JSON.parse(updatedLocalStorage!);
		expect(parsedLocalStorage.mode).toBe(updatedTheme);
	});

	test('should toggle theme mode from "light" to "dark" when toggleTheme is called', () => {
		localStorage.setItem('themeData', JSON.stringify({ mode: 'light', version: 1 }));
		const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

		expect(result.current.mode).toBe('light'); // Initial mode is light

		act(() => {
			result.current.toggleTheme();
		});

		expect(result.current.mode).toBe('dark'); // Mode should be dark after toggling
	});
	test('should toggle theme mode from "dark" to "light" when toggleTheme is called', () => {
		localStorage.setItem('themeData', JSON.stringify({ mode: 'dark', version: 1 }));
		const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

		expect(result.current.mode).toBe('dark'); // Initial mode is dark

		act(() => {
			result.current.toggleTheme();
		});

		expect(result.current.mode).toBe('light'); // Mode should be light after toggling
	});

	test('should apply "data-theme" attribute to document body based on current theme mode', () => {
		const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

		expect(document.body.getAttribute('data-theme')).toBe(result.current.mode);

		act(() => {
			result.current.toggleTheme();
		});

		expect(document.body.getAttribute('data-theme')).toBe(result.current.mode);
	});

	test('should throw an error if useTheme is used outside of ThemeProvider', () => {
		const errorMessage = 'useTheme must be used within a ThemeProvider';

		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => renderHook(() => useTheme())).toThrow(errorMessage);

		consoleErrorSpy.mockRestore();
	});

	test('should return the correct theme mode and version from useTheme hook', () => {
		const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

		expect(result.current.mode).toBe('dark'); // Assuming the default system preference is light
		expect(result.current.version).toBe(1);
	});
});
