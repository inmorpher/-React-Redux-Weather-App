import React, { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';
type CardProps = {
	children?: ReactNode | null;
	title?: string;
	style?: string;
	className?: string;
};

const Card: React.FC<CardProps> = ({ children = null, title, className }) => {
	return (
		<div
			className={twMerge(
				'bg-weather-gradient  flex h-full w-full flex-col items-center justify-center rounded-lg border-[.2px] border-white/50 p-1 shadow-basic',
				className,
			)}
		>
			<h4 className=' block flex-shrink-0 text-center text-sm font-light'>{title}</h4>

			{children && children}
		</div>
	);
};

export default Card;
