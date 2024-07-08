import { TimeLineCoords } from '../../../../utils/services/curves/types';

export interface IChartTimeLineProps {
	/**
	 * An array of TimeLineCoords objects or undefined.
	 * Each object contains the coordinates and time information for the timeline.
	 */
	data: Array<TimeLineCoords> | undefined;
}

/**
 * ChartTimeLine component renders a series of text elements based on the provided data.
 * Each text element represents a point in time on the timeline.
 *
 * @param {IChartTimeLineProps} props - The properties object.
 * @param {Array<TimeLineCoords> | undefined} props.data - The data array containing timeline coordinates and time information.
 * @returns {JSX.Element | null} A group of text elements representing the timeline, or null if no data is provided.
 */
const HourlyChartTimeLine = ({ data }: IChartTimeLineProps) => {
	if (!data) return null;
	return (
		<g data-tag='chart-time-line'>
			{data.map((item, index) => {
				return (
					<text
						key={item.time + index}
						x={item.x}
						y={item.y}
						textAnchor='middle'
						fontSize='.8rem'
						fill='#fff'
						letterSpacing='.5'
					>
						{item.time}
					</text>
				);
			})}
		</g>
	);
};

export default HourlyChartTimeLine;
