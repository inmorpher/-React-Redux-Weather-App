import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedFunction, vi } from 'vitest';
import { useCityList } from '../../../context/CityList.context';
import WeatherProvider from '../../../context/WeatherData.context';
import { useSidebarContext } from '../../../hooks/useSidebarContext';
import UserCityList from './UserCityList';

vi.mock('../../../context/CityList.context', () => ({
	useCityList: vi.fn(),
}));

vi.mock('../../../hooks/useSidebarContext', () => ({
	useSidebarContext: vi.fn(),
}));

describe('UserCityList', () => {
	test('should render an empty list message when the cityList is empty', () => {
		// const { useCityList } = require('../../../context/CityList.context');
		// const { useSidebarContext } = require('../../../hooks/useSidebarContext');

		(useCityList as MockedFunction<typeof useCityList>).mockReturnValue({
			list: [],
			showDeleteBtn: false,
			toggleDeleteBtn: vi.fn(),
			addCity: vi.fn(),
			deleteCity: vi.fn(),
			version: 0, // or any appropriate initial value
		});

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: false,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: vi.fn(),
			handleTouchMove: vi.fn(),
			closeSideBarOnListItemClick: vi.fn(),
		});

		const { getByText } = render(<UserCityList />);

		const emptyListMessage = getByText('Your city list is empty.');
		expect(emptyListMessage).toBeInTheDocument();
	});

	test('should render a list of UserCityListItem components when cityList is not empty', () => {
		const mockCityList = [
			{
				city: 'New York',
				country: 'USA',
				state: 'NY',

				lat: 40.7128,
				lon: -74.0059,
			},
			{
				city: 'London',
				country: 'UK',
				state: '',

				lat: 51.5072,
				lon: -0.1276,
			},
		];

		(useCityList as MockedFunction<typeof useCityList>).mockReturnValue({
			list: mockCityList,
			showDeleteBtn: false,
			toggleDeleteBtn: vi.fn(),
			addCity: vi.fn(),
			deleteCity: vi.fn(),
			version: 1,
		});

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: false,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: vi.fn(),
			handleTouchMove: vi.fn(),
			closeSideBarOnListItemClick: vi.fn(),
		});

		const queryClient = new QueryClient();

		const { getAllByRole } = render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<WeatherProvider>
						<UserCityList />
					</WeatherProvider>
				</MemoryRouter>
			</QueryClientProvider>
		);

		const listItemElements = getAllByRole('listitem');
		expect(listItemElements).toHaveLength(mockCityList.length);

		listItemElements.forEach((item, index) => {
			const cityData = mockCityList[index];
			expect(item).toHaveTextContent(
				`${cityData.city}${cityData.state ? ', ' + cityData.state : ''}${
					cityData.country ? ', ' + cityData.country : ''
				}`
			);
		});
	});

	test('should display the "toggle delete mode" button when cityList is not empty', () => {
		const mockCityList = [
			{
				city: 'New York',
				country: 'USA',
				state: 'NY',
				lat: 40.7128,
				lon: -74.0059,
			},
			{
				city: 'London',
				country: 'UK',
				state: '',
				lat: 51.5072,
				lon: -0.1276,
			},
		];

		(useCityList as MockedFunction<typeof useCityList>).mockReturnValue({
			list: mockCityList,
			showDeleteBtn: false,
			toggleDeleteBtn: vi.fn(),
			addCity: vi.fn(),
			deleteCity: vi.fn(),
			version: 1,
		});

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: false,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: vi.fn(),
			handleTouchMove: vi.fn(),
			closeSideBarOnListItemClick: vi.fn(),
		});
		const queryClient = new QueryClient();

		const { getByTestId } = render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<WeatherProvider>
						<UserCityList />
					</WeatherProvider>
				</MemoryRouter>
			</QueryClientProvider>
		);

		const toggleDeleteModeButton = getByTestId('toggle-delete-mode-button' as string);

		expect(toggleDeleteModeButton).toBeInTheDocument();
	});

	test('should toggle the "active" class on the "toggle delete mode" button when clicked', () => {
		const toggleDeleteBtn = vi.fn();
		(useCityList as MockedFunction<typeof useCityList>).mockReturnValue({
			list: [
				{
					city: 'New York',
					country: 'USA',
					state: 'NY',
					lat: 40.7128,
					lon: -74.0059,
				},
			],
			showDeleteBtn: false,
			toggleDeleteBtn,
			addCity: vi.fn(),
			deleteCity: vi.fn(),
			version: 1,
		});

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: false,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: vi.fn(),
			handleTouchMove: vi.fn(),
			closeSideBarOnListItemClick: vi.fn(),
		});

		const queryClient = new QueryClient();

		const ListComponent = (
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<WeatherProvider>
						<UserCityList />
					</WeatherProvider>
				</MemoryRouter>
			</QueryClientProvider>
		);
		const { getByTestId, rerender } = render(ListComponent);

		const toggleDeleteModeButton = getByTestId('toggle-delete-mode-button' as string);

		expect(toggleDeleteModeButton).not.toHaveClass('active');

		fireEvent.click(toggleDeleteModeButton);

		expect(toggleDeleteBtn).toHaveBeenCalledTimes(1);

		(useCityList as MockedFunction<typeof useCityList>).mockReturnValue({
			list: [
				{
					city: 'New York',
					country: 'USA',
					state: 'NY',
					lat: 40.7128,
					lon: -74.0059,
				},
			],
			showDeleteBtn: true,
			toggleDeleteBtn,
			addCity: vi.fn(),
			deleteCity: vi.fn(),
			version: 1,
		});

		rerender(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<WeatherProvider>
						<UserCityList />
					</WeatherProvider>
				</MemoryRouter>
			</QueryClientProvider>
		);

		//
		expect(toggleDeleteModeButton).toHaveClass('active');

		fireEvent.click(toggleDeleteModeButton);

		expect(toggleDeleteBtn).toHaveBeenCalledTimes(2);

		(useCityList as MockedFunction<typeof useCityList>).mockReturnValue({
			list: [
				{
					city: 'New York',
					country: 'USA',
					state: 'NY',
					lat: 40.7128,
					lon: -74.0059,
				},
			],
			showDeleteBtn: false,
			toggleDeleteBtn,
			addCity: vi.fn(),
			deleteCity: vi.fn(),
			version: 1,
		});

		rerender(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<WeatherProvider>
						<UserCityList />
					</WeatherProvider>
				</MemoryRouter>
			</QueryClientProvider>
		);
		expect(toggleDeleteModeButton).not.toHaveClass('active');
	});

	test('should call closeSideBarOnListItemClick when a UserCityListItem is clicked', () => {
		const mockCloseSideBarOnListItemClick = vi.fn();
		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: false,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: vi.fn(),
			handleTouchMove: vi.fn(),
			closeSideBarOnListItemClick: mockCloseSideBarOnListItemClick,
		});

		const mockCityList = [
			{
				city: 'New York',
				country: 'USA',
				state: 'NY',
				lat: 40.7128,
				lon: -74.0059,
			},
			{
				city: 'London',
				country: 'UK',
				state: '',
				lat: 51.5072,
				lon: -0.1276,
			},
		];

		(useCityList as MockedFunction<typeof useCityList>).mockReturnValue({
			list: mockCityList,
			showDeleteBtn: false,
			toggleDeleteBtn: vi.fn(),
			addCity: vi.fn(),
			deleteCity: vi.fn(),
			version: 1,
		});

		const queryClient = new QueryClient();

		const { getAllByRole } = render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<WeatherProvider>
						<UserCityList />
					</WeatherProvider>
				</MemoryRouter>
			</QueryClientProvider>
		);

		const listItemElements = getAllByRole('listitem');

		listItemElements.forEach((item) => {
			fireEvent.click(item);
		});

		expect(mockCloseSideBarOnListItemClick).toHaveBeenCalledTimes(mockCityList.length);
	});

	test('should handle rendering when the cityList contains a large number of items', () => {
		const largeCityList = Array.from({ length: 1000 }, (_, index) => ({
			city: `City ${index + 1}`,
			country: 'USA',
			state: `State ${index + 1}`,
			lat: 37.7749,
			lon: -122.4194,
		}));

		(useCityList as MockedFunction<typeof useCityList>).mockReturnValue({
			list: largeCityList,
			showDeleteBtn: false,
			toggleDeleteBtn: vi.fn(),
			addCity: vi.fn(),
			deleteCity: vi.fn(),
			version: 1,
		});

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: false,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: vi.fn(),
			handleTouchMove: vi.fn(),
			closeSideBarOnListItemClick: vi.fn(),
		});

		const queryClient = new QueryClient();

		const { getAllByRole } = render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<WeatherProvider>
						<UserCityList />
					</WeatherProvider>
				</MemoryRouter>
			</QueryClientProvider>
		);

		const listItemElements = getAllByRole('listitem');
		expect(listItemElements).toHaveLength(largeCityList.length);

		listItemElements.forEach((item, index) => {
			const cityData = largeCityList[index];
			expect(item).toHaveTextContent(`${cityData.city}, ${cityData.state}, ${cityData.country}`);
		});
	});
});
