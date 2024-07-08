import { ScaleCoords } from '../../../utils/services/curves/types';

export interface IHourlyScaleProps {
	/**
	 * An array of ScaleCoords objects representing the data to be displayed on the scale.
	 */
	scaleMarks?: Array<ScaleCoords>;
}

/**
 * Scale component that renders an SVG element with text elements based on the provided data.
 *
 * @param {IHourlyScaleProps} props - The properties for the Scale component.
 * @param {Array<ScaleCoords>} props.data - An array of ScaleCoords objects to be displayed on the scale.
 * @returns {JSX.Element | null} The rendered SVG element or null if no data is provided.
 */
const Scale = ({ scaleMarks }: IHourlyScaleProps) => {
	if (!scaleMarks || !scaleMarks.length) return null;
	return (
		<div className='absolute left-0 w-[30px] before:absolute before:top-1/2 before:h-[60%] before:w-full before:translate-y-[-50%] before:rounded-r-xl before:bg-primary-color-900 before:shadow-basic before:dark:bg-primary-color-dark-900'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 30 300'
				width={30}
				className='relative'
			>
				{scaleMarks.map((item, index) => {
					return (
						<text
							key={2 + index}
							x={15}
							y={item.pY}
							fill='#fff'
							fontSize='.7rem'
							fontWeight='700'
							dominantBaseline='middle'
							textAnchor='middle'
						>
							{item.value}
							{item.units}
						</text>
					);
				})}
			</svg>
		</div>
	);
};

export default Scale;
