/**
 * Represents the visibility range with a minimum and maximum distance, and a descriptive value.
 */
type VisibilityRange = {
	max: number; // The maximum distance (inclusive) for this visibility range.
	min: number; // The minimum distance (inclusive) for this visibility range.
	value: string; // The descriptive value of the visibility range.
};

/**
 * Represents the return structure for visibility information, including the range description and distance.
 */
type ReturnVisibility = {
	range: string; // The descriptive range of visibility.
	distance: string; // The distance, formatted as a string with appropriate units (meters or kilometers).
};

/**
 * An array of `VisibilityRange` objects defining various visibility conditions by distance.
 */
const visibilityRanges: Array<VisibilityRange> = [
	{ max: 10000, min: 9000, value: 'clear' },
	{ max: 8999, min: 4000, value: 'light haze' },
	{ max: 3999, min: 2000, value: 'haze' },
	{ max: 1999, min: 1000, value: 'thin fog' },
	{ max: 999, min: 500, value: 'light fog' },
	{ max: 499, min: 200, value: 'moderate fog' },
	{ max: 199, min: 50, value: 'thick fog' },
	{ max: 49, min: 0, value: 'dense fog' },
];

/**
 * Determines the visibility range and distance based on a given value.
 *
 * @param value The distance value to evaluate, in meters.
 * @returns An object of type `ReturnVisibility` containing the visibility range and formatted distance.
 */
export const getVisibilityValue = (value: number): ReturnVisibility => {
	const range = visibilityRanges.find((range) => value >= range.min && value <= range.max);
	const distance = value >= 1000 ? parseFloat((value / 1000).toFixed(1)) + 'km' : value + 'm';
	return {
		range: range ? range.value : 'not available',
		distance,
	};
};
