import { UserUnits } from '../../../store/slices/userSlice';
import { MetricConverter } from '../converter/metric.converter';
import { TimeService } from '../time/time.service';
import { SVGChart } from './svgChart.abstract';
import {
	DataCoords,
	HourlyWeatherData,
	PrecipitationRectDesc,
	RectCoords,
	ScaleCoords,
	TimeLineCoords,
	WeatherDescription,
} from './types';

export class HourlyChart extends SVGChart<HourlyWeatherData[]> {
	private minVal = 0;
	private maxVal = 0;
	private metric: UserUnits;
	private chartTop: number;
	private rectCoords: Array<RectCoords> = [];
	private rectBottom = 270;
	constructor(data: HourlyWeatherData[], timezone: string, metric: UserUnits) {
		super(data, 3000, 300);
		this.metric = metric;

		this.timezone = timezone;
		this.curveParams.height = this.chartHeight * 0.5;
		this.chartTop = (this.chartHeight - this.curveParams.height) / 2;
		this.curveParams.bottom = this.curveParams.height + this.chartTop;
		this.curveParams.left = 300;
		this.dataCoords = [];
		this.init();
	}

	/**
	 * Returns the calculated scale for the chart.
	 *
	 * @return An array of objects that contain the properties `value`, `units`, `pX`, and `pY`.
	 */
	getScale(): Array<ScaleCoords> {
		const rangeValue = 4;

		const res = [];

		const yBottom = Math.max(...this.dataCoords.map((item) => item.y));
		const yTop = Math.min(...this.dataCoords.map((item) => item.y));

		const rangeTemp = (this.maxVal - this.minVal) / rangeValue;

		for (let i = 0; i <= rangeValue; i++) {
			const tempValue = MetricConverter.getTemp(this.minVal, this.metric, 'short');
			const value = Math.round(tempValue.value + rangeTemp * i);
			const units = tempValue.units;

			// const pY = this.curveParams.bottom - (this.curveParams.height / rangeValue) * i;
			const pY = yBottom - ((yBottom - yTop) / rangeValue) * i;

			res.push({
				value,
				units,

				pY,
			});
		}

		return res;
	}

	/**
	 * Returns an array of coordinates for each data point on the chart.
	 *
	 * @param data - The data to be displayed on the chart.
	 * @param chartWidth - The width of the chart.
	 * @param curveParams - The parameters for the curve.
	 * @return An array of objects that contain the properties `x` and `y`.
	 */
	private calcCoords(): Array<DataCoords> {
		const CURVE_LEFT = 50;

		this.minVal = Math.min(...this.data.map((elem) => elem.temp));
		this.maxVal = Math.max(...this.data.map((elem) => elem.temp));

		const range = this.maxVal - this.minVal;
		const pixPerStepX = (this.chartWidth - CURVE_LEFT) / this.data.length;
		const pixPerStepY = this.curveParams.height / range;

		return this.data.map((item, index) => ({
			x: CURVE_LEFT + pixPerStepX * index,
			y: this.curveParams.bottom - (item.temp - this.minVal) * pixPerStepY,
		}));
	}

	private calcPrecipitationRects(): Array<RectCoords> {
		const precipitationHeight = this.chartHeight * 0.6;
		const range = precipitationHeight / 100;
		return this.data.map((item, index) => {
			const posX = this.dataCoords[index].x;
			const posY = this.rectBottom - item.pop * 100 * range;
			return {
				x: posX,
				y: posY,
				width: 20,
				height: this.rectBottom - posY,
			};
		});
	}

	/*
		Method returns timestamps in hours format
		@NOTE: Of time == 00 it will return Date and month (Jun 12)

		@return{Array<TimeLineCoords>}: {
			time: string,
			x: number,
			y: number,
		}
	*/
	getTimeLine(): Array<TimeLineCoords> {
		return this.dataCoords.map((item, index) => ({
			time: new TimeService(this.data[index].dt, this.timezone)
				.getTime('hours', true)
				.result(),
			x: item.x,
			y: 12,
		}));
	}

	/*
		Method returns weather condition description in human language (heavy rain, sunny, etc...)
		Breaking description into array of words
		@returns{Array<WeatherDescription>}: {
			value: Array<String>,
			pX: number,
			pY: number,
		}
	*/
	getWeatherDescription(): Array<WeatherDescription> {
		return this.dataCoords.map((item, index) => {
			const weatherConditionByWord = this.data[index].weather[0].description.split(' ');

			return {
				value: weatherConditionByWord,
				pX: item.x,
				pY: this.chartBottom,
			};
		});
	}

	/*
		Method returns coordinates for precipitation rectangles

		@return {Array<RectCoords>}: {
			x: number,
			y: number,
			width: number,
			height: number,
		}
	*/
	getPrecipitationRects(): Array<RectCoords> {
		return this.rectCoords;
	}
	/**
	 * Returns an array of objects that contain the properties `rain`, `rainX`, `rainY`, `pop`, `popX`, and `popY`
	 *
	 * @return {Array<PrecipitationRectDesc>}
	 */
	getPrecipitationDescription(): Array<PrecipitationRectDesc> {
		return this.rectCoords.map((item, index) => {
			const rain = this.data[index].rain;
			const pop = Math.round(this.data[index].pop * 100) + '%';
			return {
				rain: rain ? rain['1h'] : undefined,
				rainX: item.x,
				rainY: item.y - 22,
				pop,
				popX: item.x,
				popY: item.y - 10,
			};
		});
	}

	/*
		Method returns coordinates of the bottom line

		@return {number}: number
	*/
	getRectBottom(): number {
		return this.rectBottom;
	}

	/*
		Initial private method for initialization
	*/
	private init(): void {
		this.dataCoords = this.calcCoords();
		this.rectCoords = this.calcPrecipitationRects();
		this.curve = this.generateCurve();
	}
}
