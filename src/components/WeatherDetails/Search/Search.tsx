import { useSearch } from '../../../hooks/useSearch';
import Wrapper from '../../UI/Global/Wrapper';
import SearchForm from './SearchForm';
import SearchList from './SearchList';

/**
 * Search component that provides a search functionality with form and results list.
 *
 * This component uses the useSearch hook to manage search state and actions.
 * It renders a search form with geolocation button and input field, and a list
 * of search results with clickable items.
 *
 * @returns {JSX.Element} A JSX element representing the Search component.
 */
const Search = ({ home }: { home?: boolean }) => {
	const {
		inputRef,
		searchState,
		handleSubmit,
		handleInputChange,
		handleListItemClick,
		handleKeyNavigation,
		handleGeolocationSearch,
	} = useSearch();
	return (
		<Search.Wrapper
			className={`relative ${home ? 'w-[inherit]' : 'w-full'}`}
			onKeyDown={handleKeyNavigation}
			tabIndex={0}
		>
			<SearchForm handleSubmit={handleSubmit}>
				<SearchForm.Button handleGeolocationSearch={handleGeolocationSearch} />
				<SearchForm.Input handleInputChange={handleInputChange} inputRef={inputRef} />
			</SearchForm>
			<SearchList>
				{searchState.results.map((listItem, index) => (
					<SearchList.Item key={`${listItem.city}${listItem.country}${listItem.state}${index}`}>
						<SearchList.Button
							index={index}
							selectedIndex={searchState.selectedIndex}
							item={listItem}
							handleItemClick={handleListItemClick}
						>
							<SearchList.Title>{listItem.city}</SearchList.Title>
							<SearchList.Description>
								{listItem.state && `${listItem.state}, `}
								{listItem.countryCode.toUpperCase()}
							</SearchList.Description>
						</SearchList.Button>
					</SearchList.Item>
				))}
			</SearchList>
		</Search.Wrapper>
	);
};

Search.Wrapper = Wrapper;

export default Search;
