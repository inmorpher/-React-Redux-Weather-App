/**
 * Renders a MoonIcon component that visually represents the moon phase.
 * The moon phase is dynamically represented by adjusting the position of a white circle on a transparent circle.
 *
 * @param {Object} props - The component props.
 * @param {number} props.moon_phase - A numeric value representing the current phase of the moon. This value adjusts the position of the white circle to visually represent the moon phase.
 * @returns A MoonIcon component as an SVG element. The SVG contains a transparent circle overlaid with a white circle, whose position is determined by the `moon_phase` prop to simulate the current phase of the moon.
 */
const MoonIcon = ({ moon_phase }: { moon_phase: number }) => {
	return (
		<svg
			className='icon moon'
			width='58'
			height='48'
			viewBox='0 0 58 48'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				cx={'50%'}
				cy={'50%'}
				r='23'
				fill='transparent'
				stroke='white'
				strokeWidth='2'
			/>
			{/** * Defines a mask for the MoonIcon component. * This mask is used to create the
			visual effect of the moon's phase by revealing a portion of the white circle * based on
			the `moon_phase` prop. The mask is applied to a group of SVG elements, allowing the moon
			phase * to be dynamically represented by adjusting the visible portion of the overlaid
			white circle. */}
			<mask
				id='mask0_65_206'
				style={{ maskType: 'luminance' }}
				maskUnits='userSpaceOnUse'
				x='1'
				y='0'
				width='50'
				height='46'
			>
				<circle cx={'50%'} cy={'50%'} r='23' fill='white' />
			</mask>
			<g mask='url(#mask0_65_206)'>
				<circle cx={`${moon_phase}`} cy={'50%'} r='23' fill='white' strokeWidth='2' />
			</g>
		</svg>
	);
};

export default MoonIcon;
