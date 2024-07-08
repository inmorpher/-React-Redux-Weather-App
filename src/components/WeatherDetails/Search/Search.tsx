import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useSearch } from '../../../hooks/useSearch';
import Button from '../../UI/Button';

const Search = memo(() => {
	const search = useSearch();

	return (
		<div className='relative w-full' onKeyDown={search.testKeydown} tabIndex={0}>
			<form
				className={`bg-weather-gradient border-1  flex h-full w-full justify-center  justify-self-end overflow-hidden rounded-md border-white transition-all md:w-full`}
				onSubmit={(event) => event.preventDefault()}
			>
				<Button
					tabIndex={0}
					size={'medium'}
					onClick={search.onGeolocationSearchHandler}
					type='button'
					className='aspect-square flex-shrink-0 bg-geolocation-btn bg-contain bg-center bg-no-repeat  opacity-50 transition-opacity focus:outline-none hocus:opacity-100'
					aria-label='Search by geolocation'
				/>
				<input
					type='search'
					name='city'
					autoComplete='off'
					className=' w-full border-b-2 border-transparent bg-transparent px-3 text-right text-white outline-none placeholder:text-white/[.5] focus:border-b-2 focus:border-b-white '
					placeholder='type yor city'
					ref={search.ref}
					onChange={search.onTypeHandler}
					autoFocus
				/>
			</form>
			<ul className='absolute left-0 z-10 mt-2 flex w-full flex-col overflow-hidden rounded-lg shadow-basic'>
				{search.searchState.list.map((listItem, index) => {
					return (
						<li key={listItem.city + listItem.country + listItem.state + index}>
							<button
								className={twMerge(
									'bg-weather-bg-500 hover:bg-weather-bg-900 flex w-full flex-col px-4 py-1 align-middle',
									index === search.searchState.activeItem
										? 'bg-weather-bg-900'
										: '',
								)}
								onClick={(event) => search.onListItemClickHandler(event, listItem)}
							>
								<span className='font-semibold'>{listItem.city}</span>
								<span className='text-sm font-light'>
									{listItem.state && listItem.state + ', '}
									{listItem.countryCode.toUpperCase()}
								</span>
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
});

export default Search;
