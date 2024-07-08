import React, { ReactNode } from 'react';

/**
 * Interface for the props of the DailyContainer component.
 */
export interface IDailyContainerProps {
	/** The child elements to be rendered inside the container. */
	children: ReactNode;
	/** A reference to the container div element. */
	containerRef: React.RefObject<HTMLDivElement>;
}

/**
 * A container component that wraps its children with specific styling and a reference.
 *
 * @param {IDailyContainerProps} props - The props for the DailyContainer component.
 * @param {ReactNode} props.children - The child elements to be rendered inside the container.
 * @param {React.RefObject<HTMLDivElement>} props.containerRef - A reference to the container div element.
 * @returns {JSX.Element} The rendered container component.
 */
const DailyContainer = ({ children, containerRef }: IDailyContainerProps): JSX.Element => {
	return (
		<div
			className='flex h-full w-full overflow-hidden whitespace-nowrap rounded-b-lg bg-primary-color-500 dark:bg-primary-color-dark-500'
			ref={containerRef}
		>
			{children}
		</div>
	);
};

export default DailyContainer;
