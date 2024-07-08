/**
 * Interface defining the properties for the WindIcon component.
 * @property {string | number} deg - The degree of rotation for the wind icon.
 * @property {string} literal - The text representation of the wind direction or speed.
 */
export interface IWindIconProps {
	deg: string | number;
	literal: string;
}

/**
 * Renders a wind direction icon with a label.
 *
 * This component displays a stylized arrow inside a circle to represent wind direction,
 * which rotates based on the `deg` prop to point in the correct direction. It also displays
 * a text label (`literal`) next to the icon.
 *
 * @param {IWindIconProps} props - The properties passed to the WindIcon component.
 * @param {string | number} props.deg - The degree of rotation for the wind icon.
 * @param {string} props.literal - The text representation of the wind direction or speed.
 * @returns A React functional component that renders an SVG wind icon and a text label.
 */
const WindIcon = ({ deg, literal }: IWindIconProps) => {
	return (
		<div className='flex flex-1 items-end gap-4'>
			<svg
				width='40'
				height='40'
				viewBox='0 0 40 40'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='h-10 w-10'
			>
				<circle cx='20' cy='20' r='19' stroke='white' strokeWidth='2' />
				<path
					d='M13 30L20 9L27 30L20 23L13 30Z'
					fill='white'
					stroke='white'
					strokeLinejoin='round'
					transform={`rotate(${deg})`}
					transform-origin='center'
				/>
			</svg>
			<span className='text-[2.5rem] leading-[2.5rem]'>{literal}</span>
		</div>
	);
};

export default WindIcon;
