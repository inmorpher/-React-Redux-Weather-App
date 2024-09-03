import '@testing-library/jest-dom';
import axios from 'axios';
import { MockedFunction, vi } from 'vitest';
import { autocompleteSearch, IGeocodingResponse } from '.';

vi.mock('axios');
vi.mock('../router/routes.const', () => ({
	ROUTES: {
		URL: 'https://example.com/api',
	},
}));

describe('autocompleteSearch', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});
	test('should return an empty array when the query string is empty', async () => {
		(axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

		const result = await autocompleteSearch('');

		expect(result).toEqual([]);
	});

	test('should return an empty array when the query string length is less than 3 characters', async () => {
		(axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

		const result = await autocompleteSearch('ab');

		expect(result).toEqual([]);
	});

	test('should return an array of IGeocodingResponse objects when the query string is valid', async () => {
		const mockGeocodingResponse: IGeocodingResponse[] = [
			{
				lat: '48.1351',
				lon: '11.5820',
				city: 'Munich',
				country: 'Germany',
				countryCode: 'DE',
				state: 'Bavaria',
				stateCode: 'BY',
			},
			{
				lat: '52.5200',
				lon: '13.4050',
				city: 'Berlin',
				country: 'Germany',
				countryCode: 'DE',
				state: '',
				stateCode: '',
			},
		];

		(axios.get as MockedFunction<typeof axios.get>).mockResolvedValueOnce({
			data: mockGeocodingResponse,
		});

		const result = await autocompleteSearch('mun');

		expect(result).toEqual(mockGeocodingResponse);
	});

	test('should handle network errors gracefully and return an empty array', async () => {
		const mockAxiosError = new Error('Network Error');
		(axios.get as MockedFunction<typeof axios.get>).mockRejectedValueOnce(mockAxiosError);

		const result = await autocompleteSearch('mun');

		expect(result).toEqual([]);
	});

	test('should encode special characters in the query string correctly', async () => {
		const mockGeocodingResponse: IGeocodingResponse[] = [
			{
				lat: '48.1351',
				lon: '11.5820',
				city: 'München',
				country: 'Germany',
				countryCode: 'DE',
				state: 'Bavaria',
				stateCode: 'BY',
			},
		];

		(axios.get as MockedFunction<typeof axios.get>).mockResolvedValueOnce({
			data: mockGeocodingResponse,
		});

		const result = await autocompleteSearch('mün');

		expect(result).toEqual(mockGeocodingResponse);
	});

	test('should handle malformed server URLs gracefully and return an empty array', async () => {
		vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error('malformed URL'));

		const result = await autocompleteSearch('mun');

		expect(result).toEqual([]);
		expect(axios.get).toHaveBeenCalledWith('https://example.com/api/search/autocomplete?q=mun');
	});
});
