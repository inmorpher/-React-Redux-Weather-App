import { render } from '@testing-library/react';
import HourlyWeatherDescription from './HourlyWeatherDescription';

describe('HourlyWeatherDescription', () => {
	test('should return null when the weatherDescription prop is an empty array', () => {
		const { container } = render(<HourlyWeatherDescription weatherDescription={[]} />);
		expect(container.firstChild).toBeNull();
	});

	test('should return null when the weatherDescription prop is not provided', () => {
		const { container } = render(<HourlyWeatherDescription weatherDescription={undefined} />);
		expect(container.firstChild).toBeNull();
	});
});
