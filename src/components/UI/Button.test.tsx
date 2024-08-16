import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Button from './Button.tsx';
describe('Button Component', () => {
	test('should apply the "default" variant class when no variant is specified', () => {
		const { container } = render(<Button size='medium' />);
		const button = container.querySelector('button');
		expect(button).toHaveClass('bg-center bg-no-repeat transition-all hover:opacity-100');
	});

	test('should apply the "search" variant class and change to "close" class when active', () => {
		const { container, rerender } = render(<Button size='medium' variant='search' />);
		let button = container.querySelector('button');
		expect(button).toHaveClass('bg-search-btn opacity-50');

		rerender(<Button size='medium' variant='search' className='active' />);
		button = container.querySelector('button');
		expect(button).toHaveClass('bg-search-btn');
	});
});
