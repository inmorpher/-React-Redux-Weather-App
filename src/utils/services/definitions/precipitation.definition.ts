export type PrecipitationDesc = {
	min: number;
	max: number;
	color: string;
};

const precipitationColors: Array<string> = ['#caf0f8', '#90e0ef', '#00b4d8', '#0077b6', '#191BB3'];

const precipitationRanges: Array<PrecipitationDesc> = [
	{ min: 0, max: 0, color: precipitationColors[0] },
	{ min: 0.01, max: 2.5, color: precipitationColors[1] },
	{ min: 2.51, max: 5, color: precipitationColors[2] },
	{ min: 5.01, max: 7.5, color: precipitationColors[3] },
	{ min: 7.51, max: 50, color: precipitationColors[4] },
];

/**
 * Retrieves precipitation color ranges based on the given precipitation value.
 *
 * This function filters the predefined precipitation ranges and returns all ranges
 * where the given value is greater than or equal to the minimum value of the range.
 *
 * @param value - The precipitation value in millimeters (mm) to compare against the ranges.
 * @returns An array of PrecipitationDesc objects representing the matching precipitation ranges.
 *          Each object contains the minimum and maximum values for the range and the associated color.
 */
export const getPrecipitationColors = (value: number) => {
	if (typeof value !== 'number' || value === Infinity) {
		return [];
	}
	return precipitationRanges.filter((range) => value >= range.min);
};
