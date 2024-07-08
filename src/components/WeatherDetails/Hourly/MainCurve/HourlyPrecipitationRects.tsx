import { RectCoords } from '../../../../utils/services/curves/types';

export interface IPrecipitationRectsProps {
	precipitationRectangles?: Array<RectCoords>;
}

/**
 * HourlyPrecipitationRects component renders a group of SVG rectangles representing precipitation data.
 *
 * @param {IPrecipitationRectsProps} props - The properties object.
 * @param {Array<RectCoords>} props.precipitationRectangles - An array of rectangle coordinates and dimensions.
 * @returns {JSX.Element | null} A group of SVG rectangles or null if there are no rectangles to render.
 */
const HourlyPrecipitationRects = ({ precipitationRectangles }: IPrecipitationRectsProps) => {
	if (!precipitationRectangles || !precipitationRectangles?.length) return null;
	return (
		<g data-tag='precipitation-rects'>
			{precipitationRectangles.map((item, index) => {
				if (item.height === 0) return;
				return (
					<rect
						key={item.x + index}
						x={item.x - 10}
						y={item.y + 10}
						width={item.width}
						height={item.height}
						fill='url(#rectGrad)'
						ry='5px'
						rx='5px'
					/>
				);
			})}
		</g>
	);
};

export default HourlyPrecipitationRects;
