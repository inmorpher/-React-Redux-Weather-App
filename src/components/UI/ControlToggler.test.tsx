import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ControlToggler from './ControlToggler';

describe('ControlToggler component', () => {
	it('should render the button with the light theme icon on the left when variant is "theme" and theme is "light"', () => {
		const { getByAltText } = render(<ControlToggler variant='theme' theme='light' />);
		const lightThemeIcon = getByAltText('light theme icon');
		expect(lightThemeIcon).toBeInTheDocument();
		expect(lightThemeIcon).toHaveClass('scale-100');
		expect(lightThemeIcon).not.toHaveClass('scale-50 opacity-50');
	});

	it('should render the button with the dark theme icon on the right when variant is "theme" and theme is "dark"', () => {
		const { getByAltText } = render(<ControlToggler variant='theme' theme='dark' />);
		const darkThemeIcon = getByAltText('dark theme icon');
		expect(darkThemeIcon).toBeInTheDocument();
		expect(darkThemeIcon).toHaveClass('scale-100 opacity-100');
		expect(darkThemeIcon).not.toHaveClass('scale-50 opacity-50');
	});

	it("should render the button with the Fahrenheit icon on the left when variant is 'metric' and units is 'imperial'", () => {
		const { getByAltText } = render(<ControlToggler variant='metric' units='imperial' />);
		const fahrenheitIcon = getByAltText('Fahrenheit icon');
		expect(fahrenheitIcon).toBeInTheDocument();
		expect(fahrenheitIcon).toHaveClass('scale-100');
		expect(fahrenheitIcon).not.toHaveClass('scale-50 opacity-50');
	});

	it("should render the button with the Celsius icon on the right when variant is 'metric' and units is 'metric'", () => {
		const { getByAltText } = render(<ControlToggler variant='metric' units='metric' />);
		const celsiusIcon = getByAltText('Celsius icon');
		expect(celsiusIcon).toBeInTheDocument();
		expect(celsiusIcon).toHaveClass('scale-100 opacity-100');
		expect(celsiusIcon).not.toHaveClass('scale-50 opacity-50');
	});
});
