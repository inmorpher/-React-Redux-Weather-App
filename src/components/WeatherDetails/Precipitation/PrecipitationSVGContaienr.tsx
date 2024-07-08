import React from 'react';

/**
 * Interface defining the properties for PrecipitationSVGContainer component.
 *
 * @interface
 * @property {React.ReactNode} children - The content to be rendered within the SVG container.
 * @property {Object} dimension - Object containing optional width and height of the SVG.
 * @property {number} [dimension.width] - Optional width for the SVG.
 * @property {number} [dimension.height] - Optional height for the SVG.
 * @property {boolean} [isPrecipitation] - Flag to determine if precipitation styling should be applied.
 */
export interface IPrecipitationSVGContainerProps {
	children: React.ReactNode;
	dimension: {
		width?: number;
		height?: number;
	};
	isPrecipitation?: boolean;
}

/**
 * A functional component that renders an SVG container with optional precipitation styling.
 *
 * This component dynamically adjusts its `viewBox` based on the provided `dimension` props and
 * applies a lower opacity if `isPrecipitation` is false, indicating a lack of precipitation.
 *
 * @param {IPrecipitationSVGContainerProps} props - The properties passed to the component.
 * @returns {JSX.Element} The SVG container with children and optional styling based on precipitation.
 */
const PrecipitationSVGContainer = ({
	children,
	dimension,
	isPrecipitation,
}: IPrecipitationSVGContainerProps) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={`0 0 ${dimension?.width} ${dimension?.height}`}
			className={` mx-auto transition-all ${!isPrecipitation && 'opacity-30'}`}
		>
			{children && children}
		</svg>
	);
};

export default PrecipitationSVGContainer;
