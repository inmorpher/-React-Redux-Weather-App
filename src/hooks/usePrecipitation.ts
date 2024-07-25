import { useLayoutEffect, useRef, useState } from 'react';
import { IPrecipitationInfo } from '../context/WeatherData.types';
import { PrecipitationService } from '../utils/services/curves/precipitation.service';
import { getPrecipitationColors } from '../utils/services/definitions/precipitation.definition';
import { useWindowResize } from './useWindowResize';

export interface IWindowSize {
	width?: number;
	height?: number;
}

/**
 * Custom hook to manage precipitation data and related UI state.
 *
 * @returns {object} An object containing various states and methods related to precipitation data.
 */
export const usePrecipitation = (data: IPrecipitationInfo) => {
	const { minutelyForecast, locationTimezone, hasPrecipitation } = data;

	const wrapperRef = useRef<HTMLDivElement>(null);
	const [isWrapper, setIsWrapper] = useState<boolean>(false);
	const [windowSize, setWindowSize] = useState<IWindowSize>({
		width: 521,
		height: 149,
	});

	/**
	 * Custom hook to handle window resize events.
	 * Updates the window size state based on the wrapper element's dimensions.
	 */
	useWindowResize(() => {
		if (wrapperRef.current) {
			setWindowSize({
				width: wrapperRef.current?.clientWidth,
				height: wrapperRef.current?.clientHeight,
			});
		}
	}, isWrapper);

	/**
	 * Effect hook to set initial window size and wrapper state.
	 */
	useLayoutEffect(() => {
		if (wrapperRef.current) {
			setWindowSize({
				width: wrapperRef.current.clientWidth,
				height: wrapperRef.current.clientHeight,
			});
			setIsWrapper(true);
		}
	}, []);

	const precipitationService = new PrecipitationService(
		minutelyForecast,
		locationTimezone || 'UTC',
		{
			width: windowSize.width || 0,
			height: windowSize.height || 0,
		}
	);
	const curve = precipitationService.drawCurve(true);
	const timeLine = precipitationService.getTimeLine();
	const axis = precipitationService.getAxis();

	const gradientColors = getPrecipitationColors(
		Math.max(...minutelyForecast.map((color) => color.precipitation))
	);

	return {
		isWrapper,
		wrapperRef,
		curve,
		gradientColors,
		timeLine,
		axis,
		dimension: { width: windowSize.width, height: windowSize.height },
		hasPrecipitation,
	};
};
