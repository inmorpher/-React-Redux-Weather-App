import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { GeocodingResponse } from '../../../hooks/useSearch';
import Button from '../../UI/Button';
import SpanText from '../../UI/Global/SpanText';

interface ISearchListProps {
	children?: React.ReactNode;
}

interface ISearchListItemProps {
	children?: React.ReactNode;
}

interface ISearchListButtonProps {
	children?: React.ReactNode;
	index: number;
	selectedIndex: number;
	item: any;
	handleItemClick: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		item: GeocodingResponse
	) => void;
}

type SearchLostComponentProps = React.FC<ISearchListProps> & {
	Item: React.FC<ISearchListItemProps>;
	Button: React.FC<ISearchListButtonProps>;
	Title: React.FC<{ children: ReactNode }>;
	Description: React.FC<{ children: ReactNode }>;
};
/**
 * SearchList component for displaying a list of search results.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} [props.children] - The child elements to be rendered within the list.
 * @returns {JSX.Element} A ul element containing the search results.
 *
 * @example
 * <SearchList>
 *   <SearchList.Item>
 *     <SearchList.Button index={0} selectedIndex={0} item={searchItem} handleItemClick={handleClick}>
 *       <SearchList.Title>New York</SearchList.Title>
 *       <SearchList.Description>NY, USA</SearchList.Description>
 *     </SearchList.Button>
 *   </SearchList.Item>
 * </SearchList>
 */
const SearchList: SearchLostComponentProps = ({ children }) => (
	<ul className='absolute left-0 z-10 mt-2 flex w-full flex-col overflow-hidden rounded-lg shadow-basic'>
		{children && children}
	</ul>
);

/**
 * SearchListItem component for individual items in the search list.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} [props.children] - The child elements to be rendered within the list item.
 * @returns {JSX.Element} A li element containing the item content.
 */
const SearchListItem: React.FC<ISearchListItemProps> = ({ children }) => (
	<li>{children && children}</li>
);

/**
 * ListButton component for clickable items in the search list.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.index - The index of the current item.
 * @param {number} props.selectedIndex - The index of the currently selected item.
 * @param {any} props.item - The data associated with this list item.
 * @param {React.ReactNode} [props.children] - The child elements to be rendered within the button.
 * @param {(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: GeocodingResponse) => void} props.handleItemClick - Function to handle item click events.
 * @returns {JSX.Element} A Button component styled based on selection state.
 */
const ListButton: React.FC<ISearchListButtonProps> = ({
	index,
	selectedIndex,
	item,
	children,
	handleItemClick,
}) => (
	<Button
		className={twMerge(
			'bg-weather-bg-500 hover:bg-weather-bg-900 flex w-full flex-col px-4 py-1 align-middle',
			index === selectedIndex ? 'bg-weather-bg-900' : ''
		)}
		onClick={(event) => handleItemClick(event, item)}
	>
		{children && children}
	</Button>
);

/**
 * Title component for displaying the title of a search result item.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be displayed as the title.
 * @returns {JSX.Element} A SpanText component styled as a title.
 */
const Title = ({ children }: { children: ReactNode }) => (
	<SpanText as={'span'} className='font-semibold text-lg'>
		{children && children}
	</SpanText>
);

/**
 * Description component for displaying the description of a search result item.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be displayed as the description.
 * @returns {JSX.Element} A SpanText component styled as a description.
 */
const Description = ({ children }: { children: ReactNode }) => (
	<SpanText as={'span'} className='text-sm font-light'>
		{children && children}
	</SpanText>
);

SearchList.Item = SearchListItem;
SearchList.Button = ListButton;
SearchList.Title = Title;
SearchList.Description = Description;

export default SearchList;
