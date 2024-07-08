import { ImgHTMLAttributes } from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

type IconCode = {
	src: string;
	alt: string;
};

/**
 * Defines the variants and default variants for the icon component.
 * Variants include background style ('default' variant) and size ('medium' or 'small').
 */
const iconVariants = cva('w-5 h-5', {
	variants: {
		variant: {
			default: 'bg-none',
		},
		size: {
			medium: 'w-6 h-6',
			small: 'w-5 h-5',
		},
		defaultVariants: {
			variant: 'default',
			size: 'medium',
		},
	},
});

/**
 * A record of icon codes mapped to their respective source and alternative text.
 */
const iconCodes: Record<string, IconCode> = {
	'01d': {
		src: '/icons/static/conditions/01d.svg',
		alt: 'clear sky',
	},
	'02d': {
		src: '/icons/static/conditions/02d.svg',
		alt: 'few clouds',
	},
	'03d': {
		src: '/icons/static/conditions/03d.svg',
		alt: 'scattered clouds',
	},
	'04d': {
		src: '/icons/static/conditions/04d.svg',
		alt: 'broken clouds',
	},
	'09d': {
		src: '/icons/static/conditions/09d.svg',
		alt: 'shower rain',
	},
	'10d': {
		src: '/icons/static/conditions/10d.svg',
		alt: 'rain',
	},
	'11d': {
		src: '/icons/static/conditions/11d.svg',
		alt: 'thunderstorm',
	},
	'13d': {
		src: '/icons/static/conditions/13d.svg',
		alt: 'snow',
	},
	'50d': {
		src: '/icons/static/conditions/50d.svg',
		alt: 'fog',
	},
	'01n': {
		src: '/icons/static/conditions/01n.svg',
		alt: 'clear sky',
	},
	'02n': {
		src: '/icons/static/conditions/02n.svg',
		alt: 'few clouds',
	},
	'03n': {
		src: '/icons/static/conditions/03n.svg',
		alt: 'scattered clouds',
	},
	'04n': {
		src: '/icons/static/conditions/04n.svg',
		alt: 'broken clouds',
	},
	'09n': {
		src: '/icons/static/conditions/09n.svg',
		alt: 'shoer rain',
	},
	'10n': {
		src: '/icons/static/conditions/10n.svg',
		alt: 'rain',
	},
	'11n': {
		src: '/icons/static/conditions/11n.svg',
		alt: 'thunderstorm',
	},
	'13n': {
		src: '/icons/static/conditions/13n.svg',
		alt: 'snow',
	},
	'50n': {
		src: '/icons/static/conditions/50n.svg',
		alt: 'fog',
	},
};

/**
 * Props interface for the StaticWeatherIcon component.
 * Extends ImgHTMLAttributes and VariantProps, and includes an 'icon' property to specify the icon code.
 */
export interface StaticWeatherIconProps
	extends ImgHTMLAttributes<HTMLImageElement>,
		VariantProps<typeof iconVariants> {
	icon: keyof typeof iconCodes;
}

/**
 * A React component that renders a weather icon based on the provided icon code.
 *
 * @param {StaticWeatherIconProps} props - The component props, including the icon code, variants, and other HTML attributes.
 * @returns {JSX.Element} A React element representing the weather icon.
 */
const StaticWeatherIcon = ({
	className,
	size,
	variant,
	icon,
	...props
}: StaticWeatherIconProps) => {
	if (!iconCodes[icon]) {
		console.warn(`The icon code "${icon}" is not defined in the iconCodes object.`);
		return null;
	}

	const iconAlt = iconCodes[icon].alt || 'weather icon';
	const iconSrc = iconCodes[icon].src || '';

	return (
		<img
			{...props}
			className={cn(iconVariants({ variant, size }), className)}
			src={iconSrc}
			alt={iconAlt}
		/>
	);
};

export default StaticWeatherIcon;
