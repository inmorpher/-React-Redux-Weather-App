import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { tempColors, tempData } from '../../../utils/services/definitions/daily.temp.definition';
import { DailyColors } from './DailyColors';

describe('DailyColors', () => {
	test('should render an SVG element with hidden visibility', () => {
		const { container } = render(<DailyColors colors={tempData} />);
		const svgElement = container.querySelector('svg');

		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveStyle({ visibility: 'hidden' });
	});

	test('should create a linear gradient with the correct ID', () => {
		const { container } = render(<DailyColors colors={tempData} />);
		const linearGradientElement = container.querySelector('linearGradient');

		expect(linearGradientElement).toBeInTheDocument();
		expect(linearGradientElement).toHaveAttribute('id', 'temp-color-scale');
	});
	test('should render the correct number of stop elements based on the colors array length', () => {
		const testColors = [
			{
				min: 0,
				max: 273.15,
				level: 'extremely cold',
				color: tempColors[0],
			},
			{
				min: 0,
				max: 273.15,
				level: 'extremely cold',
				color: tempColors[0],
			},
			{
				min: 0,
				max: 273.15,
				level: 'extremely cold',
				color: tempColors[0],
			},
		];
		const { container } = render(<DailyColors colors={testColors} />);
		const stopElements = container.querySelectorAll('stop');

		expect(stopElements).toHaveLength(testColors.length);
	});

	test('should set the correct offset attribute for each stop element', () => {
		const testColors = [
			{ min: 0, max: 273.15, level: 'extremely cold', color: tempColors[0] },
			{ min: 273.15, max: 283.15, level: 'cold', color: tempColors[1] },
			{ min: 283.15, max: 293.15, level: 'cool', color: tempColors[2] },
		];
		const { container } = render(<DailyColors colors={testColors} />);
		const stopElements = container.querySelectorAll('stop');

		expect(stopElements).toHaveLength(testColors.length);
		stopElements.forEach((stopElement, index) => {
			const expectedOffset = `${(index * 100) / (testColors.length - 1)}%`;
			expect(stopElement).toHaveAttribute('offset', expectedOffset);
		});
	});
	test('should set the correct stopColor attribute for each stop element', () => {
		const testColors = [
			{ min: 0, max: 273.15, level: 'extremely cold', color: '#0000ff' },
			{ min: 273.15, max: 283.15, level: 'cold', color: '#00ff00' },
			{ min: 283.15, max: 293.15, level: 'cool', color: '#ff0000' },
		];
		const { container } = render(<DailyColors colors={testColors} />);
		const stopElements = container.querySelectorAll('stop');

		expect(stopElements).toHaveLength(testColors.length);
		stopElements.forEach((stopElement, index) => {
			expect(stopElement).toHaveAttribute('stop-color', testColors[index].color);
		});
	});

	test('should handle an empty colors array without errors', () => {
		const { container } = render(<DailyColors colors={[]} />);
		const svgElement = container.querySelector('svg');
		const linearGradientElement = container.querySelector('linearGradient');
		const stopElements = container.querySelectorAll('stop');

		expect(svgElement).toBeInTheDocument();
		expect(linearGradientElement).toBeInTheDocument();
		expect(stopElements).toHaveLength(0);
	});
});
