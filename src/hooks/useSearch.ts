import { ChangeEvent, FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { autocompleteSearch } from '../api';
import { ROUTES } from '../router/routes.const';
import { constructUrl } from '../utils/constructUrl';
import { debounce } from '../utils/debounce';

type UseSearchReturn = {
	ref: React.MutableRefObject<HTMLInputElement | null>;

	searchState: SearchState;

	onSubmitHandler: (event: FormEvent<HTMLFormElement>) => void;
	onTypeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
	onListItemClickHandler: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		listItem: IGeocodingResponse
	) => void;
	testKeydown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
	onGeolocationSearchHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export interface IGeocodingResponse {
	lat: string;
	lon: string;
	city: string;
	country: string;
	countryCode: string;
	state: string;
	stateCode: string;
}

interface SearchState {
	list: IGeocodingResponseIndexed[] | [];
	activeItem: number;
}

export interface IGeocodingResponseIndexed extends IGeocodingResponse {
	active?: boolean;
}

export const useSearch = (): UseSearchReturn => {
	const ref = useRef<HTMLInputElement | null>(null);

	const navigate = useNavigate();
	const [searchState, setSearchState] = useState<SearchState>({ list: [], activeItem: 0 });

	const [geoCoords, setGeoCoords] = useState<{ lat: number; lon: number } | null>(null);

	// const { data, error, isLoading } = useGetByGeoQuery(geoCoords ?? { lat: 0, lon: 0 }, {
	// 	skip: !geoCoords,
	// });
	// console.log('useSearch', { data, error, isLoading });
	const autocomplete = useCallback(async (query: string) => {
		const response = await autocompleteSearch(query);
		setSearchState({
			list: response,
			activeItem: 0,
		});
	}, []);

	const debouncedAutocomplete = useMemo(() => debounce(autocomplete, 300), [autocomplete]);

	const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const onListItemClickHandler = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		listItem: IGeocodingResponse
	) => {
		event?.preventDefault();
		const { city, state, countryCode } = listItem;
		const param = constructUrl(
			{ location: ROUTES.WEATHER, city, state, countryCode },
			undefined,
			undefined,
			true
		);
		if (ref.current) {
			ref.current.value = '';
		}
		setSearchState({
			list: [],
			activeItem: 0,
		});
		navigate(param);
	};

	const onGeolocationSearchHandler = async () => {
		console.log(geoCoords);

		const getGeolocation = (): Promise<GeolocationPosition> =>
			new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});

		try {
			const position = await getGeolocation();
			const { latitude, longitude } = position.coords;

			setGeoCoords({ lat: latitude, lon: longitude });
			navigate('/weather?location=' + [latitude, longitude].join(','));
		} catch (error) {
			console.log(error);
		}
	};

	// useEffect(() => {
	// 	if (geoCoords) {
	// 		console.log('fetching weather data by geolocation');
	// 		useGetByGeoQuery(geoCoords);
	// 	}
	// }, [geoCoords]);

	const onTypeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.value || event.target.value.length < 3) {
			setSearchState({ list: [], activeItem: 0 });
			return;
		}
		debouncedAutocomplete(event.target.value);
	};
	const testKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (searchState.list.length === 0) return;

		let newIndex = searchState.activeItem;
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			newIndex =
				event.key === 'ArrowDown'
					? (searchState.activeItem + 1) % searchState.list.length
					: (searchState.activeItem - 1 + searchState.list.length) % searchState.list.length;
		} else if (event.key === 'Enter') {
			setSearchState({ list: [], activeItem: 0 });
			onListItemClickHandler(null, searchState.list[searchState.activeItem]);
			return;
		}

		setSearchState((prevState) => ({ ...prevState, activeItem: newIndex }));
	};

	return {
		ref,

		onSubmitHandler,
		onTypeHandler,

		onListItemClickHandler,
		testKeydown,
		onGeolocationSearchHandler,
		searchState,
	};
};
