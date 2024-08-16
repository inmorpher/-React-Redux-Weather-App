import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import HourlyPrecipitationRects from './HourlyPrecipitationRects';
describe('HourlyPrecipitationRects', () => {
	test('should return null when precipitationRectangles prop is undefined', () => {
		const { container } = render(<HourlyPrecipitationRects precipitationRectangles={undefined} />);
		expect(container).toBeEmptyDOMElement();
	});

	test('should return null when precipitationRectangles prop is an empty array', () => {
		const { container } = render(<HourlyPrecipitationRects precipitationRectangles={[]} />);
		expect(container).toBeEmptyDOMElement();
	});

	test('should render a <rect> element for each item in precipitationRectangles array', () => {
		const mockPrecipitationRectangles = [
			{ x: 100, y: 200, width: 20, height: 30 },
			{ x: 150, y: 180, width: 10, height: 40 },
			{ x: 200, y: 220, width: 15, height: 10 },
		];

		const { getAllByTestId } = render(
			<HourlyPrecipitationRects precipitationRectangles={mockPrecipitationRectangles} />
		);

		const rectElements = getAllByTestId('rect');
		expect(rectElements.length).toBe(mockPrecipitationRectangles.length);
		mockPrecipitationRectangles.forEach((rect, index) => {
			const rectElement = rectElements[index];
			expect(rectElement).toHaveAttribute('x', `${rect.x - 10}`);
			expect(rectElement).toHaveAttribute('y', `${rect.y + 10}`);
			expect(rectElement).toHaveAttribute('width', `${rect.width}`);
			expect(rectElement).toHaveAttribute('height', `${rect.height}`);
			expect(rectElement).toHaveAttribute('fill', 'url(#rectGrad)');
			expect(rectElement).toHaveAttribute('ry', '5px');
			expect(rectElement).toHaveAttribute('rx', '5px');
		});
	});

	test('should skip rendering a <rect> element if its height is 0', () => {
		const mockPrecipitationRectangles = [
			{ x: 100, y: 200, width: 20, height: 30 },
			{ x: 150, y: 180, width: 10, height: 0 },
			{ x: 200, y: 220, width: 15, height: 10 },
		];

		const { queryAllByTestId } = render(
			<HourlyPrecipitationRects precipitationRectangles={mockPrecipitationRectangles} />
		);

		const rectElements = queryAllByTestId('rect');
		expect(rectElements.length).toBe(2);
		expect(rectElements[0]).toHaveAttribute('height', '30');
		expect(rectElements[1]).toHaveAttribute('height', '10');
	});

	test('should set the correct x, y, width, height, fill, ry, and rx properties on each <rect> element', () => {
		const mockPrecipitationRectangles = [
			{ x: 100, y: 200, width: 20, height: 30 },
			{ x: 150, y: 180, width: 10, height: 40 },
			{ x: 200, y: 220, width: 15, height: 10 },
		];

		const { getAllByTestId } = render(
			<HourlyPrecipitationRects precipitationRectangles={mockPrecipitationRectangles} />
		);

		const rectElements = getAllByTestId('rect');
		expect(rectElements.length).toBe(mockPrecipitationRectangles.length);

		mockPrecipitationRectangles.forEach((rect, index) => {
			const rectElement = rectElements[index];
			expect(rectElement).toHaveAttribute('x', `${rect.x - 10}`);
			expect(rectElement).toHaveAttribute('y', `${rect.y + 10}`);
			expect(rectElement).toHaveAttribute('width', `${rect.width}`);
			expect(rectElement).toHaveAttribute('height', `${rect.height}`);
			expect(rectElement).toHaveAttribute('fill', 'url(#rectGrad)');
			expect(rectElement).toHaveAttribute('ry', '5px');
			expect(rectElement).toHaveAttribute('rx', '5px');
		});
	});

	test('should handle precipitationRectangles array with a single item correctly', () => {
		const mockPrecipitationRectangles = [{ x: 100, y: 200, width: 20, height: 30 }];

		const { getByTestId } = render(
			<HourlyPrecipitationRects precipitationRectangles={mockPrecipitationRectangles} />
		);

		const rectElement = getByTestId('rect');
		expect(rectElement).toHaveAttribute('x', '90');
		expect(rectElement).toHaveAttribute('y', '210');
		expect(rectElement).toHaveAttribute('width', '20');
		expect(rectElement).toHaveAttribute('height', '30');
		expect(rectElement).toHaveAttribute('fill', 'url(#rectGrad)');
		expect(rectElement).toHaveAttribute('ry', '5px');
		expect(rectElement).toHaveAttribute('rx', '5px');
	});

	test('should handle precipitationRectangles array with large values correctly', () => {
		const mockPrecipitationRectangles = [
			{ x: 10000, y: 20000, width: 2000, height: 3000 },
			{ x: 15000, y: 18000, width: 1000, height: 4000 },
			{ x: 20000, y: 22000, width: 1500, height: 1000 },
		];

		const { getAllByTestId } = render(
			<HourlyPrecipitationRects precipitationRectangles={mockPrecipitationRectangles} />
		);

		const rectElements = getAllByTestId('rect');
		expect(rectElements.length).toBe(mockPrecipitationRectangles.length);

		mockPrecipitationRectangles.forEach((rect, index) => {
			const rectElement = rectElements[index];
			expect(rectElement).toHaveAttribute('x', `${rect.x - 10}`);
			expect(rectElement).toHaveAttribute('y', `${rect.y + 10}`);
			expect(rectElement).toHaveAttribute('width', `${rect.width}`);
			expect(rectElement).toHaveAttribute('height', `${rect.height}`);
			expect(rectElement).toHaveAttribute('fill', 'url(#rectGrad)');
			expect(rectElement).toHaveAttribute('ry', '5px');
			expect(rectElement).toHaveAttribute('rx', '5px');
		});
	});
});
