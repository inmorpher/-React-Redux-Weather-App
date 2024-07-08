/**
 * HourlySVGDefs is a React functional component that defines reusable SVG elements.
 * These elements include linear gradients and a drop shadow filter, which can be used
 * to style other SVG elements within the same SVG context.
 *
 * @returns {JSX.Element} A JSX element containing SVG definitions.
 */
const HourlySVGDefs = (): JSX.Element => {
	return (
		<defs>
			{/* Linear gradient for rectangle fill */}
			<linearGradient id='rectGrad' gradientTransform='rotate(90)'>
				<stop offset='0%' stopColor='#53D7EF' />
				<stop offset='100%' stopColor='#90E0EF' />
			</linearGradient>

			{/* Linear gradient for chart stroke */}
			<linearGradient id='chartStroke' gradientTransform='rotate(90)'>
				<stop offset='0%' stopColor='#FD76B7' />
				<stop offset='100%' stopColor='#ffa6d1' />
			</linearGradient>

			{/* Drop shadow filter for rectangles */}
			<filter id='shadowRect' x='-10%' y='-10%' width='120%' height='140%'>
				<feDropShadow dx='0' dy='0' stdDeviation='1' floodColor='#1d1d1d' />
			</filter>
		</defs>
	);
};

export default HourlySVGDefs;
