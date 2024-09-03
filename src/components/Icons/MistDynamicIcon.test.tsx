import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MistDynamicIcon from './MistDynamicIcon';

describe('MistDynamicIcon', () => {
	test('should render the SVG element correctly', () => {
		const { getByTestId, container } = render(<MistDynamicIcon />);
		const svgElement = getByTestId('mist-dynamic-icon');
		expect(svgElement).toBeInTheDocument();

		const circleElements = container.querySelectorAll('circle');
		expect(circleElements).toHaveLength(8);
		const cx = [12.92, 19.84, 27.73, 35.59, 41.21, 31.48, 23.11, 18.66];
		const cy = [23.82, 19.11, 21.76, 19.73, 28.68, 31.05, 33.26, 28.02];
		const r = [6.56, 6.92, 6.92, 7.25, 5.61, 6.28, 6.28, 6.28];
		circleElements.forEach((circle, index) => {
			expect(circle).toHaveAttribute('fill', '#b8b9b9');
			expect(circle).toHaveAttribute('cx', String(cx[index]));
			expect(circle).toHaveAttribute('cy', String(cy[index]));
			expect(circle).toHaveAttribute('r', String(r[index]));
		});
	});

	test('should render the correct number of circle elements inside the "g" element', () => {
		const { container } = render(<MistDynamicIcon />);
		const gElement = container.querySelector('g');
		expect(gElement).toBeInTheDocument();

		const circleElements = gElement?.querySelectorAll('circle');
		expect(circleElements).toHaveLength(8);
	});
});
