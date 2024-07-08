import { ReactNode } from 'react';
import { useDailyContext } from '../../../../hooks/useDailyContext';

/**
 * Interface for props of DailyListItemContainer component.
 * @property {ReactNode} children - The children elements to be rendered inside the container.
 * @property {number} dayIndex - The index of the day associated with this container.
 */
export interface IDailyListItemContainerProps {
	children: ReactNode;
	dayIndex: number;
}

/**
 * A component that renders a list item container with click and keyboard event handlers.
 * @param {IDailyListItemContainerProps} props - The props for the component.
 * @param {ReactNode} props.children - The children elements to be rendered inside the container.
 * @param {number} props.dayIndex - The index of the day associated with this container.
 * @returns {JSX.Element} The rendered DailyListItemContainer component.
 */
const DailyListItemContainer = ({ dayIndex, children }: IDailyListItemContainerProps) => {
	const { dailyState, onPressKeys, onOpenPopup } = useDailyContext();
	return (
		<li
			key={'day' + dayIndex}
			className='flex w-full cursor-pointer border-b-transparent px-3 py-2 outline-0 transition-all duration-300 ease-in-out focus:outline-0 hocus:bg-primary-color-900 hocus:dark:bg-primary-color-dark-900'
			onClick={() => onOpenPopup(dayIndex)}
			onKeyDown={(event) => {
				onPressKeys(event, dayIndex);
			}}
			tabIndex={dailyState.isOpen ? -1 : 0}
		>
			{children}
		</li>
	);
};

export default DailyListItemContainer;
