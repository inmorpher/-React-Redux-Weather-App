/**
 * Interface for the properties of the HourlyChartCurve component.
 */
export interface IChartCurveProps {
	/**
	 * The SVG path data string that defines the curve to be drawn.
	 */
	curvePath?: string;
}

/**
 * A functional component that renders an SVG path element representing a curve.
 *
 * @param {IChartCurveProps} props - The properties for the component.
 * @param {string} [props.curvePath] - The SVG path data string that defines the curve to be drawn.
 * @returns {JSX.Element | null} The SVG group element containing the path, or null if no curvePath is provided.
 */
const HourlyChartCurve = ({ curvePath }: IChartCurveProps): JSX.Element | null => {
	if (!curvePath) return null;
	return (
		<g data-tag='chart-curve'>
			<path
				fill='none'
				strokeLinecap='round'
				strokeLinejoin='round'
				stroke='url(#chartStroke)'
				d={curvePath}
				strokeWidth={5}
			/>
			1
		</g>
	);
};

export default HourlyChartCurve;
