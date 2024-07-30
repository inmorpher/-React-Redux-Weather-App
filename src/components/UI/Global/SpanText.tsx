import { ElementType, ReactNode } from 'react';

export interface ITextProps extends React.HTMLAttributes<HTMLElement> {
	children: ReactNode;
	as?: 'span' | 'p';
}

/**
 * A versatile component that renders text content within either a span or p element.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the element.
 * @param {'span' | 'p'} [props.as='span'] - The HTML element to use (default: 'span').
 * @param {string} [props.className] - Optional CSS class name(s) to apply to the element.
 * @param {React.CSSProperties} [props.style] - Optional inline styles to apply to the element.
 * @returns {JSX.Element} A span or p element containing the provided children and optional attributes.
 */
const SpanText = ({ children, as = 'span', style, className, ...props }: ITextProps) => {
	const Element: ElementType = as;

	return (
		<Element className={className} style={style} {...props}>
			{children}
		</Element>
	);
};

export default SpanText;
