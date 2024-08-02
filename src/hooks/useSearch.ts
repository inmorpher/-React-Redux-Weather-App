import { ChangeEvent, FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { autocompleteSearch } from '../api';
import { ROUTES } from '../router/routes.const';
import { constructUrl } from '../utils/constructUrl';
import { debounce } from '../utils/debounce';

export interface GeocodingResponse {
	lat: string;
	lon: string;
	city: string;
	country: string;
	countryCode: string;
	state: string;
	stateCode: string;
}

export interface SearchState {
	results: GeocodingResponse[];
	selectedIndex: number;
}
/**
 * A custom React hook for handling search functionality with autocomplete and geolocation features.
 *
 * This hook manages the search state, handles user interactions (input changes, key navigation,
 * list item clicks), performs autocomplete searches, and provides geolocation search capabilities.
 *
 * @returns An object containing:
 *   - inputRef: A ref for the search input element
 *   - searchState: The current state of the search (results and selected index)
 *   - handleSubmit: Function to handle form submission
 *   - handleInputChange: Function to handle input changes
 *   - handleListItemClick: Function to handle clicks on search result items
 *   - handleKeyNavigation: Function to handle keyboard navigation of search results
 *   - handleGeolocationSearch: Function to perform a geolocation-based search
 */
export const useSearch = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();
	const [searchState, setSearchState] = useState<SearchState>({ results: [], selectedIndex: 0 });

	const performAutocomplete = useCallback(async (query: string) => {
		const results = await autocompleteSearch(query);
		setSearchState({ results, selectedIndex: 0 });
	}, []);

	const debouncedAutocomplete = useMemo(
		() => debounce(performAutocomplete, 300),
		[performAutocomplete]
	);

	/**
	 * Handles form submission by preventing the default behavior.
	 * @param event - The form submission event
	 */
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	/**
	 * Handles clicks on search result items.
	 * @param event - The mouse event (can be null for keyboard navigation)
	 * @param item - The selected GeocodingResponse item
	 */
	const handleListItemClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		item: GeocodingResponse
	) => {
		event?.preventDefault();
		const { city, state, countryCode } = item;
		const url = constructUrl(
			{ location: ROUTES.WEATHER, city, state, countryCode },
			undefined,
			undefined,
			true
		);
		if (inputRef.current) inputRef.current.value = '';
		setSearchState({ results: [], selectedIndex: 0 });
		navigate(url);
	};

	/**
	 * Handles geolocation-based search.
	 * @param event - The mouse event triggering the geolocation search
	 */
	const handleGeolocationSearch = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		try {
			const position = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			const { latitude, longitude } = position.coords;
			navigate(`/${ROUTES.WEATHER}?lat=${latitude}&lon=${longitude}`, { replace: true });
		} catch (error) {
			console.error('Geolocation error:', error);
		}
	};

	/**
	 * Handles changes in the search input field.
	 * @param event - The input change event
	 */
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		if (!query || query.length < 3) {
			setSearchState({ results: [], selectedIndex: 0 });
			return;
		}
		debouncedAutocomplete(query);
	};

	/**
	 * Handles keyboard navigation of search results.
	 * @param event - The keyboard event
	 */
	const handleKeyNavigation = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const { results, selectedIndex } = searchState;
		if (results.length === 0) return;

		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			const newIndex =
				event.key === 'ArrowDown'
					? (selectedIndex + 1) % results.length
					: (selectedIndex - 1 + results.length) % results.length;
			setSearchState((prevState) => ({ ...prevState, selectedIndex: newIndex }));
		} else if (event.key === 'Enter') {
			handleListItemClick(null, results[selectedIndex]);
		}
	};

	return {
		inputRef,
		searchState,
		handleSubmit,
		handleInputChange,
		handleListItemClick,
		handleKeyNavigation,
		handleGeolocationSearch,
	};
};
