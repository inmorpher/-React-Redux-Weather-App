import { Curve, CurveType, DataCoords, TimeLineCoords } from './types';

type CurveParamsType = {
	top: number;
	bottom: number;
	height: number;
	width: number;
	left: number;
};

export abstract class SVGChart<T> {
	protected chartHeight: number;
	protected chartWidth: number;
	protected chartBottom = 0;
	protected curveHeight = 0;
	protected data: Curve<T>;
	protected dataCoords: Array<DataCoords> = [];
	protected leftOffset = 0;
	protected alpha = 1;
	protected timezone: string | undefined;
	protected curve = '';
	protected curveParams: CurveParamsType;
	constructor(data: Curve<T>, width: number, height: number) {
		this.data = data;
		this.chartHeight = height;
		this.chartWidth = width;
		this.curveParams = { bottom: 0, left: 0, height: 0, top: 0, width: 0 };
	}

	/**
	 * Generates a smooth SVG path curve string based on the data coordinates.
	 * This method uses a cubic Bezier curve formula to create smooth transitions
	 * between points. The curve is adjusted by the `alpha` parameter, which
	 * influences the tension of the curve. The method ensures that the curve
	 * starts at the first data point and passes through each subsequent data point
	 * smoothly, with the last segment being a quadratic curve to the last data point
	 * to ensure a smooth end.
	 *
	 * @returns {string} The SVG path string representing the curve.
	 */
	protected generateCurve(): string {
		// Check if alpha is defined, otherwise default to 1 for curve tension
		const alpha = this.alpha ? this.alpha : 1;
		// Reference to the data coordinates
		const data = this.dataCoords;
		// Start the curve at the first data point
		let curve = `M${data[0].x} ${data[0].y}`;
		// Iterate through the data points to construct the curve
		for (let i = 0; i < data.length - 2; i++) {
			// Define control points for the Bezier curve, adjusting for alpha
			const p0 = data[i === 0 ? i : i - 1];
			const p1 = data[i];
			const p2 = data[i + 1];
			const p3 = data[i + 2] || data[i + 1]; // Use next or current point if at the end
			const cp1x = p1.x + ((p2.x - p0.x) / 6) * alpha;
			const cp1y = p1.y + ((p2.y - p0.y) / 6) * alpha;
			const cp2x = p2.x - ((p3.x - p1.x) / 6) * alpha;
			const cp2y = p2.y - ((p3.y - p1.y) / 6) * alpha;
			// Append the cubic Bezier curve segment to the curve string
			curve += 'C' + [cp1x, cp1y, cp2x, cp2y, p2.x, p2.y].join(',');
			// If at the penultimate point, add a smooth quadratic curve to the last point
			if (i === data.length - 3) {
				curve += `S ${data[data.length - 2].x} ${data[data.length - 2].y} ${
					data[data.length - 1].x
				} ${data[data.length - 1].y}`;
			}
		}

		return curve;
	}

	/**
	 * Draws the curve for the chart data and optionally includes a background path.
	 * This method generates the SVG path data for the main curve based on the `dataCoords`
	 * and can also create a closed path that extends to the bottom of the chart, useful for
	 * creating filled chart areas.
	 *
	 * @param {boolean} backPath - A flag indicating whether to include the background path.
	 * If `true`, a closed path from the first data point down to the bottom of the chart,
	 * following the curve, and then back to the starting point is included.
	 * @returns {CurveType} An object containing the SVG path data for the main curve
	 * and optionally the background path. The `mainCurve` property holds the SVG path
	 * data for the curve itself, while the `backPathCurve` property includes the SVG path
	 * data for the background path if `backPath` is true, otherwise it is an empty string.
	 */
	public drawCurve(backPath = false): CurveType {
		const mainCurve = this.curve;
		let path = '';
		if (backPath) {
			path = `M ${this.dataCoords[0].x} ${this.chartHeight},
        L ${this.dataCoords[0].x} ${this.dataCoords[0].y},
        ${mainCurve}
        L ${this.dataCoords[this.dataCoords.length - 1].x} ${this.chartHeight},
        L ${this.dataCoords[0].x} ${this.chartHeight},
        Z
        `;
		}

		return { mainCurve, backPathCurve: path && path };
	}
	abstract getTimeLine(): Array<TimeLineCoords>;
}
