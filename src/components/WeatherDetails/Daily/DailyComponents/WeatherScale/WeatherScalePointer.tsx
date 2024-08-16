import { RefObject } from 'react';
import { z } from 'zod';
import { MetricReturnType } from '../../../../../utils/services/converter/metric.converter';
import usePopupWeatherScale from './usePopupWeatherScale';

const WeatherScalePropsSchema = z.object({
	curve: z.custom<RefObject<SVGPathElement>>(
		(val) => val !== null && typeof val === 'object' && 'current' in val
	),
	data: z.array(z.custom<MetricReturnType>()),
});

type WeatherScaleProps = z.infer<typeof WeatherScalePropsSchema>;

const WeatherScalePointer = ({ curve, data }: WeatherScaleProps) => {
	const propsParseResult = WeatherScalePropsSchema.safeParse({ curve, data });
	const hookResult = usePopupWeatherScale(curve, data);
	const { state, pointerOnCurveMoveHandler, pointerOnCurveIn, pointerOnCurveOut } =
		hookResult ?? {};

	return (
		<svg>
			<g data-popup='popup-pointer'>
				{state?.pointerVisibility && propsParseResult.success && (
					<g>
						<text
							x={state.pointer?.x ?? 0}
							y={15}
							fill='#fff'
							fontSize='.6rem'
							fontWeight='700'
							dominantBaseline='bottom'
							textAnchor='middle'
						>
							{state.pointerTempriture ?? ''}
							<tspan x={state.pointer?.x ?? 0} dy={10} fontWeight={300} fontSize={'.4rem'}>
								{state.pointerTime ?? ''}
							</tspan>
						</text>
						<circle cx={state.pointer?.x ?? 0} cy={state.pointer?.y ?? 0} r='5' fill='#fff' />
						<line
							x1={state.pointer?.x ?? 0}
							y1={30}
							x2={state.pointer?.x ?? 0}
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
					onMouseMove={pointerOnCurveMoveHandler ?? undefined}
					onTouchMove={pointerOnCurveMoveHandler ?? undefined}
					onMouseEnter={pointerOnCurveIn ?? undefined}
					onMouseLeave={pointerOnCurveOut ?? undefined}
					onTouchStart={pointerOnCurveIn ?? undefined}
					onTouchEnd={pointerOnCurveOut ?? undefined}
					pointerEvents={'all'}
					role='presentation'
				/>
			</g>
		</svg>
	);
};

export default WeatherScalePointer;
