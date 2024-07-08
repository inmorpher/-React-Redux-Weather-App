/**
 * Interface defining the properties for MoonContent component.
 * @interface
 * @property {string} moonrise - The time when the moon rises.
 * @property {string} moonset - The time when the moon sets.
 */
export interface IMoonContentProps {
	moonrise: string;
	moonset: string;
}

/**
 * Functional component to display moonrise and moonset times.
 * Utilizes the IMoonContentProps interface for its props.
 *
 * @param {IMoonContentProps} props - The props passed to the component, including moonrise and moonset times.
 * @returns A JSX element displaying the moonrise and moonset times with specific pre-styling.
 */
const MoonContent = ({ moonrise, moonset }: IMoonContentProps) => {
	return (
		<div className='flex justify-between '>
			{/* Span element for displaying moonrise time with a custom before pseudo-element for styling */}
			<span className='relative text-center text-xs before:absolute before:left-2/4 before:top-0 before:origin-center before:translate-x-[-50%] before:translate-y-[-100%] before:content-["↑↑"]'>
				{moonrise}
			</span>
			{/* Span element for displaying moonset time with a custom before pseudo-element for styling */}
			<span className='relative text-center text-xs before:absolute before:left-2/4 before:top-0 before:origin-center before:translate-x-[-50%] before:translate-y-[-100%] before:content-["↓↓"]'>
				{moonset}
			</span>
		</div>
	);
};

export default MoonContent;
