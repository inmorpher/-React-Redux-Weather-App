import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ScaleCoords } from '../../../utils/services/curves/types';
import Scale from './HourlyScale';

describe('Scale', () => {
	test('should render an SVG element with text elements when provided with valid scaleMarks data', () => {
		const mockScaleMarks: ScaleCoords[] = [
			{ pY: 50, value: 0, units: '°C' },
			{ pY: 100, value: 10, units: '°C' },
			{ pY: 150, value: 20, units: '°C' },
		];

		const { container } = render(<Scale scaleMarks={mockScaleMarks} />);

		const svgElement = container.querySelector('svg');
		expect(svgElement).toBeInTheDocument();

		const textElements = container.querySelectorAll('text');
		expect(textElements).toHaveLength(mockScaleMarks.length);

		mockScaleMarks.forEach((mark, index) => {
			const textElement = textElements[index];
			expect(textElement).toHaveAttribute('x', '15');
			expect(textElement).toHaveAttribute('y', mark.pY.toString());
			expect(textElement).toHaveAttribute('fill', '#fff');
			expect(textElement).toHaveAttribute('font-size', '.7rem');
			expect(textElement).toHaveAttribute('font-weight', '700');
			expect(textElement).toHaveAttribute('dominant-baseline', 'middle');
			expect(textElement).toHaveAttribute('text-anchor', 'middle');
			expect(textElement).toHaveTextContent(`${mark.value}${mark.units}`);
		});
	});

	test('should return null when scaleMarks prop is an empty array', () => {
		const { container } = render(<Scale scaleMarks={[]} />);
		expect(container).toBeEmptyDOMElement();
	});
});
