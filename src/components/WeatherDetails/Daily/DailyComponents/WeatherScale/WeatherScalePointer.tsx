import React from 'react';
import { MetricReturnType } from '../../../../../utils/services/converter/metric.converter';
import usePopupWeatherScale from './usePopupWeatherScale';

type WeatherScaleProps = {
	curve: React.RefObject<SVGPathElement>;
	data: Array<MetricReturnType>;
};
const WeatherScalePointer = ({ curve, data }: WeatherScaleProps) => {
	const { state, pointerOnCurveMoveHandler, pointerOnCurveIn, pointerOnCurveOut } =
		usePopupWeatherScale(curve, data);

	return (
		<g data-popup='popup-pointer'>
			{state.pointerVisibility && (
				<g>
					<text
						x={state.pointer.x}
						y={15}
						fill='#fff'
						fontSize='.6rem'
						fontWeight='700'
						dominantBaseline='bottom'
						textAnchor='middle'
					>
						{state.pointerTempriture}

						<tspan x={state.pointer.x} dy={10} fontWeight={300} fontSize={'.4rem'}>
							{state.pointerTime}
						</tspan>
					</text>
					<circle cx={state.pointer.x} cy={state.pointer.y} r='5' fill='#fff' />
					<line
						x1={state.pointer.x}
						y1={30}
						x2={state.pointer.x}
						y2={140}
						stroke='#fff'
						strokeWidth={0.5}
						strokeLinecap='round'
					/>
				</g>
			)}

			<rect
				x={0}
				y={0}
				height={160}
				width={320}
				fill='none'
				stroke='none'
				onMouseMove={(event) => pointerOnCurveMoveHandler(event)}
				onTouchMove={(event) => pointerOnCurveMoveHandler(event)}
				onMouseEnter={(event) => pointerOnCurveIn(event)}
				onMouseLeave={(event) => pointerOnCurveOut(event)}
				onTouchStart={(event) => pointerOnCurveIn(event)}
				onTouchEnd={(event) => pointerOnCurveOut(event)}
				pointerEvents={'all'}
			/>
		</g>
	);
};

export default WeatherScalePointer;
