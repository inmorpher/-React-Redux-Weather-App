import { cva, VariantProps } from 'class-variance-authority';

import { ButtonHTMLAttributes, memo } from 'react';
import { cn } from '../../utils/cn';

const btnVariants = cva('bg-center bg-no-repeat transition-all hover:opacity-100', {
	variants: {
		size: {
			medium: 'w-10 h-10',
			small: 'w-7 h-7',
			text: 'px-2 py-1',
		},
		border: {
			border: '',
		},
		variant: {
			default: '',
			geolocation: 'bg-geolocation-btn opacity-50',
			search: 'bg-search-btn opacity-50 [&.active]:bg-close-btn',
			close: 'bg-close-btn w-10 h-10 opacity-50',
			burger: 'bg-burger-btn opacity-50 [&.active]:bg-close-btn',
			calendar:
				'border-1 border-white rounded-full border-solid  text-sm [&.active]:bg-white [&.active]:text-dark/50 hover:bg-white hover:text-dark/50',
			arrLeft: 'bg-left-arrow-btn',
			arrRight: 'bg-right-arrow-btn',
			trash: 'bg-trash-btn opacity-50',
			edit: 'bg-edit-btn opacity-50 [&.active]:bg-close-btn',
			add: 'bg-add-btn opacity-50',
		},
		defaultVariants: {
			variant: 'default',
			size: 'medium',
		},
	},
});

export interface IButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof btnVariants> {}

const Button = memo(({ className, size, variant, ...props }: IButtonProps) => {
	return <button {...props} className={cn(btnVariants({ variant, size }), className)} />;
});

export default Button;
