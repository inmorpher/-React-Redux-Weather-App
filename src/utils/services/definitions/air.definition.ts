type AqiDefinition = {
	aqi: number;
	value: string;
	color: string;
};

type AqiReturn = {
	colors: Array<string>;
	values?: AqiDefinition;
};

const colorRange: Array<string> = [];

const aqiRanges: Array<AqiDefinition> = [
	{ aqi: 1, value: 'good', color: colorRange[0] },
	{ aqi: 2, value: 'moderate', color: colorRange[1] },
	{ aqi: 3, value: 'moderate', color: colorRange[2] },
	{ aqi: 4, value: 'unhealthy', color: colorRange[3] },
	{ aqi: 5, value: 'very unhealthy', color: colorRange[4] },
];

/**
 * Determines the Air Quality Index (AQI) status based on the provided AQI value.
 *
 * @param aqi - The Air Quality Index value to evaluate.
 *              This should be a number representing the AQI level.
 *
 * @returns An object containing:
 *          - colors: An array of strings representing the color range for AQI levels.
 *          - values: An AqiDefinition object matching the rounded AQI value, or undefined if no match is found.
 *                    This object includes the AQI level, a descriptive value, and a corresponding color.
 */
export const getAqiStatus = (aqi: number): AqiReturn => {
	return {
		colors: colorRange,
		values: aqiRanges.find((elem) => elem.aqi === Math.round(aqi)),
	};
};
