import { twMerge } from 'tailwind-merge';
import { useScroll } from '../../../hooks/useScroll';

export interface IHeaderContainerProps {
	children: React.ReactNode;
}

/**
 * HeaderContainer component that wraps its children in a styled header element.
 * The header's styles change based on the scroll position.
 *
 * @param {IHeaderContainerProps} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the header.
 * @returns {JSX.Element} The styled header element containing the children.
 */
const HeaderContainer = ({ children }: IHeaderContainerProps) => {
	const { scroll } = useScroll();
	return (
		<header
			className={twMerge(
				`border-b-1 sticky top-0 z-50 col-span-4 row-start-1 row-end-2 w-full border-b-[.2px] border-b-transparent py-3 transition-all duration-300 sm:col-span-7`,
				scroll &&
					'border-b-[.2px] border-b-white/50 bg-primary-color-500/80 backdrop-blur-lg dark:bg-primary-color-dark-900/50',
			)}
		>
			{children}
		</header>
	);
};

export default HeaderContainer;
