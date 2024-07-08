import { ButtonHTMLAttributes, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { UserTheme, UserUnits } from '../../store/slices/userSlice';

const togglerVariants = {
	iconLight: '/icons/static/t_light.svg',
	iconDark: '/icons/static/t_dark.svg',
	iconCelsius: '/icons/static/celsius.svg',
	iconFahrenheit: '/icons/static/fahrenheit.svg',
};

interface ITogglerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'metric' | 'theme';
	theme?: UserTheme;
	units?: UserUnits;
}

const ControlToggler = ({ variant, theme, units, ...props }: ITogglerProps) => {
	const iconLayout = useRef<'left' | 'right'>('left');
	const firstIcon =
		variant === 'theme' ? togglerVariants.iconLight : togglerVariants.iconFahrenheit;
	const secondIcon = variant === 'theme' ? togglerVariants.iconDark : togglerVariants.iconCelsius;

	if (variant === 'theme') {
		if (theme === 'light') {
			iconLayout.current = 'left';
		} else {
			iconLayout.current = 'right';
		}
	} else if (variant === 'metric') {
		if (units === 'imperial') {
			iconLayout.current = 'left';
		} else {
			iconLayout.current = 'right';
		}
	} else {
		iconLayout.current = 'left';
	}

	return (
		<button
			{...props}
			className='before:bg-weather-bg-500 relative w-10 before:absolute before:left-0 before:top-1/2 before:h-[18px] before:w-full before:-translate-y-1/2 before:rounded-full'
		>
			<div
				className={twMerge(
					'before:bg-weather-bg-900 before: relative flex h-full w-full justify-between before:absolute before:top-1/2 before:h-6 before:w-6 before:-translate-y-1/2  before:rounded-xl before:shadow-basic before:transition-all ',
					iconLayout.current === 'left' ? ' before:-left-[2px]' : 'before:right-0',
				)}
			>
				<img
					src={firstIcon}
					alt='light theme icon'
					className={twMerge(
						`relative w-5 scale-100 transition-transform`,
						iconLayout.current === 'right' && 'scale-50 opacity-50',
					)}
				/>
				<img
					src={secondIcon}
					alt='light theme icon'
					className={twMerge(
						`relative mr-[2px] w-4 scale-50 opacity-50 transition-transform`,
						iconLayout.current === 'right' && 'scale-100 opacity-100',
					)}
				/>
			</div>
		</button>
	);
};

export default ControlToggler;
