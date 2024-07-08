/**
 * Represents the type for daily scale configuration.
 */
export type DailyScaleType = {
	/** The width of the line representing the scale. */
	lineWidth: number;
	/** The minimum temperature value on the scale. */
	minTemp: number;
	/** The maximum temperature value on the scale. */
	maxTemp: number;
};

/**
 * Calculates the coordinate on a daily temperature scale for a given temperature value.
 *
 * @param lineWidth - The width of the line representing the scale.
 * @param minTemp - The minimum temperature value on the scale.
 * @param maxTemp - The maximum temperature value on the scale.
 * @param value - The temperature value for which to calculate the coordinate.
 * @returns The coordinate on the scale corresponding to the given temperature value.
 */
export const getDailyScaleCoords = (
	lineWidth: number,
	minTemp: number,
	maxTemp: number,
	value: number,
): number => {
	const scaleStep = lineWidth / (maxTemp - minTemp);

	return (value - minTemp) * scaleStep;
};
