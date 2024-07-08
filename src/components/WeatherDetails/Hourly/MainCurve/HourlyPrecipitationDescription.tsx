import { PrecipitationRectDesc } from '../../../../utils/services/curves/types';

/**
 * Interface for the props of the HourlyPrecipitationDescription component.
 * @property {Array<PrecipitationRectDesc>} [precipitationDescription] - An optional array of precipitation description objects.
 */
export interface IPrecipitationDescriptionProps {
	precipitationDescription?: Array<PrecipitationRectDesc>;
}

/**
 * A React functional component that renders hourly precipitation descriptions.
 * @param {IPrecipitationDescriptionProps} props - The props for the component.
 * @param {Array<PrecipitationRectDesc>} [props.precipitationDescription] - An optional array of precipitation description objects.
 * @returns {JSX.Element | null} A group of SVG text elements representing the precipitation descriptions, or null if no descriptions are provided.
 */
const HourlyPrecipitationDescription = ({
	precipitationDescription,
}: IPrecipitationDescriptionProps): JSX.Element | null => {
	// Return null if there is no precipitation description or if the array is empty
	if (!precipitationDescription || !precipitationDescription.length) return null;

	return (
		<g data-tag='precipitation-description'>
			{precipitationDescription.map((item, index) => {
				return (
					<text key={'weather__desc' + index} x={item.popX} y={item.popY + 10}>
						<tspan
							x={item.popX}
							fill='#90e0ef'
							fontSize='.6rem'
							textAnchor='middle'
							fontWeight='700'
							letterSpacing='1'
						>
							{item.pop}
						</tspan>
						{item.rain && (
							<tspan
								x={item.popX}
								dy='-10'
								fill='#90e0ef'
								fontSize='.6rem'
								textAnchor='middle'
								fontWeight='700'
								letterSpacing='1'
							>
								{item.rain + 'mm'}
							</tspan>
						)}
					</text>
				);
			})}
		</g>
	);
};

export default HourlyPrecipitationDescription;
