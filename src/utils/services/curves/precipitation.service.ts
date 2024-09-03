import { TimeService } from '../time/time.service';
import { SVGChart } from './svgChart.abstract';
import { AxisType, PrecipitationData, TimeLineCoords } from './types';

export class PrecipitationService extends SVGChart<PrecipitationData[]> {
	private timeLineCoords: Array<TimeLineCoords> = [];
	private readonly AXIS_STEPS = 6;
	private stepValue = 0;
	private maxPrecipitation = 0;
	private maxScaleValue = 0;
	private readonly TIMELINE_INTERVAL = 15; // Interval for timeline labels in minutes
	private readonly MIN_PRECIPITATION = 10;

	constructor(
		data: Array<PrecipitationData>,
		timezone: string,
		dimension: { width: number; height: number }
	) {
		super(data, dimension.width, dimension.height);
		this.alpha = 1;
		this.timezone = timezone || 'UTC';
		this.chartHeight = dimension.height * 0.95;
		this.curveParams.height = this.chartHeight * 0.75;
		this.curveParams.width = this.chartWidth * 0.87;
		this.curveParams.bottom = this.chartHeight - 5;
		this.curveParams.left = this.chartWidth * 0.075;

		this.init();
	}

	/**
	 * Calculates the coordinates for each data point in the precipitation data array and the timeline labels.
	 * This method iterates through the precipitation data array, calculating the x and y coordinates for each data point
	 * based on the precipitation value and its index in the array. It also determines the x and y coordinates for timeline labels,
	 * which are placed at every 15-minute interval or at the last data point. The timeline labels include a time description
	 * (e.g., 'now' or '15 min') and the formatted time from the `TimeService`.
	 *
	 * The calculated coordinates for the data points are stored in `this.dataCoords`, and the timeline label coordinates
	 * are stored in `this.timeLineCoords`. The x coordinate is calculated based on the index of the data point and the total
	 * width allocated for the curve, ensuring even spacing between points. The y coordinate for each data point is calculated
	 * based on the precipitation value, using a fixed scale to convert precipitation values to pixels. The timeline label's
	 * y coordinates are fixed, with `y` set to 12 for positioning the label and `y2` set to the chart height for drawing lines.
	 */
	private calcCoords(): void {
		const totalSteps = this.data.length - 1;
		const pixPerStepX = this.curveParams.width / totalSteps;
		const pixPerStepY = this.curveParams.height / this.maxScaleValue;

		this.data.forEach((item, index) => {
			const x = pixPerStepX * index + this.curveParams.left;
			const y = this.curveParams.bottom - item.precipitation * pixPerStepY;
			// const color = getPrecipitationColors(item.precipitation);

			this.dataCoords.push({ x, y });
			// this.dataCoords.push({ x, y });

			// Every 15 minutes or the last data point (assumes data is in minute intervals)
			if (index % this.TIMELINE_INTERVAL === 0 || index === totalSteps) {
				const timeLabel = index === 0 ? 'now' : `${index} min`;
				this.timeLineCoords.push({
					time: new TimeService(item.dt, this.timezone).getTime('hoursAndMinutes').result(),
					description: timeLabel,
					x,
					y: 12,
					y2: this.chartHeight,
				});
			}
		});
	}

	getTimeLine(): Array<TimeLineCoords> {
		return this.timeLineCoords;
	}

	/**
	 * Generates the axis data for the precipitation chart.
	 * This method calculates the y-axis values and their corresponding positions on the chart.
	 * It divides the chart's height into segments based on the `maxScaleValue` to represent
	 * the precipitation values evenly across the y-axis. Each axis tick is calculated by
	 * dividing the total height of the curve by the maximum scale value, then multiplying
	 * by the step value to get the y position for each tick.
	 *
	 * @returns {Array<AxisType>} An array of objects representing the axis ticks. Each object
	 * contains the `y` position of the tick on the chart, the `value` of the tick, and the
	 * `length` which is the x-coordinate of the last timeline coordinate, ensuring the axis
	 * lines span the entire width of the chart.
	 */
	getAxis(): Array<AxisType> {
		const range = this.curveParams.height / this.maxScaleValue;

		return Array.from({ length: this.AXIS_STEPS }, (_, i) => i * this.stepValue).map((value) => ({
			y: this.chartHeight - range * value - 5,
			value,
			length: this.timeLineCoords[this.timeLineCoords.length - 1].x,
		}));
	}

	/**
	 * Finds the maximum precipitation value from the provided precipitation data array.
	 * This method iterates through the precipitation data array to determine the highest
	 * precipitation value. If the maximum precipitation is less than 10, it sets the
	 * `maxPrecipitation` to 10 to ensure a minimum scale. Otherwise, it sets the
	 * `maxPrecipitation` to the highest value found in the data.
	 *
	 * @param {Array<{ dt: number; precipitation: number }>} precipitation - An array of objects
	 * each containing a timestamp (`dt`) and a precipitation value (`precipitation`).
	 */
	findMaxPrecipitation(precipitation: Array<{ dt: number; precipitation: number }>) {
		const maxPrecipitation = precipitation.reduce(
			(max, item) => Math.max(max, item.precipitation),
			0
		);

		if (maxPrecipitation < this.MIN_PRECIPITATION) {
			this.maxPrecipitation = this.MIN_PRECIPITATION;
			return;
		}

		this.maxPrecipitation = maxPrecipitation;
	}
	/**
	 * Initializes the precipitation service by setting up the necessary parameters and calculating the coordinates.
	 * This method performs the following steps:
	 * 1. Finds the maximum precipitation value from the provided data.
	 * 2. Calculates the step value for the y-axis based on the maximum precipitation and the number of axis steps.
	 * 3. Determines the maximum scale value for the y-axis.
	 * 4. Calculates the coordinates for the precipitation data points and timeline labels.
	 * 5. Generates the curve for the precipitation chart.
	 *
	 * @private
	 */
	private init(): void {
		this.findMaxPrecipitation(this.data);
		this.stepValue = Math.ceil(this.maxPrecipitation / (this.AXIS_STEPS - 1));
		this.maxScaleValue = Math.ceil(this.maxPrecipitation / this.stepValue) * this.stepValue;
		this.calcCoords();
		this.curve = this.generateCurve();
	}
}
