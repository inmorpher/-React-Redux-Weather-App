import { ReactNode } from 'react';

export interface ISpanTextProps {
	children: ReactNode;
	className?: string;
}

const SpanText = ({ children, className }: ISpanTextProps) => {
	return <span className={className}>{children}</span>;
};

export default SpanText;
