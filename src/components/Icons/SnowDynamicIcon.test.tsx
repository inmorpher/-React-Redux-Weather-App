import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import SnowDynamicIcon from './SnowDynamicIcon';

describe('SnowDynamicIcon', () => {
	test('should render the SVG element with the correct class names', () => {
		const { getByTestId } = render(<SnowDynamicIcon />);
		expect(getByTestId('snow-dynamic-icon')).toBeInTheDocument();
	});

	test('should render 30 circle elements within the SVG', () => {
		const { container } = render(<SnowDynamicIcon />);
		const circleElements = container.querySelectorAll('circle');
		expect(circleElements).toHaveLength(30);
	});
});
