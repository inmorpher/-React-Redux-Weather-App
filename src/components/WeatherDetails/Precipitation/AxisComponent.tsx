import React from 'react';
import { AxisType } from '../../../utils/services/curves/types';

/**
 * Interface defining the properties for the Axis component.
 *
 * @param {AxisArray} axis - An array of `AxisType` objects that contain the necessary data to render each axis line and value.
 */
export interface AxisProps {
	/**
	 * Represents the props for the AxisComponents component.
	 *
	 * @param axis An array of `AxisType` objects. Each object contains the necessary data
	 * to render each axis line and value in the SVG component. The `AxisType` includes:
	 * - `y`: The y-coordinate for the axis line.
	 * - `value`: The numerical value represented at this axis point.
	 * - `length`: The length of the axis line.
	 */
	axis: Array<AxisType>;
}
/**
 * Renders SVG axis components based on provided axis data.
 *
 * This component generates a group of SVG elements (`<g>`) containing text and line elements
 * for each axis item. The text elements display the axis values, and the line elements represent
 * the axis lines.
 *
 * @param {AxisArray} props - The props containing axis data.
 * @returns A React functional component that renders SVG elements for the axis.
 */
const AxisComponents = ({ axis }: AxisProps) => {
	return (
		<g data-type='horizontal_axis_lines'>
			{axis.map((axis, index) => {
				return (
					<React.Fragment key={'valueAndLine' + index}>
						<text
							key={'scaleValue' + index}
							x={15}
							y={axis.y}
							textAnchor='middle'
							alignmentBaseline='central'
							fontSize={'0.5rem'}
							letterSpacing={0.1}
							fill='white'
							opacity={0.7}
						>
							{axis.value}
						</text>
						<line
							key={'scaleLine' + index}
							x1={20}
							y1={axis.y}
							x2={axis.length}
							y2={axis.y}
							stroke='white'
							strokeDasharray={2}
							strokeDashoffset={10}
							strokeWidth={0.1}
						/>
					</React.Fragment>
				);
			})}
		</g>
	);
};

export default AxisComponents;
