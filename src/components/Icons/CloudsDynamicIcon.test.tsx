import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CloudsDynamicIcon from './CloudsDynamicIcon';

describe('CloudsDynamicIcon', () => {
	test('should render the correct icon based on the provided iconCode prop', () => {
		const { getByTestId, rerender } = render(<CloudsDynamicIcon iconCode='03' />);
		const iconElement = getByTestId('clouds-dynamic-icon');

		expect(iconElement).toBeInTheDocument();
		expect(iconElement.querySelector('path:nth-child(1)')).toHaveAttribute('fill', '#f7f7f7');
		expect(iconElement.querySelector('path:nth-child(2)')).toHaveAttribute('fill', '#f2f2f2');
		expect(iconElement.querySelector('path:nth-child(3)')).toHaveAttribute('fill', '#e9e9e9');

		rerender(<CloudsDynamicIcon iconCode='04' />);

		expect(iconElement.querySelector('path:nth-child(1)')).toHaveAttribute('fill', '#afafaf');
		expect(iconElement.querySelector('path:nth-child(2)')).toHaveAttribute('fill', '#5f5f5f');
		expect(iconElement.querySelector('path:nth-child(3)')).toHaveAttribute('fill', '#838383');
	});

	test('should handle empty or invalid iconCode values gracefully', () => {
		const { rerender, getByTestId } = render(<CloudsDynamicIcon iconCode='' />);
		const iconElement = getByTestId('clouds-dynamic-icon');

		expect(iconElement.querySelector('path:nth-child(1)')).toHaveAttribute('fill', '#afafaf');
		expect(iconElement.querySelector('path:nth-child(2)')).toHaveAttribute('fill', '#5f5f5f');
		expect(iconElement.querySelector('path:nth-child(3)')).toHaveAttribute('fill', '#838383');

		rerender(<CloudsDynamicIcon iconCode='invalid' />);

		expect(iconElement.querySelector('path:nth-child(1)')).toHaveAttribute('fill', '#afafaf');
		expect(iconElement.querySelector('path:nth-child(2)')).toHaveAttribute('fill', '#5f5f5f');
		expect(iconElement.querySelector('path:nth-child(3)')).toHaveAttribute('fill', '#838383');
	});
});
