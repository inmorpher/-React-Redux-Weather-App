import React, { useRef } from 'react';
import { useDaily } from '../../../../../hooks/useDaily';
import { useFetchState } from '../../../../../hooks/useFetchState';
import { selectDailyPopupScale } from '../../../../../store/slices/weatherApiSlice';
import WeatherScalePointer from './WeatherScalePointer';

const WeatherScale = () => {
	const { dailyState } = useDaily();
	const daily = useFetchState(() => selectDailyPopupScale(dailyState.item));

	const curveRef = useRef<SVGPathElement>(null);

	return (
		<div className='mt-2 flex justify-center'>
			<svg viewBox='0 0 320 160' className='bg-weather-gradient w-[90%] rounded-lg'>
				{scale.map((item, index) => (
					<React.Fragment key={'PopupLayout' + index}>
						<line
							key={'PopupScaleLine' + index}
							x1={15}
							y1={item.pY - 2.5}
							x2={300}
							y2={item.pY - 2.5}
							stroke='white'
							strokeDasharray={2}
							strokeDashoffset={10}
							strokeWidth={0.1}
						/>

						<text
							key={'popupDesc' + index}
							x={10}
							y={item.pY}
							fill='#fff'
							fontSize='.4rem'
							fontWeight='300'
							dominantBaseline='bottom'
							textAnchor='middle'
						>
							{item.value}
							{item.units}
						</text>
						<text
							key={'PopupText' + index}
							x={desc[index].x}
							y={desc[index].y}
							fill='#fff'
							fontSize='.4rem'
							fontWeight='300'
							dominantBaseline='top'
							textAnchor='middle'
						>
							{desc[index].value}
						</text>
						<line
							key={'popupHorizontalLine' + index}
							x1={desc[index].x}
							y1={30}
							x2={desc[index].x}
							y2={140}
							stroke='white'
							strokeWidth={0.1}
						/>
					</React.Fragment>
				))}

				<path
					ref={curveRef}
					d={curve.mainCurve}
					stroke='#fff'
					fill='none'
					strokeWidth={2.5}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<WeatherScalePointer curve={curveRef} data={data} />
			</svg>
		</div>
	);
};

export default WeatherScale;
