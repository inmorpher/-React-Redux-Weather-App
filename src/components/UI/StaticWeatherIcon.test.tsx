import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import StaticWeatherIcon, { iconCodes } from './StaticWeatherIcon.tsx';

describe('StaticWeatherIcon', () => {
	test('should render an icon with the correct src and alt attributes for a valid icon code', () => {
		const { getByAltText } = render(<StaticWeatherIcon icon='01d' />);

		const imgElement = getByAltText('clear sky') as HTMLImageElement;
		expect(imgElement).toBeInTheDocument();
		expect(imgElement.src).toContain('/icons/static/conditions/01d.svg');
		expect(imgElement.alt).toBe('clear sky');
	});
	test('should return null and log a warning when an invalid icon code is provided', () => {
		const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const { container } = render(<StaticWeatherIcon icon='invalid_code' />);

		expect(container.firstChild).toBeNull();
		expect(consoleWarnSpy).toHaveBeenCalledWith(
			'The icon code "invalid_code" is not defined in the iconCodes object.'
		);
		consoleWarnSpy.mockRestore();
	});

	test('should apply the default variant and size when none are specified', () => {
		const { getByAltText } = render(<StaticWeatherIcon icon='01d' />);

		const imgElement = getByAltText('clear sky') as HTMLImageElement;
		expect(imgElement).toHaveClass('w-5 h-5');
	});

	test('should apply the "medium" size variant when specified', () => {
		const { getByAltText } = render(<StaticWeatherIcon icon='01d' size='medium' />);

		const imgElement = getByAltText('clear sky') as HTMLImageElement;
		expect(imgElement).toHaveClass('w-6 h-6');
	});

	test('should apply the "small" size variant when specified', () => {
		const { getByAltText } = render(<StaticWeatherIcon icon='01d' size='small' />);

		const imgElement = getByAltText('clear sky') as HTMLImageElement;
		expect(imgElement).toHaveClass('w-5 h-5');
	});

	test('should apply the "default" background variant when specified', () => {
		const { getByAltText } = render(<StaticWeatherIcon icon='01d' variant='default' />);

		const imgElement = getByAltText('clear sky') as HTMLImageElement;
		expect(imgElement).toHaveClass('bg-none');
	});

	test('should combine additional class names with the variant class names', () => {
		const { getByAltText } = render(<StaticWeatherIcon icon='01d' className='additional-class' />);

		const imgElement = getByAltText('clear sky') as HTMLImageElement;
		expect(imgElement).toHaveClass('w-5 h-5 additional-class');
	});

	test('should pass through additional HTML attributes to the img element', () => {
		const { getByAltText } = render(<StaticWeatherIcon icon='01d' data-testid='weather-icon' />);

		const imgElement = getByAltText('clear sky') as HTMLImageElement;
		expect(imgElement).toBeInTheDocument();
		expect(imgElement).toHaveAttribute('data-testid', 'weather-icon');
	});

	test('should render different icons based on the provided icon codes', () => {
		const iconCodesToTest = [
			'01d',
			'02d',
			'03d',
			'04d',
			'09d',
			'10d',
			'11d',
			'13d',
			'50d',
			'01n',
			'02n',
			'03n',
			'04n',
			'09n',
			'10n',
			'11n',
			'13n',
			'50n',
		];

		iconCodesToTest.forEach((iconCode) => {
			const { getAllByAltText } = render(<StaticWeatherIcon icon={iconCode} />);
			const imgElements = getAllByAltText(iconCodes[iconCode].alt) as HTMLImageElement[];
			const imgElement = imgElements.find((img) => img.src.includes(iconCodes[iconCode].src));
			expect(imgElement).toBeInTheDocument();
			expect(imgElement?.src).toContain(iconCodes[iconCode].src);
			expect(imgElement?.alt).toBe(iconCodes[iconCode].alt);
		});
	});
});
