import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SvgScale from './SvgScale.tsx';

describe('SvgScale', () => {
	test('should render the SVG element with the correct viewBox attribute', () => {
		const mockData = {
			values: { level: 'good', value: 10, color: '#ff0000' }, // Ensure all required properties are included
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const svgElement = container.querySelector('svg');
		expect(svgElement).toBeTruthy();
		expect(svgElement?.getAttribute('viewBox')).toBe('0 0 200 25'); // Use getAttribute for assertion
	});

	test('should correctly calculate pointerCoord when data.values.value is at the minimum boundary', () => {
		const mockData = {
			values: { level: 'good', value: 1, color: '#ff0000' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const svgElement = container.querySelector('svg');
		const rectElement = container.querySelector(`#aqi-scale-indicator`);
		expect(svgElement).toBeTruthy();
		expect(rectElement).toBeTruthy();
		expect(rectElement?.getAttribute('x')).toBe('0');
	});

	test('should correctly calculate pointerCoord when data.values.value is at the maximum boundary', () => {
		const mockData = {
			values: { level: 'good', value: 5, color: '#ff0000' }, // Assuming 'aqi' type with max value of 5
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const svgElement = container.querySelector('svg');
		const rectElement = container.querySelector(`#aqi-scale-indicator`);
		expect(svgElement).toBeTruthy();
		expect(rectElement).toBeTruthy();
		expect(rectElement?.getAttribute('x')).toBe('179'); // 200 (length) - 21 (indicatorW)
	});

	test('should render the gradient stops with the correct offset percentages', () => {
		const mockData = {
			values: { level: 'good', value: 3, color: '#ff0000' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const stops = container.querySelectorAll('stop');
		expect(stops).toHaveLength(mockData.colors.length);
		stops.forEach((stop, index) => {
			const range = 100 / mockData.colors.length + 1;
			const expectedOffset = Math.round(range * index) + '%';
			expect(stop.getAttribute('offset')).toBe(expectedOffset);
		});
	});

	test('should render the scale indicator at the correct position based on pointerCoord', () => {
		const mockData = {
			values: { level: 'good', value: 3, color: '#ff0000' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const rectElement = container.querySelector(`#aqi-scale-indicator`);
		expect(rectElement).toBeTruthy();
		const expectedPointerCoord = Math.max(
			0,
			Math.min(((mockData.values.value - 1) * (200 - 21)) / (5 - 1), 200 - 21)
		);
		expect(rectElement?.getAttribute('x')).toBe(expectedPointerCoord.toString());
	});

	test('should handle the case when data.values is undefined', () => {
		const mockData = {
			values: undefined,
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const svgElement = container.querySelector('svg');
		const rectElement = container.querySelector(`#aqi-scale-indicator`);
		expect(svgElement).toBeTruthy();
		expect(rectElement).toBeTruthy();
		expect(rectElement?.getAttribute('x')).toBe('1');
	});

	test('should apply the correct gradient colors based on the data.colors array', () => {
		const mockData = {
			values: { level: 'good', value: 3, color: '#ff0000' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const stops = container.querySelectorAll('stop');
		expect(stops).toHaveLength(mockData.colors.length);
		stops.forEach((stop, index) => {
			expect(stop.getAttribute('stop-color')).toBe(mockData.colors[index]);
		});
	});

	test('should render the correct number of gradient stops based on the length of data.colors', () => {
		const mockData = {
			values: { level: 'good', value: 3, color: '#ff0000' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const stops = container.querySelectorAll('stop');
		expect(stops).toHaveLength(mockData.colors.length);
	});

	test('should render the scale with the correct width and height attributes', () => {
		const mockData = {
			values: { level: 'good', value: 3, color: '#ff0000' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const rectElement = container.querySelector('rect');
		expect(rectElement).toBeTruthy();
		expect(rectElement?.getAttribute('width')).toBe('21');
		expect(rectElement?.getAttribute('height')).toBe('21');
	});

	test('should handle the "aqi" type with 5 data points and other types with 11 data points', () => {
		const mockDataAqi = {
			values: { level: 'good', value: 3, color: '#ff0000' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const mockDataOther = {
			values: { level: 'good', value: 6, color: '#ff0000' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};

		const { container: containerAqi } = render(<SvgScale data={mockDataAqi} type='aqi' />);
		const rectElementAqi = containerAqi.querySelector(`#aqi-scale-indicator`);
		expect(rectElementAqi).toBeTruthy();
		const expectedPointerCoordAqi = Math.max(
			0,
			Math.min(((mockDataAqi.values.value - 1) * (200 - 21)) / (5 - 1), 200 - 21)
		);
		expect(rectElementAqi?.getAttribute('x')).toBe(expectedPointerCoordAqi.toString());

		const { container: containerOther } = render(<SvgScale data={mockDataOther} type='other' />);
		const rectElementOther = containerOther.querySelector(`#other-scale-indicator`);
		expect(rectElementOther).toBeTruthy();
		const expectedPointerCoordOther = Math.max(
			0,
			Math.min(((mockDataOther.values.value - 1) * (200 - 21)) / (11 - 1), 200 - 21)
		);
		expect(rectElementOther?.getAttribute('x')).toBe(expectedPointerCoordOther.toString());
	});
});
