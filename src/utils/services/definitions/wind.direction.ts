/**
 * Determines the wind direction based on a given wind value.
 *
 * This function calculates the wind direction by dividing the wind value by 45 and using the remainder
 * to index into an array of direction objects. Each direction object contains both a short and a full
 * description of the wind direction (e.g., 'N' for North, 'NE' for North-east, etc.). The function can
 * return either the short or full description based on the `type` parameter.
 *
 * @param {number} windValue - The wind value in degrees, where 0 degrees represents North.
 * @param {'full' | 'short'} type - The type of description to return ('full' for full description, 'short' for short description). Defaults to 'short'.
 * @returns {string} The wind direction as a string, either in its short or full form depending on the `type` parameter.
 */
export const getWindDirection = (windValue: number, type: 'full' | 'short' = 'short'): string => {
	const directions = [
		{
			short: 'N',
			full: 'North',
		},
		{
			short: 'NE',
			full: 'North-east',
		},
		{
			short: 'E',
			full: 'East',
		},
		{
			short: 'SE',
			full: 'South-east',
		},
		{
			short: 'S',
			full: 'South',
		},
		{
			short: 'SW',
			full: 'South-west',
		},
		{
			short: 'W',
			full: 'West',
		},
		{
			short: 'NW',
			full: 'North-west',
		},
	];

	const index = Math.round(windValue / 45) % 8;

	return type === 'short' ? directions[index].short : directions[index].full;
};
