import React from 'react';

export interface ISunPositionIconProps {
	isDay: boolean; // Indicates whether it's day or night.
	pathRef: React.RefObject<SVGPathElement> | null; // Reference to the SVG path element.
	indicatorRef: React.RefObject<SVGCircleElement> | null; // Reference to the SVG circle element.
}

// SVG path definitions for day and night.
const dayPath = 'M 5 35C 5 35 75 -30 155 35'; // Path for the sun's trajectory during the day.
const nightPath = 'M 5 5C 5 5 75 70 155 5'; // Path for the moon's trajectory during the night.

/**
 * Renders an SVG icon representing the sun's position in the sky.
 *
 * This component visually indicates whether it's day or night through the use of a dynamic SVG.
 * The path of the sun or moon is determined by the `isDay` prop, and the appearance of the
 * indicator circle changes accordingly.
 *
 * Props:
 * - `isDay`: A boolean indicating day or night mode.
 * - `pathRef`: A React ref object pointing to the SVG path element.
 * - `indicatorRef`: A React ref object pointing to the SVG circle element.
 *
 * Returns a React component containing the SVG representation.
 */
const SunPositionIcon = ({ isDay, pathRef, indicatorRef }: ISunPositionIconProps) => {
	return (
		<div className='flex flex-1 items-center gap-4'>
			<svg viewBox='0 0 160 60' width='100%' height='50px' className='border-0 border-red-50'>
				<defs>
					<radialGradient
						id='white-to-transparent'
						cx='50%'
						cy='50%'
						r='50%'
						fx='50%'
						fy='50%'
					>
						<stop offset='30%' stopColor='white' stopOpacity='1' />
						<stop offset='100%' stopColor='white' stopOpacity='0' />
					</radialGradient>
				</defs>
				<path
					ref={pathRef}
					id='sun-path'
					d={isDay ? dayPath : nightPath}
					fill='none'
					stroke={isDay ? '#FFF' : '#B8B8B8'}
					strokeWidth={isDay ? 2 : 1}
					strokeLinecap='round'
				/>
				<circle
					ref={indicatorRef}
					id='sun-indicator'
					r='10'
					fill={isDay ? 'url(#white-to-transparent)' : 'var(--main-gradient-color-start)'}
				/>
			</svg>
		</div>
	);
};

export default SunPositionIcon;
