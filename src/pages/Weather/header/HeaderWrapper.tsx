import React from 'react';

/**
 * Interface defining the props for the HeaderWrapper component.
 * @prop {React.ReactNode} children - The content to be rendered within the wrapper.
 */
export interface IHeaderWrapperProps {
	children: React.ReactNode;
}

/**
 * A functional component that provides a flexible container for header content.
 * It supports responsive design with a mobile-first approach, switching from
 * a column layout to a row layout on medium-sized devices and larger.
 *
 * @param {IHeaderWrapperProps} props - The props for the HeaderWrapper component.
 * @returns {JSX.Element} A div element wrapping the children with specified styling.
 */
const HeaderWrapper = ({ children }: IHeaderWrapperProps): JSX.Element => {
	return (
		<div className='container flex h-full w-full flex-col-reverse justify-between gap-3 md:flex-row'>
			{children}
		</div>
	);
};

export default HeaderWrapper;
