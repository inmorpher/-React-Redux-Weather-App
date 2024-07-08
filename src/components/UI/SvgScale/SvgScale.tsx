import { ScaleReturn } from '../../../utils/services/definitions/svgScale.definition';

type SvgScaleProps = {
	data: ScaleReturn;
	type: string;
};

/**
 * SvgScale component renders a scalable SVG element with a gradient and an indicator.
 *
 * @param {SvgScaleProps} props - The properties for the SvgScale component.
 * @param {ScaleReturn} props.data - The data object containing values and colors for the scale.
 * @param {string} props.type - The type of scale, which affects the number of data points.
 *
 * @returns {JSX.Element} The rendered SVG scale component.
 */
const SvgScale: React.FC<SvgScaleProps> = ({ data, type }) => {
	const indicatorW = 21;
	const scaleData = {
		pX: 0,
		pY: 2.5,
		length: 200,
		height: 20,
	};
	const dataLength = type === 'aqi' ? 5 : 11;

	const adjustedScaleLength = scaleData.length - indicatorW;

	/**
	 * Calculates the position of the pointer based on the data values.
	 * Ensures the pointer stays within the bounds of the scale.
	 */
	const pointerCoord = data.values
		? Math.max(
				0,
				Math.min(
					((data.values?.value - 1) * adjustedScaleLength) / (dataLength - 1),
					adjustedScaleLength,
				),
			)
		: 1;

	return (
		<svg viewBox='0 0 200 25' fill='none' xmlns='http://www.w3.org/2000/svg' width={'100%'}>
			<defs>
				<linearGradient
					id={`${type}-gradient`}
					x1='0'
					x2='200'
					gradientUnits='userSpaceOnUse'
				>
					{data.colors.map((color, index) => {
						const range = 100 / data.colors.length + 1;
						const stopOffset = Math.round(range * index) + '%';
						return <stop key={type + color} offset={stopOffset} stopColor={color} />;
					})}
				</linearGradient>
				<rect
					id={`${type}-scale-indicator`}
					x={pointerCoord}
					y='2'
					width={indicatorW}
					height='21'
					rx='50'
					ry='50'
					strokeWidth='10'
					stroke='#fff'
				/>
				<clipPath id={`${type}-inner-stroke`}>
					<use xlinkHref={`#${type}-scale-indicator`}></use>
				</clipPath>
			</defs>
			<rect x='0' y='2.5' width='200' height='20' fill={`url(#${type}-gradient)`} rx='10' />
			<use xlinkHref={`#${type}-scale-indicator`} clipPath={`url(#${type}-inner-stroke)`} />
		</svg>
	);
};

export default SvgScale;
