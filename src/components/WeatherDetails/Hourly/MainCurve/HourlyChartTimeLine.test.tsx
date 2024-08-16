import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { TimeLineCoords } from '../../../../utils/services/curves/types';
import HourlyChartTimeLine from './HourlyChartTimeLine';

describe('HourlyChartTimeLine', () => {
	test('should return null when the data prop is undefined', () => {
		const { container } = render(
			<HourlyChartTimeLine data={undefined as unknown as TimeLineCoords[]} />
		);
		expect(container.firstChild).toBeNull();
	});

	test('should return null when the data prop is null', () => {
		const { container } = render(
			<HourlyChartTimeLine data={null as unknown as TimeLineCoords[]} />
		);
		expect(container.firstChild).toBeNull();
	});

	test('should return null when the data prop is an empty array', () => {
		const { container } = render(<HourlyChartTimeLine data={[]} />);
		expect(container.firstChild).toBeNull();
	});

	test('should render the correct number of text elements based on the length of the data array', () => {
		const mockData: TimeLineCoords[] = [
			{ x: 10, y: 20, time: '12:00' },
			{ x: 30, y: 40, time: '14:00' },
			{ x: 50, y: 60, time: '16:00' },
		];

		const { getAllByRole } = render(<HourlyChartTimeLine data={mockData} />);

		const textElements = getAllByRole('definition');
		expect(textElements).toHaveLength(mockData.length);
	});

	test('should render text elements with the correct x, y coordinates based on the data', () => {
		const mockData: TimeLineCoords[] = [
			{ x: 10, y: 20, time: '12:00' },
			{ x: 30, y: 40, time: '14:00' },
			{ x: 50, y: 60, time: '16:00' },
		];

		const { getAllByRole } = render(<HourlyChartTimeLine data={mockData} />);

		const textElements = getAllByRole('definition');
		textElements.forEach((element, index) => {
			const { x, y } = mockData[index];
			expect(element).toHaveAttribute('x', x.toString());
			expect(element).toHaveAttribute('y', y.toString());
		});
	});

	test('should render text elements with the correct time value based on the data', () => {
		const mockData: TimeLineCoords[] = [
			{ x: 10, y: 20, time: '12:00' },
			{ x: 30, y: 40, time: '14:00' },
			{ x: 50, y: 60, time: '16:00' },
		];

		const { getAllByRole } = render(<HourlyChartTimeLine data={mockData} />);

		const textElements = getAllByRole('definition');
		textElements.forEach((element, index) => {
			expect(element).toHaveTextContent(mockData[index].time);
		});
	});

	test('should handle large data sets without performance issues', () => {
		const largeDataSet: TimeLineCoords[] = Array.from({ length: 1000 }, (_, index) => ({
			x: index * 10,
			y: index * 20,
			time: `${index}:00`,
		}));

		const { getAllByRole } = render(<HourlyChartTimeLine data={largeDataSet} />);

		const textElements = getAllByRole('definition');
		expect(textElements).toHaveLength(largeDataSet.length);

		const startTime = performance.now();
		render(<HourlyChartTimeLine data={largeDataSet} />);
		const endTime = performance.now();

		const renderDuration = endTime - startTime;
		expect(renderDuration).toBeLessThan(100); // Adjust the threshold as needed
	});
});
