import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ScaleReturn } from '../../../utils/services/definitions/svgScale.definition';
import SvgScale from './SvgScale';

describe('SvgScale', () => {
	it('should render the SVG component correctly with default props', () => {
		const mockData: ScaleReturn = {
			values: { value: 3, level: '1', color: '#0000ff' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='default' />);
		expect(container.querySelector('svg')).toBeInTheDocument();
		expect(container.querySelector('linearGradient')).toBeInTheDocument();
		expect(container.querySelector('rect')).toBeInTheDocument();
		expect(container.querySelector('use')).toBeInTheDocument();
	});

	it('should render the SVG component with correct dimensions and viewBox', () => {
		const mockData: ScaleReturn = {
			values: { value: 3, level: '1', color: '#0000ff' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='default' />);
		const svgElement = container.querySelector('svg');
		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveAttribute('viewBox', '0 0 200 25');
		expect(svgElement).toHaveAttribute('width', '100%');
	});

	it('should correctly calculate pointer position for "aqi" type with minimum value', () => {
		const mockData: ScaleReturn = {
			values: { value: 1, level: '1', color: '#0000ff' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const rect = container.querySelector('rect[id="aqi-scale-indicator"]');
		expect(rect).toHaveAttribute('x', '0');
	});

	it('should correctly calculate pointer position for non-"aqi" type with minimum value', () => {
		const mockData: ScaleReturn = {
			values: { value: 1, level: '1', color: '#0000ff' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='default' />);
		const rect = container.querySelector('rect[id="default-scale-indicator"]');
		expect(rect).toHaveAttribute('x', '0');
	});

	it('should correctly calculate pointer position for "aqi" type with mid-range value', () => {
		const mockData: ScaleReturn = {
			values: { value: 3, level: '3', color: '#0000ff' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const rect = container.querySelector('rect[id="aqi-scale-indicator"]');
		expect(rect).toHaveAttribute('x', '89.5');
	});
	it('should correctly calculate pointer position for "aqi" type with maximum value', () => {
		const mockData: ScaleReturn = {
			values: { value: 5, level: '5', color: '#0000ff' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='aqi' />);
		const rect = container.querySelector('rect[id="aqi-scale-indicator"]');
		expect(rect).toHaveAttribute('x', '179');
	});

	it('should correctly calculate pointer position for non-"aqi" type with maximum value', () => {
		const mockData: ScaleReturn = {
			values: { value: 11, level: '11', color: '#0000ff' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='default' />);
		const rect = container.querySelector('rect[id="default-scale-indicator"]');
		expect(rect).toHaveAttribute('x', '179');
	});

	it('should ensure the pointer stays within the bounds of the scale for edge values', () => {
		const mockData: ScaleReturn = {
			values: { value: 0, level: '0', color: '#0000ff' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='default' />);
		const rect = container.querySelector('rect[id="default-scale-indicator"]');
		expect(rect).toHaveAttribute('x', '0');

		mockData.values!.value = 12;
		const { container: containerMax } = render(<SvgScale data={mockData} type='default' />);
		const rectMax = containerMax.querySelector('rect[id="default-scale-indicator"]');
		expect(rectMax).toHaveAttribute('x', '179');
	});

	it('should handle an empty colors array without throwing an error', () => {
		const mockData: ScaleReturn = {
			values: { value: 3, level: '1', color: '#0000ff' },
			colors: [],
		};
		const { container } = render(<SvgScale data={mockData} type='default' />);
		expect(container.querySelector('svg')).toBeInTheDocument();
		expect(container.querySelector('linearGradient')).toBeInTheDocument();
		expect(container.querySelector('rect')).toBeInTheDocument();
		expect(container.querySelector('use')).toBeInTheDocument();
	});

	it('should apply the correct gradient ID based on the type prop', () => {
		const mockData: ScaleReturn = {
			values: { value: 3, level: '1', color: '#0000ff' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='customType' />);
		const linearGradient = container.querySelector('linearGradient');
		expect(linearGradient).toHaveAttribute('id', 'customType-gradient');
	});

	it('should render gradient stops correctly for a given colors array', () => {
		const mockData: ScaleReturn = {
			values: { value: 3, level: '1', color: '#0000ff' },
			colors: ['#ff0000', '#00ff00', '#0000ff'],
		};
		const { container } = render(<SvgScale data={mockData} type='default' />);
		const stops = container.querySelectorAll('stop');
		expect(stops).toHaveLength(mockData.colors.length);
		expect(stops[0]).toHaveAttribute('stop-color', '#ff0000');
		expect(stops[1]).toHaveAttribute('stop-color', '#00ff00');
		expect(stops[2]).toHaveAttribute('stop-color', '#0000ff');
	});
});
