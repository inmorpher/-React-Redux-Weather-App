import { ReactNode } from 'react';

/**
 * HourlySVGContainer is a functional component that renders an SVG element.
 * It serves as a container for SVG graphics, allowing child elements to be passed in and rendered within the SVG.
 *
 * @param {Object} props - The properties object.
 * @param {ReactNode} props.children - The child elements to be rendered inside the SVG.
 * @returns {JSX.Element} The rendered SVG element containing the child elements.
 */
const HourlySVGContainer = ({ children }: { children: ReactNode }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={3000}
			height={300}
			id='svgChart'
			viewBox={`0 0 3000 300`}
		>
			{children}
		</svg>
	);
};

export default HourlySVGContainer;
