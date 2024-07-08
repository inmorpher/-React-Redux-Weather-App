/**
 * HourlyUnderline is a functional React component that renders an SVG group element (<g>)
 * containing a single line element (<line>). This line is used to create an underline effect.
 *
 * The line is drawn from coordinates (10, 94%) to (2990px, 94%) with a white stroke color,
 * a stroke width of 1, and rounded line caps.
 *
 * @returns {JSX.Element} A JSX element representing the underline.
 */
const HourlyUnderline = () => {
	return (
		<g data-tag='underline'>
			<line
				x1='10'
				y1='94%'
				x2='2990px'
				y2='94%'
				stroke='white'
				strokeWidth='1'
				strokeLinecap='round'
			/>
		</g>
	);
};

export default HourlyUnderline;
