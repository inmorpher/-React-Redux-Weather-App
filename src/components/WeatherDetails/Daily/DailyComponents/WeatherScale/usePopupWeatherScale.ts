import { useReducer } from 'react';
import { MetricReturnType } from '../../../../../utils/services/converter/metric.converter';
import { weatherScaleInitialState, weatherScaleReduce } from './WeatherScale.reducer';

type EventType =
	| React.MouseEvent<SVGRectElement, MouseEvent>
	| React.TouchEvent<SVGRectElement>
	| React.MouseEvent<SVGPathElement, MouseEvent>;

const usePopupWeatherScale = (
	curve: React.RefObject<SVGPathElement>,
	data: Array<MetricReturnType>,
) => {
	const [state, dispatch] = useReducer(weatherScaleReduce, weatherScaleInitialState);

	const pointerOnCurveMoveHandler = (event: EventType): void => {
		const curved = curve.current;

		if (!curved) return;

		const totalLength = curved.getTotalLength();
		const svgRect = curved.getBoundingClientRect();
		const viewBox = curved.ownerSVGElement?.getAttribute('viewBox');
		if (!viewBox) return;

		const [vbX, , vbWidth, ,] = viewBox.split(' ').map(Number);

		if (event.defaultPrevented) return;

		const mouseX = 'touches' in event ? event.touches[0].clientX : event.clientX;

		const scaleX = svgRect.width / vbWidth;

		const scaleMouseX = (mouseX - svgRect.left - vbX) / scaleX;

		const point = curved.getPointAtLength((scaleMouseX / vbWidth) * totalLength);

		const isInsideCurveXRange = mouseX >= svgRect.left && mouseX <= svgRect.right;

		if (!isInsideCurveXRange) {
			return;
		}

		const singleElemWidth = vbWidth / data.length;
		const arrayIndex = Math.floor(scaleMouseX / singleElemWidth);

		dispatch({
			type: 'SET_POINTER_VALUES',
			payload: {
				pointer: { x: point.x, y: point.y },
				pointerTempriture: data[arrayIndex].value + data[arrayIndex].units,
				pointerTime: arrayIndex,
			},
		});
	};

	const pointerOnCurveIn = (event: EventType): void => {
		event.preventDefault();
		document.body.style.overflow = 'hidden';
		dispatch({ type: 'SET_POINTER_VISIBILITY', payload: true });
	};
	const pointerOnCurveOut = (event: EventType): void => {
		document.body.style.overflow = '';
		event.preventDefault();
		dispatch({ type: 'SET_POINTER_VISIBILITY', payload: false });
	};
	return { state, pointerOnCurveMoveHandler, pointerOnCurveIn, pointerOnCurveOut };
};

export default usePopupWeatherScale;
