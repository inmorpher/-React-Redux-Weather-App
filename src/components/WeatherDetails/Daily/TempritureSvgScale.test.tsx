import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TempritureSvgScale from './TempritureSvgScale';

describe('TempritureSvgScale', () => {
	test('should render an SVG element with a width of 135 and a height of 7', () => {
		const { getByTestId } = render(<TempritureSvgScale />);

		const svgElement = getByTestId('temp-svg-scale') as HTMLElement;

		expect(svgElement).toHaveAttribute('width', '135');
		expect(svgElement).toHaveAttribute('height', '7');
	});
});
