import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Skeleton from './Skeleton';

it('should render Skeleton component without crashing', () => {
	render(<Skeleton />);
	const skeletonElement = screen.getByRole('loader');
	expect(skeletonElement).toBeInTheDocument();
});

it('should render Skeleton component without crashing', () => {
	render(<Skeleton />);
	const skeletonElement = screen.getByRole('loader');
	expect(skeletonElement).toBeInTheDocument();
});

it('should render a div element with the correct class names', () => {
	render(<Skeleton />);
	const skeletonElement = screen.getByRole('loader');
	expect(skeletonElement).toHaveClass(
		'w-[95%] h-[95%] bg-weather-bg-900 rounded-lg animate-pulse m-2'
	);
});

it('should apply the "w-[95%]" class to the div element', () => {
	render(<Skeleton />);
	const skeletonElement = screen.getByRole('loader');
	expect(skeletonElement).toHaveClass('w-[95%]');
});

it('should apply the "rounded-lg" class to the div element', () => {
	render(<Skeleton />);
	const skeletonElement = screen.getByRole('loader');
	expect(skeletonElement).toHaveClass('rounded-lg');
});

it("should apply the 'bg-weather-bg-900' class to the div element", () => {
	render(<Skeleton />);
	const skeletonElement = screen.getByRole('loader');
	expect(skeletonElement).toHaveClass('bg-weather-bg-900');
});

it('should apply the animate-pulse class to the div element', () => {
	render(<Skeleton />);
	const skeletonElement = screen.getByRole('loader');
	expect(skeletonElement).toHaveClass('animate-pulse');
});
