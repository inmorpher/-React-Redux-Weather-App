import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PrecipitationRectDesc } from '../../../../utils/services/curves/types';
import HourlyPrecipitationDescription from './HourlyPrecipitationDescription';

describe('HourlyPrecipitationDescription', () => {
	test('should return null when precipitationDescription prop is undefined', () => {
		const { container } = render(
			<HourlyPrecipitationDescription precipitationDescription={undefined} />
		);
		expect(container.firstChild).toBeNull();
	});

	test('should return null when precipitationDescription prop is an empty array', () => {
		const { container } = render(<HourlyPrecipitationDescription precipitationDescription={[]} />);
		expect(container.firstChild).toBeNull();
	});

	test('should render two tspan elements when precipitationDescription has one item with both pop and rain values', () => {
		const mockPrecipitationDescription: PrecipitationRectDesc[] = [
			{
				pop: '80%',
				popX: 100,
				popY: 200,
				rain: 2.5,
				rainX: 100,
				rainY: 210,
			},
		];

		const { getAllByText } = render(
			<HourlyPrecipitationDescription precipitationDescription={mockPrecipitationDescription} />
		);

		const popElement = getAllByText('80%');
		const rainElement = getAllByText('2.5mm');

		expect(popElement).toHaveLength(1);
		expect(rainElement).toHaveLength(1);
	});

	test('should render the correct number of text elements based on the length of the precipitationDescription array', () => {
		const mockPrecipitationDescription: PrecipitationRectDesc[] = [
			{
				pop: '80%',
				popX: 100,
				popY: 200,
				rain: 2.5,
				rainX: 100,
				rainY: 210,
			},
			{
				pop: '60%',
				popX: 200,
				popY: 300,
				rain: 1.2,
				rainX: 200,
				rainY: 310,
			},
		];

		const { getAllByRole } = render(
			<HourlyPrecipitationDescription precipitationDescription={mockPrecipitationDescription} />
		);

		const popElement = getAllByRole('definition', { name: 'possibility of precipitation' });
		const rainElement = getAllByRole('definition', { name: 'rain definition' });
		expect(popElement).toHaveLength(mockPrecipitationDescription.length);
		expect(rainElement).toHaveLength(mockPrecipitationDescription.length);
	});

	test('should render the correct pop and rain values for each item in the precipitationDescription array', () => {
		const mockPrecipitationDescription: PrecipitationRectDesc[] = [
			{
				pop: '80%',
				popX: 100,
				popY: 200,
				rain: 2.5,
				rainX: 100,
				rainY: 210,
			},
			{
				pop: '60%',
				popX: 200,
				popY: 300,
				rain: 1.2,
				rainX: 200,
				rainY: 310,
			},
		];

		const { getAllByRole } = render(
			<HourlyPrecipitationDescription precipitationDescription={mockPrecipitationDescription} />
		);

		mockPrecipitationDescription.forEach((item, index) => {
			const popElement = getAllByRole('definition', { name: 'possibility of precipitation' })[
				index
			];
			const rainElement = getAllByRole('definition', { name: 'rain definition' })[index];

			expect(popElement).toHaveTextContent(item.pop);
			expect(rainElement).toHaveTextContent(item.rain + 'mm');
		});
	});

	test('should render the correct x and y coordinates for each text element based on the popX and popY values in the precipitationDescription array', () => {
		const mockPrecipitationDescription: PrecipitationRectDesc[] = [
			{
				pop: '80%',
				popX: 100,
				popY: 200,
				rain: 2.5,
				rainX: 100,
				rainY: 210,
			},
			{
				pop: '60%',
				popX: 300,
				popY: 400,
				rain: 1.2,
				rainX: 300,
				rainY: 410,
			},
		];

		const { getAllByRole } = render(
			<HourlyPrecipitationDescription precipitationDescription={mockPrecipitationDescription} />
		);

		const popElements = getAllByRole('definition', {
			name: /possibility of precipitation/i,
		});

		const rainElements = getAllByRole('definition', {
			name: /rain definition/i,
		});

		popElements.forEach((textElement, index) => {
			const item = mockPrecipitationDescription[index];
			expect(textElement).toHaveAttribute('x', item.popX.toString());
		});

		rainElements.forEach((textElement, index) => {
			const item = mockPrecipitationDescription[index];
			expect(textElement).toHaveAttribute('x', item.rainX.toString());
			expect(textElement).toHaveAttribute('dy', '-10');
		});
	});

	test('should handle large values for pop and rain without causing any visual issues', () => {
		const mockPrecipitationDescription: PrecipitationRectDesc[] = [
			{
				pop: '100%',
				popX: 100,
				popY: 200,
				rain: 100,
				rainX: 100,
				rainY: 210,
			},
		];

		const { getByText } = render(
			<HourlyPrecipitationDescription precipitationDescription={mockPrecipitationDescription} />
		);

		const popElement = getByText('100%');
		const rainElement = getByText('100mm');

		expect(popElement).toBeInTheDocument();
		expect(rainElement).toBeInTheDocument();

		const popTspanElement = popElement.parentElement?.firstChild;
		const rainTspanElement = rainElement.parentElement?.lastChild;

		expect(popTspanElement).toHaveAttribute('x', '100');
		expect(rainTspanElement).toHaveAttribute('x', '100');
		expect(rainTspanElement).toHaveAttribute('dy', '-10');
	});

	test('should handle negative values for pop and rain without causing any visual issues', () => {
		const mockPrecipitationDescription: PrecipitationRectDesc[] = [
			{
				pop: '-20%',
				popX: 100,
				popY: 200,
				rain: -5,
				rainX: 100,
				rainY: 210,
			},
		];

		const { getByText } = render(
			<HourlyPrecipitationDescription precipitationDescription={mockPrecipitationDescription} />
		);

		const popElement = getByText('-20%');
		const rainElement = getByText('-5mm');

		expect(popElement).toBeInTheDocument();
		expect(rainElement).toBeInTheDocument();

		const popTspanElement = popElement.parentElement?.firstChild;
		const rainTspanElement = rainElement.parentElement?.lastChild;

		expect(popTspanElement).toHaveAttribute('x', '100');
		expect(rainTspanElement).toHaveAttribute('x', '100');
		expect(rainTspanElement).toHaveAttribute('dy', '-10');
	});

	test('should render correctly when the precipitationDescription array contains duplicate items', () => {
		const mockPrecipitationDescription: PrecipitationRectDesc[] = [
			{
				pop: '80%',
				popX: 100,
				popY: 200,
				rain: 2.5,
				rainX: 100,
				rainY: 210,
			},
			{
				pop: '80%',
				popX: 100,
				popY: 200,
				rain: 2.5,
				rainX: 100,
				rainY: 210,
			},
		];

		const { getAllByText } = render(
			<HourlyPrecipitationDescription precipitationDescription={mockPrecipitationDescription} />
		);

		const popElements = getAllByText('80%');
		const rainElements = getAllByText('2.5mm');

		expect(popElements).toHaveLength(2);
		expect(rainElements).toHaveLength(2);

		popElements.forEach((textElement, index) => {
			const item = mockPrecipitationDescription[index];
			expect(textElement.parentElement).toHaveAttribute('x', item.popX.toString());
			expect(textElement.parentElement).toHaveAttribute('y', (item.popY + 10).toString());
		});

		rainElements.forEach((textElement, index) => {
			const item = mockPrecipitationDescription[index];
			expect(textElement.parentElement?.lastChild).toHaveAttribute('x', item.popX.toString());
			expect(textElement.parentElement?.lastChild).toHaveAttribute('dy', '-10');
		});
	});
});
