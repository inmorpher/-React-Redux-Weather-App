import { useLayoutEffect, useRef } from 'react';
import { ISunPosition } from '../context/WeatherData.types';

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
export const useSunPosition = (data: ISunPosition) => {
	const pathRef = useRef<SVGPathElement>(null);
	const indicatorRef = useRef<SVGCircleElement>(null);

	useLayoutEffect(() => {
		if (!pathRef.current || !indicatorRef.current || !data) return;
		const { cycleDuration, timeSinceCycleStart } = data;
		if (!cycleDuration || !timeSinceCycleStart) return;
		const length = pathRef.current.getTotalLength();
		const point = pathRef.current.getPointAtLength((length * timeSinceCycleStart) / cycleDuration);

		indicatorRef.current.setAttribute('cx', point.x + 'px');
		indicatorRef.current.setAttribute('cy', point.y + 'px');
	}, [data.cycleDuration, data.timeSinceCycleStart]);

	return {
		data,
		pathRef,
		indicatorRef,
	};
};
