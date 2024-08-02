import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useSearch } from '../../../hooks/useSearch';
import Button from '../../UI/Button';

/**
 * Search component for handling city search functionality.
 *
 * This component provides a search form with geolocation button and input field,
 * as well as a list of search results. It uses the `useSearch` hook to manage
 * the search state and handle various user interactions.
 *
 * @returns {JSX.Element} A React component that renders the search interface.
 */
const Search = memo(() => {
	const {
		inputRef,
		searchState,
		handleSubmit,
		handleInputChange,
		handleListItemClick,
		handleKeyNavigation,
		handleGeolocationSearch,
	} = useSearch();

	/**
	 * Renders the search form with geolocation button and input field.
	 *
	 * @returns {JSX.Element} The search form JSX.
	 */
	const renderSearchForm = () => (
		<form
			className='bg-weather-gradient border-1 flex h-full w-full justify-center justify-self-end overflow-hidden rounded-md border-white transition-all md:w-full'
			onSubmit={handleSubmit}
		>
			<Button
				tabIndex={0}
				size='medium'
				onClick={handleGeolocationSearch}
				type='button'
				className='aspect-square flex-shrink-0 bg-geolocation-btn bg-contain bg-center bg-no-repeat opacity-50 transition-opacity focus:outline-none hocus:opacity-100'
				aria-label='Search by geolocation'
			/>
			<input
				type='search'
				name='city'
				autoComplete='off'
				className='w-full border-b-2 border-transparent bg-transparent px-3 text-right text-white outline-none placeholder:text-white/[.5] focus:border-b-2 focus:border-b-white'
				placeholder='type your city'
				ref={inputRef}
				onChange={handleInputChange}
				autoFocus
			/>
		</form>
	);
	// );
	// <SearchForm searchState={searchState} handleClick={handleListItemClick} />;

	/**
	 * Renders the list of search results.
	 *
	 * @returns {JSX.Element} The search results list JSX.
	 */
	const renderSearchResults = () => (
		<ul className='absolute left-0 z-10 mt-2 flex w-full flex-col overflow-hidden rounded-lg shadow-basic'>
			{searchState.results.map((listItem, index) => (
				<li key={`${listItem.city}${listItem.country}${listItem.state}${index}`}>
					<button
						className={twMerge(
							'bg-weather-bg-500 hover:bg-weather-bg-900 flex w-full flex-col px-4 py-1 align-middle',
							index === searchState.selectedIndex ? 'bg-weather-bg-900' : ''
						)}
						onClick={(event) => handleListItemClick(event, listItem)}
					>
						<span className='font-semibold'>{listItem.city}</span>
						<span className='text-sm font-light'>
							{listItem.state && `${listItem.state}, `}
							{listItem.countryCode.toUpperCase()}
						</span>
					</button>
				</li>
			))}
		</ul>
	);

	return (
		<div className='relative w-full' onKeyDown={handleKeyNavigation} tabIndex={0}>
			{/* <SearchForm searchState={searchState} handleClick={handleListItemClick} />; */}
			{renderSearchForm()}
			{renderSearchResults()}
		</div>
	);
});

export default Search;
