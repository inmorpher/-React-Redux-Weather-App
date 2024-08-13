import '@testing-library/jest-dom';
import { render, within } from '@testing-library/react';
import { ReactNode } from 'react';
import UserCityListItem from './UserCityListItem';

const mockDeleteCity = jest.fn();
const mockCloseSideBarOnListItemClick = jest.fn();
const mockUseGetCityName = { latitude: 40.7128, longitude: -74.006 };

jest.mock('../../../context/CityList.context', () => ({
	useCityList: () => ({ deleteCity: mockDeleteCity }),
}));

jest.mock('../../../context/WeatherData.context', () => ({
	useGetCityName: () => mockUseGetCityName,
}));

jest.mock('../../../hooks/useSidebarContext', () => ({
	useSidebarContext: () => ({ closeSideBarOnListItemClick: mockCloseSideBarOnListItemClick }),
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));

describe('UserCityListItem component', () => {
	it('should render the component with all required props', () => {
		const { getByRole } = render(
			<UserCityListItem
				city='New York'
				country='US'
				state='NY'
				lat={40.7128}
				lon={-74.006}
				showDelete={true}
			/>
		);

		const linkElement = getByRole('link');
		const cityElements = within(linkElement).getAllByText((_, element) => {
			return element?.textContent?.includes('New York, NY, US') ?? false;
		});
		expect(cityElements.length).toBeGreaterThan(0);

		const deleteButton = getByRole('button', { name: /delete city/i });
		expect(deleteButton).toBeInTheDocument();
		expect(deleteButton).toHaveClass('opacity-full');
	});

	it('should correctly construct the URL string based on city, state, and country', () => {
		const { getByRole } = render(
			<UserCityListItem
				city='Los Angeles'
				country='US'
				state='CA'
				lat={34.0522}
				lon={-118.2437}
				showDelete={false}
			/>
		);

		const linkElement = getByRole('link');
		expect(linkElement).toHaveAttribute('href', '/weather/Los%20Angeles/CA/US'.toLocaleLowerCase());
	});

	it('should call deleteCity function when delete button is clicked', () => {
		const { getByRole } = render(
			<UserCityListItem
				city='New York'
				country='US'
				state='NY'
				lat={40.7128}
				lon={-74.006}
				showDelete={true}
			/>
		);

		const deleteButton = getByRole('button', { name: /delete city/i });
		deleteButton.click();

		expect(mockDeleteCity).toHaveBeenCalledWith({
			city: 'New York',
			country: 'US',
			state: 'NY',
			lat: 40.7128,
			lon: -74.006,
		});
	});
});
