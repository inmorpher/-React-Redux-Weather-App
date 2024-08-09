import axios, { AxiosResponse } from 'axios';
import { ROUTES } from '../router/routes.const';
import { debounce } from '../utils/debounce';

const SERVER = ROUTES.URL;

export interface IGeocodingResponse {
	lat: string;
	lon: string;
	city: string;
	country: string;
	countryCode: string;
	state: string;
	stateCode: string;
}

export const autocompleteSearch = async (query: string): Promise<IGeocodingResponse[] | []> => {
	if (!query || query.length < 3) return [];
	try {
		const response: AxiosResponse<IGeocodingResponse[]> = await axios.get(
			`${SERVER}/search/autocomplete?q=${query}`
		);

		return response.data;
	} catch (error) {
		return [];
	}
};

export const debouncedAutocompleteSearch = debounce(autocompleteSearch, 300);
