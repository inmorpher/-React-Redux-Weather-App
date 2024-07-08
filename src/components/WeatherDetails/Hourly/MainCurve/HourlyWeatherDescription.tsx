import { WeatherDescription } from '../../../../utils/services/curves/types';

export interface IWeatherDescriptionProps {
	weatherDescription?: Array<WeatherDescription>;
}

/**
 * HourlyWeatherDescription component renders weather descriptions for each hour.
 *
 * @param {IWeatherDescriptionProps} props - The properties object.
 * @param {Array<WeatherDescription>} [props.weatherDescription] - An optional array of weather descriptions.
 * @returns {JSX.Element | null} A group of text elements representing the weather descriptions, or null if no descriptions are provided.
 */
const HourlyWeatherDescription = ({ weatherDescription }: IWeatherDescriptionProps) => {
	if (!weatherDescription || !weatherDescription.length) return null;
	return (
		<g data-tag='weather-description'>
			{weatherDescription.map((item, index) => {
				return (
					<text key={'weatherDesc' + index} x={item.pX} y='95%'>
						{item.value.map((elem, i) => {
							return (
								<tspan
									key={'values' + i + 'tspan' + index}
									x={item.pX}
									dy='7.5'
									textAnchor='middle'
									fontSize='.5rem'
									fill='#fff'
									letterSpacing='1.5'
								>
									{elem}
								</tspan>
							);
						})}
					</text>
				);
			})}
		</g>
	);
};

export default HourlyWeatherDescription;
