import { ReactNode } from 'react';

export interface IWrapperProps {
	children: ReactNode;
	className?: string;
}

/**
 * A wrapper component that wraps its children in a div element.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child elements to be wrapped.
 * @param {string} [props.className] - Optional CSS class name to be applied to the wrapping div.
 * @returns {JSX.Element} A div element containing the children and optional class name.
 */
const Wrapper = ({ children, className }: IWrapperProps) => {
	return <div className={className}>{children}</div>;
};

export default Wrapper;
