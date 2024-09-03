import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PrecipitationDynamicIcon from './PrecipitationDynamicIcon';

describe('Precipitation icon', () => {
	test('should render the correct number of particles for iconCode "10"', () => {
		const { container } = render(<PrecipitationDynamicIcon iconCode='10' />);
		const particleLines = container.querySelectorAll('line');
		expect(particleLines.length).toBe(15);
	});

	test('should render the correct number of particles for iconCode "11"', () => {
		const { container } = render(<PrecipitationDynamicIcon iconCode='11' />);
		const particleLines = container.querySelectorAll('line');
		expect(particleLines.length).toBe(15);
	});

	test('should render the correct particle length for iconCode "10"', () => {
		const { container } = render(<PrecipitationDynamicIcon iconCode='10' />);
		const particles = container.querySelectorAll('line');
		const particleLength = Array.from(particles).map((particle) => {
			const y1 = parseFloat(particle.getAttribute('y1') || '');
			const y2 = parseFloat(particle.getAttribute('y2') || '');
			return y2 - y1;
		});
		expect(particleLength.every((length) => length === 2)).toBe(true);
	});

	test('should render the correct particle length for iconCode "11"', () => {
		const { container } = render(<PrecipitationDynamicIcon iconCode='11' />);
		const particles = container.querySelectorAll('line');
		const particleLength = Array.from(particles).map((particle) => {
			const y1 = parseFloat(particle.getAttribute('y1') || '');
			const y2 = parseFloat(particle.getAttribute('y2') || '');
			return y2 - y1;
		});
		expect(particleLength.every((length) => length === 4)).toBe(true);
	});
});
