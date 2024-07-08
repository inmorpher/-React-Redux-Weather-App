type SunDefinitionReturn = {
	cycleDuration: number;
	timeSinceCycleStart: number;
	isDay: boolean;
};

const SECONDS_IN_A_DAY = 86400;

/**
 * Defines the current sun cycle status based on the provided timestamps.
 *
 * This function calculates whether it is currently day or night, the duration of the current sun cycle (day or night),
 * and the time elapsed since the start of this cycle, based on the sunrise and sunset times, and the current time.
 *
 * @param sunRise The timestamp for sunrise in seconds.
 * @param sunSet The timestamp for sunset in seconds.
 * @param dt The current timestamp in seconds.
 * @returns An object containing:
 * - `cycleDuration`: The duration of the current cycle (day or night) in seconds.
 * - `timeSinceCycleStart`: The time elapsed since the start of the current cycle in seconds.
 * - `isDay`: A boolean indicating if it is currently day (true) or night (false).
 */

export const sunDefinition = (sunRise: number, sunSet: number, dt: number): SunDefinitionReturn => {
	const isDay = dt >= sunRise && dt <= sunSet;
	let cycleDuration: number;
	let timeSinceCycleStart: number;

	if (isDay) {
		cycleDuration = sunSet - sunRise;
		timeSinceCycleStart = dt - sunRise;
		return { cycleDuration, timeSinceCycleStart, isDay };
	}

	const nextSunRise = sunRise + SECONDS_IN_A_DAY;
	const prevSunSet = sunSet - SECONDS_IN_A_DAY;
	cycleDuration = dt > sunSet ? nextSunRise - sunSet : sunRise - prevSunSet;
	timeSinceCycleStart = dt > sunSet ? dt - sunSet : dt - prevSunSet;

	return { cycleDuration, timeSinceCycleStart, isDay };
};
