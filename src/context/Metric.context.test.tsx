import '@testing-library/jest-dom';
import { act, render, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { MetricProvider, useMetric } from './Metric.context';

describe('MetricContext', () => {
	afterEach(() => {
		localStorage.clear();
	});

	test('should initialize with metric type when no saved metric data is found', () => {
		localStorage.removeItem('metricData'); // Ensure localStorage is clear
		const { result } = renderHook(() => useMetric(), { wrapper: MetricProvider });
		expect(result.current.metricType).toBe('metric');
	});

	test('should initialize with saved metric data when found in localStorage', () => {
		localStorage.setItem('metricData', JSON.stringify({ version: 1, metricType: 'imperial' }));
		const { result } = renderHook(() => useMetric(), { wrapper: MetricProvider });
		expect(result.current.metricType).toBe('imperial');
	});
	test('should toggle metric type from metric to imperial', () => {
		const { result } = renderHook(() => useMetric(), { wrapper: MetricProvider });

		act(() => {
			result.current.toggleMetric();
		});

		expect(result.current.metricType).toBe('imperial');
	});
	test('should toggle metric type from imperial to metric', () => {
		const { result } = renderHook(() => useMetric(), { wrapper: MetricProvider });

		act(() => {
			result.current.toggleMetric(); // Toggle to imperial
		});

		expect(result.current.metricType).toBe('imperial');

		act(() => {
			result.current.toggleMetric(); // Toggle back to metric
		});

		expect(result.current.metricType).toBe('metric');
	});

	test('should save metric data to localStorage on metric type change', () => {
		const { result } = renderHook(() => useMetric(), { wrapper: MetricProvider });

		act(() => {
			result.current.toggleMetric();
		});

		const savedMetricData = JSON.parse(localStorage.getItem('metricData')!);
		expect(savedMetricData.metricType).toBe('imperial');

		act(() => {
			result.current.toggleMetric();
		});

		const updatedMetricData = JSON.parse(localStorage.getItem('metricData')!);
		expect(updatedMetricData.metricType).toBe('metric');
	});
	test('should throw an error when useMetric is used outside of MetricProvider', () => {
		const errorMessage = 'useMetric must be used within a MetricProvider';

		const TestComponent = () => {
			useMetric();
			return null;
		};

		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => render(<TestComponent />)).toThrow(errorMessage);

		consoleErrorSpy.mockRestore();
	});
	test('should correctly parse and use saved metric data with the correct version', () => {
		const savedMetricData = JSON.stringify({ version: 1, metricType: 'imperial' });
		localStorage.setItem('metricData', savedMetricData);

		const { result } = renderHook(() => useMetric(), { wrapper: MetricProvider });

		expect(result.current.metricType).toBe('imperial');
	});
	test('should correctly parse and use saved metric data with the correct version', () => {
		const savedMetricData = JSON.stringify({ version: 1, metricType: 'imperial' });
		localStorage.setItem('metricData', savedMetricData);

		const { result } = renderHook(() => useMetric(), { wrapper: MetricProvider });

		expect(result.current.metricType).toBe('imperial');
	});

	test('should provide the toggleMetric function in the context', () => {
		const { result } = renderHook(() => useMetric(), { wrapper: MetricProvider });

		expect(typeof result.current.toggleMetric).toBe('function');
	});
});
