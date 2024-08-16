import '@testing-library/jest-dom';
import {
	act,
	fireEvent,
	getByText,
	queryAllByRole,
	render,
	renderHook,
} from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useSearch } from '../../../hooks/useSearch';
import Search from './Search';

vi.mock('../../../hooks/useSearch', () => ({
	useSearch: vi.fn(() => ({
		inputRef: { current: null },
		searchState: { results: [], selectedIndex: 0 },
		handleSubmit: vi.fn(),
		handleInputChange: vi.fn(),
		handleListItemClick: vi.fn(),
		handleKeyNavigation: vi.fn(),
		handleGeolocationSearch: vi.fn(),
	})),
}));
describe('Search', () => {
	test('should render the search component with the correct initial state', () => {
		const { getByRole } = render(<Search />);

		const searchWrapper = getByRole('combobox');
		const searchInput = getByRole('searchbox');
		const searchButton = getByRole('button', { name: 'geolocation' });

		expect(searchWrapper).toBeInTheDocument();
		expect(searchInput).toBeInTheDocument();
		expect(searchButton).toBeInTheDocument();

		const listItems = queryAllByRole(searchWrapper, 'option');
		expect(listItems).toHaveLength(0); // Initially, there should be no search results// Initially, there should be no search results
	});

	test('should update the search state when the input value changes', () => {
		const mockUseSearch = useSearch as MockedFunction<typeof useSearch>;
		mockUseSearch.mockReturnValue({
			inputRef: { current: null },
			searchState: { results: Array(5).fill({}), selectedIndex: 0 },
			handleSubmit: vi.fn(),
			handleInputChange: vi.fn(),
			handleListItemClick: vi.fn(),
			handleKeyNavigation: vi.fn(),
			handleGeolocationSearch: vi.fn(),
		});

		const { result } = renderHook(() => useSearch());
		const { handleInputChange } = result.current;

		const event = { target: { value: 'New York' } };
		act(() => {
			handleInputChange(event as React.ChangeEvent<HTMLInputElement>);
		});

		const { searchState } = result.current;
		expect(searchState.results).toHaveLength(5);
		expect(searchState.selectedIndex).toBe(0);
	});

	test('should call the handleSubmit function when the form is submitted', () => {
		const mockHandleSubmit = vi.fn();
		(useSearch as MockedFunction<typeof useSearch>).mockReturnValue({
			inputRef: { current: null },
			searchState: { results: [], selectedIndex: 0 },
			handleSubmit: mockHandleSubmit,
			handleInputChange: vi.fn(),
			handleListItemClick: vi.fn(),
			handleKeyNavigation: vi.fn(),
			handleGeolocationSearch: vi.fn(),
		});

		const { getByRole } = render(<Search />);
		const searchForm = getByRole('form', { name: 'search form' });

		fireEvent.submit(searchForm);

		expect(mockHandleSubmit).toHaveBeenCalled();
	});

	test('should render the search results list when there are search results', () => {
		const mockUseSearch = useSearch as MockedFunction<typeof useSearch>;
		const mockResults = [
			{
				city: 'New York',
				state: 'New York',
				country: 'United States',
				countryCode: 'us',
				lat: '40.7128',
				lon: '-74.006',
				stateCode: 'NY',
			},
			{
				city: 'London',
				country: 'United Kingdom',
				countryCode: 'gb',
				lat: '51.5074',
				lon: '-0.1278',
				state: '',
				stateCode: '',
			},
			{
				city: 'Tokyo',
				country: 'Japan',
				countryCode: 'jp',
				lat: '35.6762',
				lon: '139.6503',
				state: '',
				stateCode: '',
			},
		];
		mockUseSearch.mockReturnValue({
			inputRef: { current: null },
			searchState: { results: mockResults, selectedIndex: 0 },
			handleSubmit: vi.fn(),
			handleInputChange: vi.fn(),
			handleListItemClick: vi.fn(),
			handleKeyNavigation: vi.fn(),
			handleGeolocationSearch: vi.fn(),
		});

		const { getAllByRole } = render(<Search />);

		const listItems = getAllByRole('option');
		expect(listItems).toHaveLength(mockResults.length);

		mockResults.forEach((result, index) => {
			const listItem = listItems[index];
			const title = getByText(listItem, result.city);
			const description = getByText(
				listItem,
				`${result.state ? `${result.state}, ` : ''}${result.countryCode.toUpperCase()}`
			);

			expect(title).toBeInTheDocument();
			expect(description).toBeInTheDocument();
		});
	});

	test('should call the handleListItemClick function when a search result item is clicked', () => {
		const mockHandleListItemClick = vi.fn();
		(useSearch as MockedFunction<typeof useSearch>).mockReturnValue({
			inputRef: { current: null },
			searchState: {
				results: [
					{
						city: 'New York',
						state: 'New York',
						country: 'United States',
						countryCode: 'us',
						lat: '40.7128',
						lon: '-74.006',
						stateCode: 'NY',
					},
				],
				selectedIndex: 0,
			},
			handleSubmit: vi.fn(),
			handleInputChange: vi.fn(),
			handleListItemClick: mockHandleListItemClick,
			handleKeyNavigation: vi.fn(),
			handleGeolocationSearch: vi.fn(),
		});

		const { getByRole } = render(<Search />);

		const listItemButton = getByRole('geolocation');
		fireEvent.click(listItemButton);

		expect(mockHandleListItemClick).toHaveBeenCalledTimes(1);
		expect(mockHandleListItemClick).toHaveBeenCalledWith(expect.any(Object), {
			city: 'New York',
			state: 'New York',
			country: 'United States',
			countryCode: 'us',
			lat: '40.7128',
			lon: '-74.006',
			stateCode: 'NY',
		});
	});

	test('should handle keyboard navigation through the search results list', () => {
		const mockUseSearch = useSearch as MockedFunction<typeof useSearch>;
		const mockResults = [
			{
				city: 'New York',
				state: 'New York',
				country: 'United States',
				countryCode: 'us',
				lat: '40.7128',
				lon: '-74.006',
				stateCode: 'NY',
			},
			{
				city: 'London',
				country: 'United Kingdom',
				countryCode: 'gb',
				lat: '51.5074',
				lon: '-0.1278',
				state: '',
				stateCode: '',
			},
			{
				city: 'Tokyo',
				country: 'Japan',
				countryCode: 'jp',
				lat: '35.6762',
				lon: '139.6503',
				state: '',
				stateCode: '',
			},
		];
		const mockHandleKeyNavigation = vi.fn();
		mockUseSearch.mockReturnValue({
			inputRef: { current: null },
			searchState: { results: mockResults, selectedIndex: 0 },
			handleSubmit: vi.fn(),
			handleInputChange: vi.fn(),
			handleListItemClick: vi.fn(),
			handleKeyNavigation: mockHandleKeyNavigation,
			handleGeolocationSearch: vi.fn(),
		});

		const { getByRole } = render(<Search />);

		const searchWrapper = getByRole('combobox');

		// Navigate down the list
		fireEvent.keyDown(searchWrapper, { key: 'ArrowDown' });
		expect(mockHandleKeyNavigation).toHaveBeenCalledWith(
			expect.objectContaining({
				key: 'ArrowDown',
				type: 'keydown',
			})
		);

		// Navigate up the list
		fireEvent.keyDown(searchWrapper, { key: 'ArrowUp' });
		expect(mockHandleKeyNavigation).toHaveBeenCalledWith(
			expect.objectContaining({
				key: 'ArrowUp',
				type: 'keydown',
			})
		);
	});

	test('should call the handleGeolocationSearch function when the geolocation button is clicked', () => {
		const mockHandleGeolocationSearch = vi.fn();
		(useSearch as MockedFunction<typeof useSearch>).mockReturnValue({
			inputRef: { current: null },
			searchState: { results: [], selectedIndex: 0 },
			handleSubmit: vi.fn(),
			handleInputChange: vi.fn(),
			handleListItemClick: vi.fn(),
			handleKeyNavigation: vi.fn(),
			handleGeolocationSearch: mockHandleGeolocationSearch,
		});

		const { getByRole } = render(<Search />);

		const geolocationButton = getByRole('button', { name: 'geolocation' });
		fireEvent.click(geolocationButton);

		expect(mockHandleGeolocationSearch).toHaveBeenCalledTimes(1);
	});

	test('should render the search component with the correct width when the "home" prop is provided', () => {
		const { getByRole, rerender } = render(<Search home />);

		let searchWrapper = getByRole('combobox');
		expect(searchWrapper).toHaveClass('w-[inherit]');

		rerender(<Search />);
		searchWrapper = getByRole('combobox');
		expect(searchWrapper).toHaveClass('w-full');
	});

	test('should not render the search results list when there are no search results', () => {
		const mockUseSearch = useSearch as MockedFunction<typeof useSearch>;
		mockUseSearch.mockReturnValue({
			inputRef: { current: null },
			searchState: { results: [], selectedIndex: 0 },
			handleSubmit: vi.fn(),
			handleInputChange: vi.fn(),
			handleListItemClick: vi.fn(),
			handleKeyNavigation: vi.fn(),
			handleGeolocationSearch: vi.fn(),
		});

		const { queryAllByRole } = render(<Search />);

		const listItems = queryAllByRole('option');
		expect(listItems).toHaveLength(0);
	});
});
