import { vi } from 'vitest';
import { debounce } from './debounce';

describe('Debounce function', () => {
	test('should invoke the provided function after the specified delay', async () => {
		vi.useFakeTimers();
		const mockFn = vi.fn();
		const delay = 1000;
		const debouncedFn = debounce(mockFn, delay);

		debouncedFn();
		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(delay);
		await Promise.resolve(); // Wait for the timer to finish

		expect(mockFn).toHaveBeenCalledTimes(1);

		vi.useRealTimers();
	});

	test('should not invoke the provided function if it is called again before the delay expires', () => {
		vi.useFakeTimers();
		const mockFn = vi.fn();
		const delay = 1000;
		const debouncedFn = debounce(mockFn, delay);

		debouncedFn();
		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(500); // Advance time by 500ms, which is less than the delay
		debouncedFn(); // Call the debounced function again before the delay expires

		vi.advanceTimersByTime(1000); // Advance time by another 1000ms, now exceeding the delay
		expect(mockFn).toHaveBeenCalledTimes(1); // The function should have been called only once

		vi.useRealTimers();
	});

	test('should correctly handle multiple calls within the delay period', () => {
		vi.useFakeTimers();
		const mockFn = vi.fn();
		const delay = 1000;
		const debouncedFn = debounce(mockFn, delay);

		debouncedFn();
		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(500); // Advance time by 500ms, which is less than the delay
		debouncedFn(); // Call the debounced function again before the delay expires
		debouncedFn(); // Call the debounced function again before the delay expires

		vi.advanceTimersByTime(1000); // Advance time by another 1000ms, now exceeding the delay
		expect(mockFn).toHaveBeenCalledTimes(1); // The function should have been called only once

		vi.useRealTimers();
	});
});
