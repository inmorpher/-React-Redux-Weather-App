export type TempColorsDefinition = {
	min: number;
	max: number;
	level: string;
	color: string;
};

export const tempColors: Array<string> = [
	'#2a52be',
	'#007aa5',
	'#30CC14',
	'#ffff31',
	'#EA7211',
	'#E70F12',
];

export const tempData: Array<TempColorsDefinition> = [
	{
		min: 0,
		max: 273.14,
		level: 'extremely cold',
		color: tempColors[0],
	},
	{
		min: 273.15,
		max: 288.14,
		level: 'cold',
		color: tempColors[1],
	},
	{
		min: 288.15,
		max: 293.14,
		level: 'moderate',
		color: tempColors[2],
	},
	{
		min: 293.15,
		max: 298.14,
		level: 'slightly warm',
		color: tempColors[3],
	},
	{
		min: 298.15,
		max: 303.14,
		level: 'warm',
		color: tempColors[4],
	},
	{
		min: 303.15,
		max: 423.14,

		level: 'hot',
		color: tempColors[5],
	},
];

export const getTempritureScale = (minValue: number, maxValue: number) => {
	return tempData.filter((temp) => temp.min <= maxValue && temp.max >= minValue);
};
