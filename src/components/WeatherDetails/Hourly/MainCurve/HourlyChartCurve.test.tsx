import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import HourlyChartCurve from './HourlyChartCurve';

describe('HourlyChartCurve', () => {
	test('should render the SVG path with the provided curvePath prop', () => {
		const curvePath = 'M10 50 C 20 20, 40 20, 50 50';
		const { getByTestId } = render(<HourlyChartCurve curvePath={curvePath} />);

		const pathElement = getByTestId('hourly-curve').querySelector('path');
		expect(pathElement).toBeInTheDocument();
		expect(pathElement).toHaveAttribute('d', curvePath);
	});
});
