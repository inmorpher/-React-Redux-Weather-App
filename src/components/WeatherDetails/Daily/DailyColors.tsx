import { TempColorsDefinition } from '../../../utils/services/definitions/daily.temp.definition';

interface DailyColorProps {
	colors: TempColorsDefinition[];
}

/**
 * DailyColors component renders an SVG with a hidden linear gradient definition.
 * This gradient can be used elsewhere in the application by referencing the gradient's ID.
 *
 * @param {DailyColorProps} props - The properties object.
 * @param {TempColorsDefinition[]} props.colors - An array of color definitions used to create the gradient stops.
 * @returns {JSX.Element} An SVG element containing the linear gradient definition.
 */
const DailyColors = ({ colors }: DailyColorProps): JSX.Element => {
	return (
		<svg width={0} height={0} style={{ visibility: 'hidden' }}>
			<defs>
				<linearGradient
					id='temp-color-scale'
					x1='0'
					x2='135'
					gradientUnits='userSpaceOnUse'
				>
					{colors.map((color, index) => {
						const offset = `${(index * 100) / (colors.length - 1)}%`;

						return (
							<stop
								key={'temp-color' + index}
								offset={offset}
								stopColor={color.color}
							/>
						);
					})}
				</linearGradient>
			</defs>
		</svg>
	);
};

export default DailyColors;
