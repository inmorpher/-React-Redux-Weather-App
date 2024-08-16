import React, { useRef } from 'react';
import { z } from 'zod';
import { useGetDailyScale } from '../../../../../context/WeatherData.context';
import { useSelectedDayIndex } from '../../../../../hooks/useDaily';
import DailyWeatherScale from './DailyWeatherScale';
import WeatherScalePointer from './WeatherScalePointer';

// Define Zod schemas
const TemperatureCurveSchema = z.object({
	mainCurve: z.string(),
});

const TemperatureScaleItemSchema = z.object({
	pY: z.number(),
	value: z.number(),
	units: z.string(),
});

const ScaleDescriptionSchema = z.object({
	x: z.number(),
	y: z.number(),
	value: z.string(),
});

const ExpandedTemperatureDataSchema = z.object({
	value: z.number(),
	units: z.string(),
});

const DailyScaleSchema = z.object({
	temperatureCurve: TemperatureCurveSchema,
	temperatureScale: z.array(TemperatureScaleItemSchema),
	scaleDescriptions: z.array(ScaleDescriptionSchema),
	expandedTemperatureData: z.array(ExpandedTemperatureDataSchema),
});

const WeatherScale = () => {
	const selectedDayIndex = useSelectedDayIndex();
	const rawDailyScale = useGetDailyScale(selectedDayIndex) || {};

	const parsedForecast = DailyScaleSchema.safeParse(rawDailyScale);
	const validatedData = parsedForecast.success ? parsedForecast.data : null;

	const curveRef = useRef<SVGPathElement>(null);
	const isScale = parsedForecast.success && validatedData;
	return (
		<DailyWeatherScale>
			<DailyWeatherScale.SVGWrapper
				viewBox='0 0 320 160'
				className='bg-weather-gradient w-[90%] rounded-lg'
			>
				{isScale && (
					<>
						{validatedData.temperatureScale.map((item, index) => (
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
									x={validatedData.scaleDescriptions[index]?.x ?? 0}
									y={validatedData.scaleDescriptions[index]?.y ?? 0}
									fill='#fff'
									fontSize='.4rem'
									fontWeight='300'
									dominantBaseline='top'
									textAnchor='middle'
								>
									{validatedData.scaleDescriptions[index]?.value ?? 'N/A'}
								</DailyWeatherScale.Text>
								<DailyWeatherScale.Line
									key={'popupHorizontalLine' + index}
									x1={validatedData.scaleDescriptions[index]?.x ?? 0}
									y1={30}
									x2={validatedData.scaleDescriptions[index]?.x ?? 0}
									y2={140}
									stroke='white'
									strokeWidth={0.1}
								/>
							</React.Fragment>
						))}
						<DailyWeatherScale.Curve
							ref={curveRef}
							d={validatedData.temperatureCurve?.mainCurve ?? ''}
							stroke='#fff'
							fill='none'
							strokeWidth={2.5}
							strokeLinecap='round'
							strokeLinejoin='round'
							data-testid='main-curve'
						/>
						<WeatherScalePointer curve={curveRef} data={validatedData.expandedTemperatureData} />
					</>
				)}
			</DailyWeatherScale.SVGWrapper>
		</DailyWeatherScale>
	);
};

export default WeatherScale;
