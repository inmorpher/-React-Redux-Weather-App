import { MetricType } from '../../../context/Metric.context';
import { MetricConverter, MetricReturnType } from '../converter/metric.converter';
import { SVGChart } from './svgChart.abstract';
import { PopupHoverRect, PopupWeatherScale, ScaleCoords, TimeLineCoords } from './types';

export class PopupWeatherScaleService extends SVGChart<Array<PopupWeatherScale>> {
	private minVal = 0;
	private maxVal = 0;
	private metric;
	private dayNumber = 0;
	private flatData = this.data.flatMap((item) => Object.values(item));
	private scaleCoords: Array<ScaleCoords> = [];
	private expandedData: MetricReturnType[] = [];
	constructor(data: Array<PopupWeatherScale>, metric: MetricType, dayNumber: number) {
		super(data, 300, 150);
		this.curveParams.height = 120 * 0.75;
		this.curveParams.width = 300;
		this.curveParams.bottom = this.chartHeight - 10;
		this.curveParams.left = 10;
		this.metric = metric;
		this.dayNumber = dayNumber;
		this.expandedData = this.expandDayValues();
		this.alpha = 1;
		this.init();
	}

	getTimeLine(): TimeLineCoords[] {
		throw new Error('Method not implemented.');
	}

	private calcCoords(): void {
		const curveLeft = 30;
		const range = this.maxVal - this.minVal;

		const pixPerStepX = (this.chartWidth - curveLeft) / 25;
		const pixPerStepY = this.curveParams.height / range;
		this.expandedData.forEach((item, index) => {
			const x = curveLeft + pixPerStepX * index;
			const y = this.curveParams.bottom - (item.value - this.minVal) * pixPerStepY;
			this.dataCoords.push({ x, y, value: this.flatData[index] });
		});
	}

	/**
	 * Generates the scale coordinates for the weather popup.
	 *
	 * This method calculates the scale values and their corresponding positions
	 * on the chart. It divides the range between the minimum and maximum values
	 * into four equal parts and generates the scale coordinates accordingly.
	 *
	 * @returns {Array<ScaleCoords>} An array of scale coordinates, each containing
	 * the value, units, and position (pX, pY) on the chart.
	 */
	getScale(): Array<ScaleCoords> {
		const range = (this.maxVal - this.minVal) / 4;

		for (let i = 0; i <= 4; i++) {
			const value = Math.round(this.minVal + range * i);
			const units = '°';
			const pX = 10;
			const pY = this.curveParams.bottom - (this.curveParams.height / 4) * i;

			this.scaleCoords.push({
				value,
				units,
				pX,
				pY,
			});
		}

		return this.scaleCoords;
	}
	private expandDayValues() {
		const data = MetricConverter.getTemps(
			Object.values(this.data[this.dayNumber]),
			this.metric,
			'full'
		);
		const result = [];

		const elems = 5;

		for (let i = 0; i < data.length; i++) {
			result.push(data[i]);
			const nextData = data[i + 1] ? data[i + 1] : data[0];
			const difference = Math.abs(data[i].value - nextData.value);
			if (i < data.length - 1) {
				for (let j = 0; j < elems; j++) {
					if (data[i].value < nextData.value) {
						result.push({
							value: +(data[i].value + (difference / elems) * j).toFixed(2),
							units: data[0].units,
						});
					} else if (data[i].value > nextData.value) {
						result.push({
							value: +(data[i].value - (difference / elems) * j).toFixed(2),
							units: data[0].units,
						});
					} else {
						result.push({
							value: +(data[i].value + (difference / elems) * j).toFixed(2),
							units: data[0].units,
						});
					}
				}
			}
		}

		return result;
	}

	private getTotalMinMax(): void {
		const min = Math.min(...this.data.flatMap((item) => Object.values(item)));
		const max = Math.max(...this.data.flatMap((item) => Object.values(item)));
		this.minVal = MetricConverter.getTemp(min, this.metric).value - 5;
		this.maxVal = MetricConverter.getTemp(max, this.metric).value + 5;
	}
	getDescription() {
		const values = ['00', '06', '12', '18', '00'];
		const result = [];

		for (let i = 0; i < this.dataCoords.length; i += 6) {
			result.push({
				x: this.dataCoords[i].x,
				y: 150,
				value: values[i / 6],
			});
		}

		return result;
	}
	getExpandedValues() {
		return this.expandedData.map((item) => ({ ...item, value: Math.round(item.value) }));
	}

	getHoverRect(): PopupHoverRect {
		return {
			x: this.dataCoords[0].x,
			width: this.dataCoords[this.dataCoords.length - 1].x - this.dataCoords[0].x,
			height: this.chartHeight,
		};
	}
	private init(): void {
		this.getTotalMinMax();
		this.calcCoords();
		this.curve = this.generateCurve();
	}
}
