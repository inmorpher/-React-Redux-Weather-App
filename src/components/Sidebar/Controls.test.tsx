import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Controls from './Controls';

const mockToggleTheme = jest.fn();
const mockToggleMetric = jest.fn();
const mockUseTheme = {
	toggleTheme: mockToggleTheme,
	mode: 'light',
};
const mockUseMetric = {
	toggleMetric: mockToggleMetric,
	metricType: 'Celsius',
};

jest.mock('../../context/Theme.context', () => ({
	useTheme: () => mockUseTheme,
}));

jest.mock('../../context/Metric.context', () => ({
	useMetric: () => mockUseMetric,
}));

describe('Controls component', () => {
	// Unit tests would go here
	it('should render the Controls component without crashing', () => {
		const { getByRole } = render(<Controls />);
		const controlsWrapper = getByRole('controls-wrapper');
		expect(controlsWrapper).toBeInTheDocument();
	});

	it('should correctly toggle the metric type when the metric toggler is clicked', () => {
		const { getByRole } = render(<Controls />);
		const metricToggler = getByRole('button-metric');
		metricToggler.click();
		expect(mockToggleMetric).toHaveBeenCalled();
	});
	it('should correctly toggle the theme mode when the theme toggler is clicked', () => {
		const { getByRole } = render(<Controls />);
		const themeToggler = getByRole('button-theme');
		themeToggler.click();
		expect(mockToggleTheme).toHaveBeenCalled();
	});
});
