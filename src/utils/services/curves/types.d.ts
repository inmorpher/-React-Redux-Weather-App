// export type Curve<T> = T extends HourlyWeatherData ? HourlyWeatherData : PrecipitationData;
export type Curve<T> = T extends HourlyWeatherData[] | PrecipitationData[] | PopupWeatherScale[]
	? T
	: never;

export type TimeLineCoords = {
	time: string;
	description?: string;
	x: number;
	y: number;
	y2?: number;
};

export type CurveType = {
	mainCurve: string;
	backPathCurve?: string;
};
/**
 * Represents the properties of an axis in a chart or graph.
 *
 * @type {AxisType}
 * @property {number} y - The y-coordinate of the axis origin.
 * @property {number} value - The numerical value at the axis origin.
 * @property {number} length - The length of the axis, typically representing the range of values.
 */
export type AxisType = {
	y: number;
	value: number;
	length: number;
};

export type DataCoords = {
	x: number;
	y: number;
	value?: number;
};

export type RectCoords = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export type PrecipitationData = {
	dt: number;
	precipitation: number;
	dimension?: { width: number; height: number };
};

export type PrecipitationRectDesc = {
	rain?: number;
	rainX: number;
	rainY: number;
	pop: string;
	popX: number;
	popY: number;
};

export type HourlyWeatherData = {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point?: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust?: number;
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	pop: number;
	rain?: {
		'1h': number;
	};
};

export type ScaleCoords = {
	value: number;
	units: string | undefined;
	pX?: number;
	pY: number;
};

export type WeatherDescription = {
	value: string[];
	pX: number;
	pY: number;
};

export type PopupWeatherScale = {
	eve: number;
	night: number;
	day: number;
	morn: number;
	nextNight: number;
};

export type PopupHoverRect = {
	x: number;
	width: number;
	height: number;
};
