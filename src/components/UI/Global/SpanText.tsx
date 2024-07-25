import { ReactNode } from 'react';

export interface ISpanTextProps extends React.HTMLAttributes<HTMLSpanElement> {
	children: ReactNode;
}

/**
 * A component that renders text content within a span element.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the span.
 * @param {string} [props.className] - Optional CSS class name(s) to apply to the span.
 * @param {React.CSSProperties} [props.style] - Optional inline styles to apply to the span.
 * @returns {JSX.Element} A span element containing the provided children and optional attributes.
 */
const SpanText = ({ children, style, className, ...props }: ISpanTextProps) => {
	return (
		<span className={className} style={style} {...props}>
			{children}
		</span>
	);
};

export default SpanText;
