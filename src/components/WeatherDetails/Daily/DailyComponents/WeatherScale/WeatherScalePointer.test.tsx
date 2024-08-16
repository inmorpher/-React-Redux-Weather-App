import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { MetricReturnType } from '../../../../../utils/services/converter/metric.converter';
import WeatherScalePointer from './WeatherScalePointer';
import usePopupWeatherScale from './usePopupWeatherScale';

vi.mock('./usePopupWeatherScale', () => ({
	default: vi.fn(),
}));

describe('WeatherScalePointer', () => {
	test('should render the pointer elements correctly when state.pointerVisibility is true and propsParseResult is successful', () => {
		const mockCurveRef = {
			current: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
		};
		const mockData = [{ value: 25, units: '°C' }];

		const mockState = {
			pointerVisibility: true,
			pointer: { x: 50, y: 100 },
			pointerTempriture: '25°C',
			pointerTime: '12:00 PM',
		};

		(usePopupWeatherScale as MockedFunction<typeof usePopupWeatherScale>).mockReturnValue({
			state: mockState,
			pointerOnCurveMoveHandler: vi.fn(),
			pointerOnCurveIn: vi.fn(),
			pointerOnCurveOut: vi.fn(),
		});

		const { getByText, container } = render(
			<WeatherScalePointer curve={mockCurveRef} data={mockData} />
		);

		const temperatureText = getByText('25°C');
		const timeText = getByText('12:00 PM');
		const circleElement = container.querySelector('circle');
		const lineElement = container.querySelector('line');

		expect(temperatureText).toBeInTheDocument();
		expect(timeText).toBeInTheDocument();
		expect(circleElement).toBeInTheDocument();
		expect(lineElement).toBeInTheDocument();
	});

	test('should not render the pointer elements when state.pointerVisibility is false', () => {
		const mockCurveRef = {
			current: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
		};
		const mockData = [{ value: 25, units: '°C' }];

		const mockState = {
			pointerVisibility: false,
			pointer: { x: 50, y: 100 },
			pointerTempriture: '25°C',
			pointerTime: '12:00 PM',
		};

		(usePopupWeatherScale as MockedFunction<typeof usePopupWeatherScale>).mockReturnValue({
			state: mockState,
			pointerOnCurveMoveHandler: vi.fn(),
			pointerOnCurveIn: vi.fn(),
			pointerOnCurveOut: vi.fn(),
		});

		const { queryByText, container } = render(
			<WeatherScalePointer curve={mockCurveRef} data={mockData} />
		);

		const temperatureText = queryByText('25°C');
		const timeText = queryByText('12:00 PM');
		const circleElement = container.querySelector('circle');
		const lineElement = container.querySelector('line');

		expect(temperatureText).not.toBeInTheDocument();
		expect(timeText).not.toBeInTheDocument();
		expect(circleElement).not.toBeInTheDocument();
		expect(lineElement).not.toBeInTheDocument();
	});

	test('should not render the pointer elements when propsParseResult is unsuccessful', () => {
		// const mockCurveRef = {
		// 	current: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
		// };
		const mockData = [{ value: 25, units: '°C' }];

		const mockState = {
			pointerVisibility: true,
			pointer: { x: 50, y: 100 },
			pointerTempriture: '25°C',
			pointerTime: '12:00 PM',
		};

		(usePopupWeatherScale as MockedFunction<typeof usePopupWeatherScale>).mockReturnValue({
			state: mockState,
			pointerOnCurveMoveHandler: vi.fn(),
			pointerOnCurveIn: vi.fn(),
			pointerOnCurveOut: vi.fn(),
		});

		const { queryByText, container } = render(
			<WeatherScalePointer
				curve={null as unknown as React.RefObject<SVGPathElement>}
				data={mockData}
			/>
		);

		const temperatureText = queryByText('25°C');
		const timeText = queryByText('12:00 PM');
		const circleElement = container.querySelector('circle');
		const lineElement = container.querySelector('line');

		expect(temperatureText).not.toBeInTheDocument();
		expect(timeText).not.toBeInTheDocument();
		expect(circleElement).not.toBeInTheDocument();
		expect(lineElement).not.toBeInTheDocument();
	});

	// test('should call pointerOnCurveMoveHandler on mouse move event over the rect element', () => {
	// 	const mockCurveRef = {
	// 		current: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
	// 	};
	// 	const mockData = [{ value: 25, units: '°C' }];

	// 	const mockPointerOnCurveMoveHandler = vi.fn();

	// 	const mockState = {
	// 		pointerVisibility: true,
	// 		pointer: { x: 50, y: 100 },
	// 		pointerTempriture: '25°C',
	// 		pointerTime: '12:00 PM',
	// 	};

	// 	(usePopupWeatherScale as MockedFunction<typeof usePopupWeatherScale>).mockReturnValue({
	// 		state: mockState,
	// 		pointerOnCurveMoveHandler: mockPointerOnCurveMoveHandler,
	// 		pointerOnCurveIn: vi.fn(),
	// 		pointerOnCurveOut: vi.fn(),
	// 	});

	// 	const { getByRole } = render(<WeatherScalePointer curve={mockCurveRef} data={mockData} />);

	// 	const rectElement = getByRole('presentation');
	// 	rectElement.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));

	// 	expect(mockPointerOnCurveMoveHandler).toHaveBeenCalled();
	// });

	// ... (rest of the imports and setup)

	test('should handle null values in the curve and data props without throwing errors', () => {
		const mockCurveRef = null;
		const mockData = null;

		const { container } = render(
			<WeatherScalePointer
				curve={mockCurveRef as unknown as React.RefObject<SVGPathElement>}
				data={mockData as unknown as MetricReturnType[]}
			/>
		);

		const pointerGroup = container.querySelector('g[data-popup="popup-pointer"]');
		expect(pointerGroup).toBeInTheDocument();

		const textElement = container.querySelector('text');
		expect(textElement).not.toBeInTheDocument();

		const circleElement = container.querySelector('circle');
		expect(circleElement).not.toBeInTheDocument();

		const lineElement = container.querySelector('line');
		expect(lineElement).not.toBeInTheDocument();

		const rectElement = container.querySelector('rect');
		expect(rectElement).toBeInTheDocument();
	});
});
