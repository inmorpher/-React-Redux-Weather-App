import { forwardRef, ReactNode } from 'react';

export interface IWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

/**
 * A universal wrapper component that wraps its children in a div element.
 * It accepts all standard HTML div attributes.
 *
 * @param {IWrapperProps} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child elements to be wrapped.
 * @param {React.Ref<HTMLDivElement>} ref - Optional ref to be forwarded to the wrapping div.
 * @returns {JSX.Element} A div element containing the children and all passed properties.
 */
const Wrapper = forwardRef<HTMLDivElement, IWrapperProps>((props, ref) => {
	const { children, ...restProps } = props;
	return (
		<div ref={ref} {...restProps}>
			{children}
		</div>
	);
});

Wrapper.displayName = 'Wrapper';

export default Wrapper;
