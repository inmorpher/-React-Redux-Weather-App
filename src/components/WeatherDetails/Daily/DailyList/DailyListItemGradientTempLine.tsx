import { IDailyTempCoords } from '../../../../predi/slices/weatherApiSlice';

/**
 * Interface for the properties of the DailyListItemGradientTempLine component.
 */
export interface IDailyListItemGradientTempLineProps {
	/**
	 * The index of the day for which the temperature line is being rendered.
	 */
	dayIndex: number;

	/**
	 * An array of coordinates for the daily temperature lines.
	 */
	dailyTempCoords: IDailyTempCoords[];
}

/**
 * A React functional component that renders a gradient temperature line for a specific day.
 *
 * @param {IDailyListItemGradientTempLineProps} props - The properties for the component.
 * @param {number} props.dayIndex - The index of the day for which the temperature line is being rendered.
 * @param {IDailyTempCoords[]} props.dailyTempCoords - An array of coordinates for the daily temperature lines.
 * @returns {JSX.Element} The SVG element representing the gradient temperature line.
 */
const DailyListItemGradientTempLine = ({
	dayIndex,
	dailyTempCoords,
}: IDailyListItemGradientTempLineProps): JSX.Element => {
	return (
		<svg
			width='135'
			height='7'
			viewBox='0 0 135 8'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='w-4/5'
		>
			{/* Background line */}
			<line x1='0' y1='4' x2='135' y2='4' stroke='#ADADAD' strokeWidth='2' strokeLinecap='round' />
			{/* Gradient temperature line */}
			<line
				x1={dailyTempCoords[dayIndex].x1}
				y1='4'
				x2={dailyTempCoords[dayIndex].x2}
				y2='4'
				stroke='url(#temp-color-scale)'
				strokeWidth='6'
				strokeLinecap='round'
			/>
		</svg>
	);
};

export default DailyListItemGradientTempLine;
