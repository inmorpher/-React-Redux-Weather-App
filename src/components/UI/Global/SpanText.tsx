import { ReactNode } from 'react';

export interface ISpanTextProps {
	children: ReactNode;
	className?: string;
}

/**
 * A component that renders text content within a span element.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the span.
 * @param {string} [props.className] - Optional CSS class name(s) to apply to the span.
 * @returns {JSX.Element} A span element containing the provided children and optional class name.
 */
const SpanText = ({ children, className }: ISpanTextProps) => {
	return <span className={className}>{children}</span>;
};

export default SpanText;
