import { useLayoutEffect, useRef } from 'react';
import { selectSunPosition } from '../store/slices/weatherApiSlice';
import { useFetchState } from './useFetchState';

/**
 * Custom hook to manage and calculate the sun's position on an SVG path.
 *
 * This hook fetches the sun position data and updates the position of an indicator
 * on an SVG path based on the sun's cycle duration and the time since the cycle started.
 *
 * @returns {Object} An object containing:
 * - `pathRef`: A reference to the SVG path element.
 * - `indicatorRef`: A reference to the SVG circle element used as an indicator.
 * - `status`: The status of the fetch operation.
 * - `data`: An object containing sun-related data such as sunrise, sunset, cycle duration, and whether it is day or night.
 */
export const useSunPosition = () => {
	const { status, data: sunData } = useFetchState(selectSunPosition);
	const pathRef = useRef<SVGPathElement>(null);
	const indicatorRef = useRef<SVGCircleElement>(null);

	useLayoutEffect(() => {
		if (!pathRef.current || !indicatorRef.current || !sunData || status.isLoading) return;
		const { cycleDuration, timeSinceCycleStart } = sunData;
		const length = pathRef.current.getTotalLength();
		const point = pathRef.current.getPointAtLength(
			(length * timeSinceCycleStart) / cycleDuration,
		);

		indicatorRef.current.setAttribute('cx', point.x + 'px');
		indicatorRef.current.setAttribute('cy', point.y + 'px');
	}, [status.isLoading, sunData]);

	return {
		pathRef,
		indicatorRef,
		status,
		data:
			{
				sunrise: sunData?.sunrise,
				sunset: sunData?.sunset,
				range: sunData?.cycleDuration || 0,
				isDay: sunData?.isDay,
			} || undefined,
	};
};
