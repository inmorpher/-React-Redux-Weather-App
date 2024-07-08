/**
 * Interface defining the properties for the PressureIndicator component.
 * @property {Array<{x1: number; y1: number; x2: number; y2: number}>} coords - An array of objects, each representing the coordinates of a line to be drawn.
 * @property {number} angle - The rotation angle for the central gauge indicator.
 */
export interface IPressureIndicatorProps {
	coords: Array<{ x1: number; y1: number; x2: number; y2: number }>;
	angle: number;
}

/**
 * A functional component that renders a pressure indicator using SVG.
 * It displays multiple lines based on provided coordinates and a central gauge that can be rotated.
 *
 * @param {IPressureIndicatorProps} props - The properties passed to the component, including coordinates for lines and an angle for the gauge.
 * @returns A SVG element representing the pressure indicator, with lines drawn according to `coords` and a gauge rotated by `angle`.
 */
const PressureIndicator = ({ coords, angle }: IPressureIndicatorProps) => {
	return (
		<svg width='162px' height='108px' viewBox='0 0 160 100' xmlns='http://www.w3.org/2000/svg'>
			{coords.map((line, index) => {
				return (
					<line
						key={'pressure-line' + index}
						x1={line.x1}
						y1={line.y1}
						x2={line.x2}
						y2={line.y2}
						stroke='white'
						strokeLinecap='round'
						strokeWidth='1'
					/>
				);
			})}
			<g
				style={{
					transform: `rotate(${angle}deg)`,
					transformOrigin: `${80}px ${70}px`,
				}}
			>
				<circle cx={`${80}px`} cy={`${70}px`} r={60} stroke='none' fill='none' />
				<line
					x1={80}
					x2={80}
					y1={5}
					y2={30}
					stroke='#53D7EF'
					strokeWidth={4}
					strokeLinecap='round'
				/>
			</g>
		</svg>
	);
};

export default PressureIndicator;
