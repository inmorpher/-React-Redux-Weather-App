/**
 * Represents the definition of scale data.
 */
export type ScaleDataDefinition = {
	value: number;
	level: string;
	color: string;
};

/**
 * Represents the return type of the getSvgScale function.
 */
export type ScaleReturn = {
	colors: Array<string>;
	values?: ScaleDataDefinition;
};

/**
 * Enum for the types of scales.
 */
export enum ScaleType {
	aqi = 'aqi',
	uvi = 'uvi',
}

/**
 * Array of colors used for UVI scale.
 */
const uviColors: Array<string> = [
	'#3FD125',
	'#30CC14',
	'#B9CB13',
	'#EAC811',
	'#EA9911',
	'#EA7211',
	'#E84E13',
	'#E70F12',
	'#D80D10',
	'#EB0D65',
	'#EA0C93',
	'#F00A90',
];

/**
 * Array of colors used for AQI scale.
 */
const aqiColors: Array<string> = ['#0080FF', '#00FF00', '#FFFF00', '#FFA500', '#E70F12'];

/**
 * Array of AQI scale data definitions.
 */
const aqiData: Array<ScaleDataDefinition> = [
	{ value: 1, level: 'good', color: aqiColors[0] },
	{ value: 2, level: 'moderate', color: aqiColors[1] },
	{ value: 3, level: 'moderate', color: aqiColors[2] },
	{ value: 4, level: 'unhealthy', color: aqiColors[3] },
	{ value: 5, level: 'very unhealthy', color: aqiColors[4] },
];

/**
 * Array of UVI scale data definitions.
 */
const uviData: Array<ScaleDataDefinition> = [
	{ value: 0, level: 'low', color: uviColors[0] },
	{ value: 1, level: 'low', color: uviColors[1] },
	{ value: 2, level: 'low', color: uviColors[2] },
	{ value: 3, level: 'moderate', color: uviColors[3] },
	{ value: 4, level: 'moderate', color: uviColors[4] },
	{ value: 5, level: 'moderate', color: uviColors[5] },
	{ value: 6, level: 'high', color: uviColors[6] },
	{ value: 7, level: 'high', color: uviColors[7] },
	{ value: 8, level: 'very high', color: uviColors[8] },
	{ value: 9, level: 'very high', color: uviColors[9] },
	{ value: 10, level: 'very high', color: uviColors[10] },
	{ value: 11, level: 'extreme', color: uviColors[11] },
];

/**
 * Retrieves the scale data and colors based on the provided scale type and value.
 *
 * @param {ScaleType} scaleType - The type of scale (AQI or UVI).
 * @param {number} value - The value to find the corresponding scale data.
 * @returns {ScaleReturn} An object containing:
 * - `colors`: An array of color strings corresponding to the scale type.
 * - `values`: An optional object of type `ScaleDataDefinition` containing:
 *   - `value`: The numeric value of the scale.
 *   - `level`: The level description of the scale.
 *   - `color`: The color associated with the scale value.
 */
export const getSvgScale = (scaleType: ScaleType, value: number): ScaleReturn => {
	const data = scaleType === ScaleType.aqi ? aqiData : uviData;

	return {
		colors: scaleType === ScaleType.aqi ? aqiColors : uviColors,
		values: data.find((elem) => elem.value === Math.round(value)),
	};
};
