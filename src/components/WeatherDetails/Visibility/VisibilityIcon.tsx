/**
 * `VisibilityIcon` is a React functional component that renders an SVG icon representing visibility.
 * This icon is stylized with a specific width, height, and custom class names for styling purposes.
 * The SVG consists of two paths: one representing the eye shape and the other, the pupil, symbolizing the concept of visibility or the action of viewing.
 *
 * There are no parameters for this component.
 *
 * @returns A React element that displays a stylized visibility icon.
 */
const VisibilityIcon = () => {
	return (
		<svg
			width='40'
			height='40'
			viewBox='0 0 59 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='h-10 w-10'
		>
			<path
				d='M41 20C41 26.6647 35.8147 32 29.5 32C23.1853 32 18 26.6647 18 20C18 13.3353 23.1853 8 29.5 8C35.8147 8 41 13.3353 41 20Z'
				stroke='white'
				strokeWidth='2'
			/>
			<path
				d='M57.2252 18.9177C57.597 19.4189 57.7829 19.6696 57.7829 20C57.7829 20.3304 57.597 20.5811 57.2252 21.0823C54.2374 25.11 42.9581 39 29.5 39C16.0419 39 4.76259 25.11 1.77484 21.0823C1.40298 20.5811 1.21705 20.3304 1.21705 20C1.21705 19.6696 1.40298 19.4189 1.77484 18.9177C4.7626 14.89 16.0419 1 29.5 1C42.9581 1 54.2374 14.89 57.2252 18.9177Z'
				stroke='white'
				strokeWidth='2'
			/>
		</svg>
	);
};

export default VisibilityIcon;
