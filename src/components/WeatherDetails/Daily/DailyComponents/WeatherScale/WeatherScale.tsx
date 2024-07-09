import { useRef } from 'react';
import { useDaily } from '../../../../../hooks/useDaily';
import { useFetchState } from '../../../../../hooks/useFetchState';

import React from 'react';
import { selectDailyPopupScale } from '../../../../../store/slices/weatherApiSlice';
import Skeleton from '../../../../UI/SkeletonLoader/Skeleton';
import DailyWeatherScale from './DailyWeatherScale';
import WeatherScalePointer from './WeatherScalePointer';

const WeatherScale = () => {
	const { dailyState } = useDaily();
	const {
		status: { isError, isLoading, isSuccess },
		data: data2,
	} = useFetchState(selectDailyPopupScale, dailyState.item);

	if (isLoading) return <Skeleton />;

	if (isError || !isSuccess || !data2) return null;

	const { scale, curve, desc, data, hoverRect } = data2;
	const curveRef = useRef<SVGPathElement>(null);

	return (
		<DailyWeatherScale>
			<DailyWeatherScale.SVGWrapper
				viewBox='0 0 320 160'
				className='bg-weather-gradient w-[90%] rounded-lg'
			>
				{scale.map((item, index) => (
					<React.Fragment key={'PopupLayout' + index}>
						<DailyWeatherScale.Line
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

						<DailyWeatherScale.Text
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
						</DailyWeatherScale.Text>

						<DailyWeatherScale.Text
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
						</DailyWeatherScale.Text>
						<DailyWeatherScale.Line
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

				<DailyWeatherScale.Curve
					ref={curveRef}
					d={curve.mainCurve}
					stroke='#fff'
					fill='none'
					strokeWidth={2.5}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<WeatherScalePointer curve={curveRef} data={data} />
			</DailyWeatherScale.SVGWrapper>
		</DailyWeatherScale>
	);
};

export default WeatherScale;
