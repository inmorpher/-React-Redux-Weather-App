import { MetricReturnType } from '../../../utils/services/converter/metric.converter';

/**
 * Interface for the properties of the WindSpeedDetails component.
 *
 * @interface IWindSpeedDetailsProps
 * @property {MetricReturnType} speed - The wind speed, including value and units.
 * @property {MetricReturnType | null} gust - The wind gust speed, including value and units, if available.
 */
export interface IWindSpeedDetailsProps {
	speed: MetricReturnType;
	gust: MetricReturnType | null;
}

/**
 * Displays wind speed and gust information.
 *
 * This component renders the wind speed and, if available, gust speed
 * with their respective units. It only displays gust information if the
 * gust value is greater than 0.
 *
 * @param {IWindSpeedDetailsProps} props - The properties for the component, including speed and gust.
 * @returns A React functional component displaying the wind speed and optional gust information.
 */
const WindSpeedDetails = ({ speed, gust }: IWindSpeedDetailsProps) => {
	return (
		<div className='flex flex-1 flex-col justify-end text-center text-sm'>
			<span>
				speed: {speed.value}
				{speed.units}
			</span>

			{gust && gust.value > 0 && (
				<span>
					gust: {gust.value}
					{gust.units}
				</span>
			)}
		</div>
	);
};
export default WindSpeedDetails;
