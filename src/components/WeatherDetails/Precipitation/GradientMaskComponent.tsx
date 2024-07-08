import { PrecipitationDesc } from '../../../utils/services/definitions/precipitation.definition';

type GradientMaskProps = {
	colors: Array<PrecipitationDesc>;
};
/**
 * `GradientMaskComponent` is a React functional component that generates SVG definitions for creating gradient effects.
 * It utilizes linear gradients to create a vertical gradient effect and a background gradient effect, which can be applied
 * as masks or fills in SVG elements. The component takes an array of color descriptions as props and dynamically generates
 * gradient stops based on these colors.
 *
 * @param {GradientMaskProps} props - The component props.
 * @param {Array<PrecipitationDesc>} props.colors - An array of objects describing the colors and potentially other properties
 * related to the precipitation, which are used to create the gradient stops in the vertical gradient.
 * @returns A JSX element containing SVG definition tags (`<defs>`) with linear gradients and a mask configured for use in SVG graphics.
 */
const GradientMaskComponent = ({ colors }: GradientMaskProps) => {
	return (
		<defs>
			<linearGradient
				id='verticalGradient'
				x1='0'
				y1='100%'
				x2='0'
				y2='0'
				gradientUnits='userSpaceOnUse'
			>
				{colors.map((item, index) => {
					const range = 100 / colors.length;
					const stopOffset = Math.round(range * index) + '%';
					return (
						<stop key={item.color + index} offset={stopOffset} stopColor={item.color} />
					);
				})}
			</linearGradient>
			<linearGradient
				id='backGradient'
				x1='0'
				y1='0'
				x2='0'
				y2='100%'
				gradientUnits='userSpaceOnUse'
			>
				<stop offset='50%' stopColor='white' stopOpacity='1' />
				<stop offset='85%' stopColor='transparent' stopOpacity='1' />
			</linearGradient>
			<mask id='mask'>
				<rect x='0' y='0' width='100%' height='100%' fill='url(#backGradient)' />
			</mask>
		</defs>
	);
};

export default GradientMaskComponent;
