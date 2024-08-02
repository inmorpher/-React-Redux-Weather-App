import React from 'react';
import { twMerge } from 'tailwind-merge';
import { GeocodingResponse, SearchState } from '../../../hooks/useSearch';

export interface ISearchFormProps {
	searchState: SearchState;
	handleClick: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		item: GeocodingResponse
	) => void;
}

const SearchForm = ({ searchState, handleClick }: ISearchFormProps) => {
	return (
		<ul className='absolute left-0 z-10 mt-2 flex w-full flex-col overflow-hidden rounded-lg shadow-basic'>
			{searchState.results.map((listItem, index) => (
				<li key={`${listItem.city}${listItem.country}${listItem.state}${index}`}>
					<button
						className={twMerge(
							'bg-weather-bg-500 hover:bg-weather-bg-900 flex w-full flex-col px-4 py-1 align-middle',
							index === searchState.selectedIndex ? 'bg-weather-bg-900' : ''
						)}
						onClick={(event) => handleClick(event, listItem)}
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
};

export default SearchForm;
