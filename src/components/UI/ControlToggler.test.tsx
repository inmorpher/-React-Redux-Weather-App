import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe } from 'vitest';
import ControlToggler from './ControlToggler.tsx';
describe('ControlToggler', () => {
	test('should render the button with light theme icon when variant is "theme" and theme is "light"', () => {
		const { getByAltText } = render(<ControlToggler variant='theme' theme='light' />);
		const lightIcon = getByAltText('light theme icon');
		expect(lightIcon).toBeInTheDocument();
		expect(lightIcon).toHaveAttribute('src', '/icons/static/t_light.svg');
	});

	test('should render the button with dark theme icon when variant is "theme" and theme is "dark"', () => {
		const { getByAltText } = render(<ControlToggler variant='theme' theme='dark' />);
		const darkIcon = getByAltText('dark theme icon');
		expect(darkIcon).toBeInTheDocument();
		expect(darkIcon).toHaveAttribute('src', '/icons/static/t_dark.svg');
	});
	test('should render the button with Fahrenheit icon when variant is "metric" and units is "imperial"', () => {
		const { getByAltText } = render(<ControlToggler variant='metric' units='imperial' />);
		const fahrenheitIcon = getByAltText('Fahrenheit icon');
		expect(fahrenheitIcon).toBeInTheDocument();
		expect(fahrenheitIcon).toHaveAttribute('src', '/icons/static/fahrenheit.svg');
	});
	test('should render the button with Celsius icon when variant is "metric" and units is "metric"', () => {
		const { getByAltText } = render(<ControlToggler variant='metric' units='metric' />);
		const celsiusIcon = getByAltText('Celsius icon');
		expect(celsiusIcon).toBeInTheDocument();
		expect(celsiusIcon).toHaveAttribute('src', '/icons/static/celsius.svg');
	});
	test('should default icon layout to "left" when variant is "theme" and theme is not provided', () => {
		const { getByAltText } = render(<ControlToggler variant='theme' />);
		const lightIcon = getByAltText('light theme icon');
		expect(lightIcon).toBeInTheDocument();
		expect(lightIcon).toHaveAttribute('src', '/icons/static/t_light.svg');
	});
	test('should default icon layout to "left" when variant is "metric" and units is not provided', () => {
		const { getByAltText } = render(<ControlToggler variant='metric' />);
		const fahrenheitIcon = getByAltText('Fahrenheit icon');
		expect(fahrenheitIcon).toBeInTheDocument();
		expect(fahrenheitIcon).toHaveAttribute('src', '/icons/static/fahrenheit.svg');
	});
	test('should apply "left" layout class when iconLayout is "left"', () => {
		const { container } = render(<ControlToggler variant='theme' theme='light' />);
		const button = container.querySelector('button');
		expect(button?.firstChild).toHaveClass('before:-left-[2px]');
	});
	test('should apply "right" layout class when iconLayout is "right"', () => {
		const { container } = render(<ControlToggler variant='theme' theme='dark' />);
		const button = container.querySelector('button');
		expect(button?.firstChild).toHaveClass('before:right-0');
	});
	test('should apply transition classes correctly when iconLayout changes from "left" to "right"', () => {
		const { rerender, container } = render(<ControlToggler variant='theme' theme='light' />);
		let button = container.querySelector('button');
		expect(button?.firstChild).toHaveClass('before:-left-[2px]');
		expect(button?.firstChild?.firstChild).toHaveClass('scale-100');
		expect(button?.firstChild?.lastChild).toHaveClass('scale-50 opacity-50');

		rerender(<ControlToggler variant='theme' theme='dark' />);
		button = container.querySelector('button');
		expect(button?.firstChild).toHaveClass('before:right-0');
		expect(button?.firstChild?.firstChild).toHaveClass('scale-50 opacity-50');
		expect(button?.firstChild?.lastChild).toHaveClass('scale-100 opacity-100');
	});
	test('should pass additional button attributes correctly to the rendered button element', () => {
		const { container } = render(
			<ControlToggler
				variant='theme'
				theme='light'
				data-testid='control-toggler'
				aria-label='theme toggler'
			/>
		);
		const button = container.querySelector('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute('data-testid', 'control-toggler');
		expect(button).toHaveAttribute('aria-label', 'theme toggler');
	});
});
