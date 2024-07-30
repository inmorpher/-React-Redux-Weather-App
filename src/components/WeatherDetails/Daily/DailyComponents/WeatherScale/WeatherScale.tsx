import { useRef } from 'react';
import { useSelectedDayIndex } from '../../../../../hooks/useDaily';

import React from 'react';
import { useGetDailyScale } from '../../../../../context/WeatherData.context';
import { IDailyScale } from '../../../../../context/WeatherData.types';
import withLoading from '../../../../UI/WithLoading';
import DailyWeatherScale from './DailyWeatherScale';
import WeatherScalePointer from './WeatherScalePointer';

/**
 * Renders a weather scale component with temperature curve, scale, and descriptions.
 *
 * @param {Object} props - The component props.
 * @param {IDailyScale} props.data - The daily scale data.
 * @param {Object} props.data.temperatureCurve - The temperature curve data.
 * @param {Array} props.data.temperatureScale - The temperature scale data.
 * @param {Array} props.data.scaleDescriptions - The scale descriptions data.
 * @param {Array} props.data.expandedTemperatureData - The expanded temperature data.
 * @returns {JSX.Element} The rendered WeatherScale component.
 */
const WeatherScale = ({
	data: { temperatureCurve, temperatureScale, scaleDescriptions, expandedTemperatureData },
}: {
	data: IDailyScale;
}) => {
	const curveRef = useRef<SVGPathElement>(null);

	return (
		<DailyWeatherScale>
			<DailyWeatherScale.SVGWrapper
				viewBox='0 0 320 160'
				className='bg-weather-gradient w-[90%] rounded-lg'
			>
				{temperatureScale.map((item, index) => (
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
							x={scaleDescriptions[index].x}
							y={scaleDescriptions[index].y}
							fill='#fff'
							fontSize='.4rem'
							fontWeight='300'
							dominantBaseline='top'
							textAnchor='middle'
						>
							{scaleDescriptions[index].value}
						</DailyWeatherScale.Text>
						<DailyWeatherScale.Line
							key={'popupHorizontalLine' + index}
							x1={scaleDescriptions[index].x}
							y1={30}
							x2={scaleDescriptions[index].x}
							y2={140}
							stroke='white'
							strokeWidth={0.1}
						/>
					</React.Fragment>
				))}

				<DailyWeatherScale.Curve
					ref={curveRef}
					d={temperatureCurve.mainCurve}
					stroke='#fff'
					fill='none'
					strokeWidth={2.5}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<WeatherScalePointer curve={curveRef} data={expandedTemperatureData} />
			</DailyWeatherScale.SVGWrapper>
		</DailyWeatherScale>
	);
};

export default withLoading<{}, IDailyScale>(WeatherScale, () =>
	useGetDailyScale(useSelectedDayIndex())
);
